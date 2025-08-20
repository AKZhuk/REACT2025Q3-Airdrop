import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store as appStore } from '../store';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';

type Options = {
  route?: string;
  store?: typeof appStore;
};

export function renderWithProviders(
  ui: React.ReactElement,
  { route = '/', store = appStore }: Options = {}
) {
  window.history.pushState({}, 'Test', route);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <ThemeProvider>{ui}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
}
