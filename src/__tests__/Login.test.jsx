import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

describe('Login Page OAuth Buttons', () => {
  test('renders Google, LinkedIn, and Facebook OAuth buttons', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const googleButton = screen.getByRole('button', { name: /google/i });
    const linkedInButton = screen.getByRole('button', { name: /linkedin/i });
    const facebookButton = screen.getByRole('button', { name: /facebook/i });

    expect(googleButton).toBeInTheDocument();
    expect(linkedInButton).toBeInTheDocument();
    expect(facebookButton).toBeInTheDocument();
  });

  test('clicking OAuth buttons triggers redirect', () => {
    delete window.location;
    window.location = { href: '' };

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const googleButton = screen.getByRole('button', { name: /google/i });
    fireEvent.click(googleButton);
    expect(window.location.href).toContain('/api/auth/google');

    const linkedInButton = screen.getByRole('button', { name: /linkedin/i });
    fireEvent.click(linkedInButton);
    expect(window.location.href).toContain('/api/auth/linkedin');

    const facebookButton = screen.getByRole('button', { name: /facebook/i });
    fireEvent.click(facebookButton);
    expect(window.location.href).toContain('/api/auth/facebook');
  });
});
