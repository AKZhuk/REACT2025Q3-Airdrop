import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useSearchParams, useLocation } from 'react-router-dom';
import Pagination from './Pagination';

const WrapperWithSearchParams: React.FC<{ initialPage?: string }> = ({ initialPage = '1' }) => {
  const [, setSearchParams] = useSearchParams();
  React.useEffect(() => {
    setSearchParams({ page: initialPage });
  }, [initialPage, setSearchParams]);
  return <Pagination />;
};

const LocationReader: React.FC = () => {
  const { search } = useLocation();
  return <div data-testid="location-search">{search}</div>;
};

describe('Pagination component', () => {
  it('should display current page', () => {
    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <Pagination />
      </MemoryRouter>
    );
    expect(screen.getByText(/Page 3/i)).toBeInTheDocument();
  });

  it('disables "Previous" button on page 1', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Pagination />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('clicking "Next" updates the page and query param', async () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <WrapperWithSearchParams initialPage="2" />
        <LocationReader />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(await screen.findByText(/Page 3/i)).toBeInTheDocument();
    expect(screen.getByTestId('location-search').textContent).toContain('page=3');
  });

  it('clicking "Previous" works when page > 1', async () => {
    render(
      <MemoryRouter initialEntries={['/?page=5']}>
        <WrapperWithSearchParams initialPage="5" />
        <LocationReader />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(await screen.findByText(/Page 4/i)).toBeInTheDocument();
    expect(screen.getByTestId('location-search').textContent).toContain('page=4');
  });
});
