'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
