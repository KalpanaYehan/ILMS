import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';

vi.mock('axios');

const mockAuthContextValue = {
  user: null,
  setUser: vi.fn(),
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial state correctly', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <SnackbarProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </SnackbarProvider>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Welcome to NexLib/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/User Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <SnackbarProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </SnackbarProvider>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/User Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('Password123');
  });

  it('submits form and handles successful login', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        message: 'success',
        accesstoken: 'fake-token',
        user: { id: 1, name: 'John Doe', email: 'john@example.com' },
      },
    });

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <SnackbarProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </SnackbarProvider>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/User Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8081/login", {
        userEmail: 'john@example.com',
        password: 'Password123',
      });
      expect(mockAuthContextValue.setUser).toHaveBeenCalledWith({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      });
      expect(screen.getByText(/logged in successfully/i)).toBeInTheDocument();
    });
  });

  it('handles login error', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: { message: 'Invalid credentials' },
      },
    });

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <SnackbarProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </SnackbarProvider>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/User Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8081/login", {
        userEmail: 'john@example.com',
        password: 'wrongpassword',
      });
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});