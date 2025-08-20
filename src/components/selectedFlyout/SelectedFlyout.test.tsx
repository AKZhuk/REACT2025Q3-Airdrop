import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedFlyout from './SelectedFlyout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearItems } from '../../store/selectedItemsSlice';
import * as downloadUtils from '../../utils/downloadCSV';

jest.mock('../../store/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../../utils/downloadCSV', () => ({
  downloadCSV: jest.fn(),
}));

describe('SelectedFlyout', () => {
  const mockDispatch = jest.fn();
  const mockClearAction = clearItems();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not render if no items are selected', () => {
    (useAppSelector as jest.Mock).mockReturnValue([]);

    const { container } = render(<SelectedFlyout />);
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly with selected items and handles actions', () => {
    const selectedItems = [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ];
    (useAppSelector as jest.Mock).mockReturnValue(selectedItems);

    render(<SelectedFlyout />);

    expect(screen.getByText(/2 item\(s\) selected/i)).toBeInTheDocument();
    expect(screen.getByText(/Unselect all/i)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Unselect all/i));
    expect(mockDispatch).toHaveBeenCalledWith(mockClearAction);

    fireEvent.click(screen.getByText(/Download/i));
    expect(downloadUtils.downloadCSV).toHaveBeenCalledWith(selectedItems);
  });
});
