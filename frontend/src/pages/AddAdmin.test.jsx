import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AddAdmin from './AddAdmin';
import { describe, vi, it, beforeEach, afterEach, expect } from 'vitest';
import axios from 'axios';

vi.mock('axios');  

describe('AddAdmin Component', () => {

  beforeEach(() => {
    axios.post.mockClear();
  });

  it('shows validation error when fields are empty', () => {
    render(
      <SnackbarProvider>
        <MemoryRouter>
          <AddAdmin />
        </MemoryRouter>
      </SnackbarProvider>
    );

    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);

    expect(screen.getByText(/firstname is required!/i)).toBeInTheDocument();
    expect(screen.getByText(/lastname is required!/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is required!/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required!/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required!/i)).toBeInTheDocument();
  });

  it('submits form when all fields are valid', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Account created successfully' } });

    render(
      <SnackbarProvider>
        <MemoryRouter>
          <AddAdmin />
        </MemoryRouter>
      </SnackbarProvider>
    );

    fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123' } });

    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/firstname is required!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/lastname is required!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/phone number is required!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/email is required!/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/password is required!/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8081/register", {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        email: 'john@example.com',
        password: 'Password123',
        role: 'admin',
      });
    });
  });

  it('shows snackbar notification on successful submission', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Account created successfully' } });

    render(
      <SnackbarProvider>
        <MemoryRouter>
          <AddAdmin />
        </MemoryRouter>
      </SnackbarProvider> 
    );

    fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: '0987654321' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123' } });

    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/account created successfully/i)).toBeInTheDocument();
    });
  });

  it('resets form fields after successful submission', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Account created successfully' } });

    render(
      <SnackbarProvider>
        <MemoryRouter>
          <AddAdmin />
        </MemoryRouter>
      </SnackbarProvider>
    );

    fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'Mike' } });
    fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: '1112223333' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'mike@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123' } });

    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('firstName')).toHaveValue('');
      expect(screen.getByTestId('lastName')).toHaveValue('');
      expect(screen.getByTestId('phoneNumber')).toHaveValue('');
      expect(screen.getByTestId('email')).toHaveValue('');
      expect(screen.getByTestId('password')).toHaveValue('');
    });
  });


  it('shows error messages if submission fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to create account'));

    render(
      <SnackbarProvider>
        <MemoryRouter>
          <AddAdmin />
        </MemoryRouter>
      </SnackbarProvider>
    );

    fireEvent.change(screen.getByTestId('firstName'), { target: { value: '' } });
    // fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Johnson' } });
    fireEvent.change(screen.getByTestId('phoneNumber'), { target: { value: '334444' } });
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'Password123' } });

    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Phone number must be exactly 10 digits./i)).toBeInTheDocument();
      expect(screen.getByText(/firstName is required!/i)).toBeInTheDocument();
      
    });
  });
});