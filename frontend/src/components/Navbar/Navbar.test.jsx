import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from './Navbar';
import { AuthContext } from "../../context/AuthContext";
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';
import { describe, expect, it } from 'vitest';

// 
vi.mock('axios');   //

describe('Navbar', () => {
  const mockSetUser = vi.fn();
  
  const renderNavbar = (user) => {
    render(
      <AuthContext.Provider value={{ user, setUser: mockSetUser }}>
        <Router>
          <Navbar />
        </Router>
      </AuthContext.Provider>
    );
  };

  it('renders the logo and main links', () => {
    renderNavbar(null);
    
    const logo = screen.getByTestId('navbar-logo');
    expect(logo).toBeInTheDocument();
    
    const homeLink = screen.getByText('Home');
    const booksLink = screen.getByText('Books');

    expect(homeLink).toBeInTheDocument();
    expect(booksLink).toBeInTheDocument();
  });

  it('toggles dropdown menu on user icon click', () => {
    renderNavbar({ role: 'user' });
    
    const userIcon = screen.getByTestId('navbar-user-icon');
    fireEvent.click(userIcon);
    
    const dropdownMenu = screen.getByTestId('dropdown-menu');
    expect(dropdownMenu).toBeInTheDocument();
  });

  it('shows additional admin links when user is admin', () => {
    renderNavbar({ role: 'admin' });
    
    const usersLink = screen.getByText('Users');
    const dashboardLink = screen.getByText('Dashboard');
    expect(usersLink).toBeInTheDocument();
    expect(dashboardLink).toBeInTheDocument();
  });

  it('handles logout correctly', async () => {
    axios.post.mockResolvedValue({ data: { message: "Logged out successfully" } });
    renderNavbar({ role: 'user' });
    
    fireEvent.click(screen.getByTestId('navbar-user-icon'));
    const logoutButton = screen.getByTestId('logout-button');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/logout');
      expect(mockSetUser).toHaveBeenCalledWith(null);
    });
  });
});