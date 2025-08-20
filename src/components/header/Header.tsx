'use client';

import React from 'react';
import { Link, usePathname } from '../../i18n/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import './Header.css';

const Header: React.FC = () => {
  const t = useTranslations('Header');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="header">
      <h1 className="header__title">{t('title')}</h1>

      <nav className="header__nav" aria-label="Main">
        <ul className="header__nav-list">
          <li>
            <Link
              href="/"
              className={`header__link ${isActive('/') ? 'header__link--active' : ''}`}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              {t('home')}
            </Link>
          </li>
          <li className="header__separator" aria-hidden="true">|</li>
          <li>
            <Link
              href="/about"
              className={`header__link ${isActive('/about') ? 'header__link--active' : ''}`}
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              {t('about')}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="header__theme-toggle">
        <label className="header__theme-label">{t('theme')}:</label>
        <button
          onClick={toggleTheme}
          className="header__theme-button"
          aria-pressed={theme === 'dark'}
          title={t(theme === 'light' ? 'light' : 'dark')}
        >
          {theme === 'light' ? t('light') : t('dark')}
        </button>

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
