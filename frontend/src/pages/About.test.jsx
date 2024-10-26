import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect,vi } from 'vitest';
import About from './About';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const mockAuthContextValue = {
  user: { role: 'user' },
  setUser: vi.fn(),
};

describe('About Component', () => {
  it('renders Navbar and Footer', async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter>
          <About />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  it('renders main text content', async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter>
          <About />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Immerse yourself in a world of knowledge and inspiration at your fingertips./i)).toBeInTheDocument();
      expect(screen.getByText(/We are passionate about connecting people with books, improving access to the vast world of knowledge and imagination./i)).toBeInTheDocument();
    });
  });

  it('renders Count, Vision, and Team components', async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter>
          <About />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('count')).toBeInTheDocument();
      expect(screen.getByTestId('vision')).toBeInTheDocument();
      expect(screen.getByTestId('team')).toBeInTheDocument();
    });
  });
});