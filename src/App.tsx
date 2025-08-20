import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import MainWithDetails from './pages/MainWithDetails/MainWithDetails';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<MainWithDetails />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;