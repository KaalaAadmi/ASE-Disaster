import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginScreen from './LoginScreen';
import { login, logout } from '../../api/auth';

// Mock the login and logout functions from the auth API
jest.mock('../../api/auth', () => ({
  login: jest.fn(),
  logout: jest.fn(),
}));

describe('LoginScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoginScreen with email and password input fields', () => {
    render(<LoginScreen />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('handles email and password input changes', () => {
    render(<LoginScreen />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpassword' },
    });

    expect(screen.getByPlaceholderText('Email').value).toBe('test@example.com');
    expect(screen.getByPlaceholderText('Password').value).toBe('testpassword');
  });

  test('calls the login function with the correct email and password when LOGIN button is clicked', async () => {
    render(<LoginScreen />);
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpassword' },
    });

    fireEvent.click(screen.getByText('LOGIN'));

    await waitFor(() =>
      expect(login).toHaveBeenCalledWith(
        'test@example.com',
        'testpassword',
        expect.any(Function)
      )
    );
  });

  test('calls the logout function when Logout button is clicked', async () => {
    render(<LoginScreen />);
    // Set isAuthenticated state to true to show the Logout button
    fireEvent.click(screen.getByText('Welcome!'));
    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => expect(logout).toHaveBeenCalled());
  });
});
