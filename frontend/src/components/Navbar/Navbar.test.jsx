import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Helper function to render the component with AuthContext and Router
const renderWithAuthContext = (contextValue) => {
    return render(
        <AuthContext.Provider value={contextValue}>
            <Router>
                <Navbar />
            </Router>
        </AuthContext.Provider>
    );
};

describe('Navbar', () => {
    it('renders the navbar with logo and menu items', () => {
        renderWithAuthContext({ user: null }); // No user logged in

        // Navbar should render
        expect(screen.getByTestId('navbar')).toBeInTheDocument();

        // Logo should render
        expect(screen.getByTestId('logo')).toBeInTheDocument();

        // Menu items should render
        expect(screen.getByText(/home/i)).toBeInTheDocument();
        expect(screen.getByText(/books/i)).toBeInTheDocument();
    });

    it('renders the About link when user is logged in with role user', () => {
        renderWithAuthContext({ user: { role: 'user' } });

        // The 'About' link should be present
        expect(screen.getByTestId('user-about-link')).toBeInTheDocument();
    });

    it('renders the Users and Dashboard links when user is admin', () => {
        renderWithAuthContext({ user: { role: 'admin' } });

        // The 'Users' and 'Dashboard' links should be present
        expect(screen.getByTestId('admin-users-link')).toBeInTheDocument();
        expect(screen.getByTestId('admin-dashboard-link')).toBeInTheDocument();
    });

    it('opens dropdown menu on clicking user avatar', () => {
        renderWithAuthContext({ user: { role: 'user' } });

        // Avatar should be present
        const avatar = screen.getByTestId('user-avatar');
        expect(avatar).toBeInTheDocument();

        // Click the avatar
        fireEvent.click(avatar);

        // Dropdown menu should appear
        expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
        expect(screen.getByTestId('profile-link')).toBeInTheDocument();
        expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });

    it('logs out the user when Logout button is clicked', async () => {
        axios.post.mockResolvedValueOnce({ data: { message: 'Logged out successfully' } });

        renderWithAuthContext({ user: { role: 'user' } });

        // Open dropdown by clicking avatar
        fireEvent.click(screen.getByTestId('user-avatar'));

        // Click the logout button
        const logoutButton = screen.getByTestId('logout-button');
        fireEvent.click(logoutButton);

        // Ensure that axios.post was called to the logout endpoint
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/logout');
    });

    it('redirects to correct routes on clicking menu links', () => {
        const { getByText } = renderWithAuthContext({ user: null });

        // Click on 'Home' link
        const homeLink = getByText(/home/i);
        fireEvent.click(homeLink);
        expect(window.location.pathname).toBe('/home');

        // Click on 'Books' link
        const booksLink = getByText(/books/i);
        fireEvent.click(booksLink);
        expect(window.location.pathname).toBe('/books');
    });
});