import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from '../../src/components/common/Flyout';
import selectedItemsReducer from '../../src/store/selectedItemSlice';
import { createDownloadUrl } from '../../src/utils/FileSaver';

vi.mock('../../src/utils/FileSaver', () => ({
  createDownloadUrl: vi.fn(() => 'mock-url'),
  revokeDownloadUrl: vi.fn(),
}));

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { selectedItems: selectedItemsReducer },
      preloadedState,
    }),
  } = {}
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Flyout', () => {
  it('should render correctly when there are selected items', () => {
    const preloadedState = {
      selectedItems: {
        items: [
          {
            name: 'Luke Skywalker',
            gender: 'male',
            height: '172',
            mass: '77',
            id: 1,
          },
        ],
      },
    };

    renderWithProviders(<Flyout />, { preloadedState });

    expect(screen.getByText('Selected Items: 1')).toBeInTheDocument();
    expect(screen.getByText('UnselectAll')).toBeInTheDocument();
    expect(screen.getByText('Download selected')).toBeInTheDocument();
  });

  it('should not render when there are no selected items', () => {
    renderWithProviders(<Flyout />);

    expect(screen.queryByText('Selected Items:')).not.toBeInTheDocument();
  });

  it('should dispatch unselectAll action when UnselectAll button is clicked', () => {
    const preloadedState = {
      selectedItems: {
        items: [
          {
            name: 'Luke Skywalker',
            gender: 'male',
            height: '172',
            mass: '77',
            id: 1,
          },
        ],
      },
    };

    const store = configureStore({
      reducer: { selectedItems: selectedItemsReducer },
      preloadedState,
    });
    renderWithProviders(<Flyout />, { store });

    fireEvent.click(screen.getByText('UnselectAll'));

    expect(store.getState().selectedItems.items).toHaveLength(0);
  });

  it('should call createDownloadUrl and revokeDownloadUrl when Download selected button is clicked', () => {
    const preloadedState = {
      selectedItems: {
        items: [
          {
            name: 'Luke Skywalker',
            gender: 'male',
            height: '172',
            mass: '77',
            id: 1,
          },
        ],
      },
    };

    renderWithProviders(<Flyout />, { preloadedState });

    fireEvent.click(screen.getByText('Download selected'));

    expect(createDownloadUrl).toHaveBeenCalledTimes(1);
    expect(createDownloadUrl).toHaveBeenCalledWith(
      preloadedState.selectedItems.items
    );
  });
});
