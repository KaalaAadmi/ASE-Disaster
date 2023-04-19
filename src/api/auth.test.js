import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { login, logout } from './Auth';

const mock = new MockAdapter(axios);

describe('Auth', () => {
  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test('login should set tokens and call setIsAuthenticated on success', async () => {
    const setIsAuthenticated = jest.fn();
    const email = 'test@example.com';
    const password = 'password';
    const accessToken = 'access-token';
    const isAdmin = true;

    mock.onPost('http://127.0.0.1:8000/api/v1/auth/login').reply(200, {
      accessToken,
      isAdmin,
    });

    await login(email, password, setIsAuthenticated);

    expect(localStorage.setItem).toHaveBeenLastCalledWith('isAdmin', isAdmin.toString());
    expect(localStorage.setItem).toHaveBeenLastCalledWith('token', accessToken);
    expect(setIsAuthenticated).toHaveBeenCalledWith(true);
  });

  test('login should log error messages on failure', async () => {
    const setIsAuthenticated = jest.fn();
    const email = 'test@example.com';
    const password = 'wrong-password';

    mock.onPost('http://127.0.0.1:8000/api/v1/auth/login').reply(401);

    console.log = jest.fn();

    await login(email, password, setIsAuthenticated);

    expect(console.log).toHaveBeenCalledWith('Incorrect email or password');
    expect(setIsAuthenticated).not.toHaveBeenCalled();
  });

  test('logout should remove tokens and log message on success', async () => {
    const accessToken = 'access-token';
    const isAdmin = true;
    localStorage.setItem('token', accessToken);
    localStorage.setItem('isAdmin', isAdmin.toString());

    mock.onGet('http://127.0.0.1:8000/api/v1/auth/logout').reply(200);

    console.log = jest.fn();

    await logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('isAdmin');
    expect(console.log).toHaveBeenCalledWith('Successful Logout!');
  });
});
