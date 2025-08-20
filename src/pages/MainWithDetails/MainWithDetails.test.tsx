import React from 'react';
import { render, screen } from '@testing-library/react';
import MainWithDetails from './MainWithDetails';
import { MemoryRouter, useSearchParams } from 'react-router-dom';

jest.mock('../MainPage/MainPage', () => {
  const MockMainPage = () => <div data-testid="mock-main-page">MainPage</div>;
  MockMainPage.displayName = 'MockMainPage';
  return MockMainPage;
});

jest.mock('../../components/pokemonDetail/PokemonDetail', () => {
  const MockDetail = () => <div data-testid="mock-pokemon-detail">Detail</div>;
  MockDetail.displayName = 'MockPokemonDetail';
  return MockDetail;
});

jest.mock('../../components/selectedFlyout/SelectedFlyout', () => {
  const MockFlyout = () => <div data-testid="mock-selected-flyout">Flyout</div>;
  MockFlyout.displayName = 'MockSelectedFlyout';
  return MockFlyout;
});

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: jest.fn(),
  };
});

const mockUseSearchParams =
  useSearchParams as jest.MockedFunction<typeof useSearchParams>;

const renderWithParams = (query: string) => {
  mockUseSearchParams.mockReturnValue([new URLSearchParams(query), jest.fn()]);
  return render(
    <MemoryRouter>
      <MainWithDetails />
    </MemoryRouter>
  );
};

describe('MainWithDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders MainPage and SelectedFlyout, but not PokemonDetail by default', () => {
    renderWithParams('');
    expect(screen.getByTestId('mock-main-page')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-pokemon-detail')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-selected-flyout')).toBeInTheDocument();
  });

  it('renders PokemonDetail when "details" query param is present', () => {
    renderWithParams('?details=1');
    expect(screen.getByTestId('mock-main-page')).toBeInTheDocument();
    expect(screen.getByTestId('mock-pokemon-detail')).toBeInTheDocument();
    expect(screen.getByTestId('mock-selected-flyout')).toBeInTheDocument();
  });
});
