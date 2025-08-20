import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/header/Header';
import './Layout.css';

const Layout = () => {
  return (
    <>
      <Header />
      <nav className="layout-nav">
        <Link to="/" className="layout-link">Home</Link>
        <Link to="/about" className="layout-link">About</Link>
      </nav>
      <div className="layout-content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
