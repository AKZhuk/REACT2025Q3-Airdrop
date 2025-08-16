import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../test/test-utils';
import Layout from './Layout';

jest.mock('../components/header/Header', () => {
  const MockHeader = () => <header data-testid="mock-header">Mock Header</header>;
  MockHeader.displayName = 'MockHeader';
  return MockHeader;
});

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  const MockOutlet = () => <div data-testid="mock-outlet">Mock Outlet Content</div>;
  MockOutlet.displayName = 'MockOutlet';
  return {
    ...actual,
    Outlet: MockOutlet,
  };
});

describe('Layout', () => {
  it('renders Header, navigation links, and Outlet content', () => {
    renderWithProviders(<Layout />, { route: '/' });

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });
});
