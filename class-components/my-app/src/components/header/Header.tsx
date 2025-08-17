'use client';

import React from 'react';
import { Link } from '../../i18n/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import './Header.css';

const Header: React.FC = () => {
  const t = useTranslations('Header');
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1 className="header__title">{t('title')}</h1>
      <nav className="header__nav">
        <Link href="/" className="header__link">{t('home')}</Link>
        <span className="header__separator">|</span>
        <Link href="/about" className="header__link">{t('about')}</Link>
      </nav>

      <div className="header__theme-toggle">
        <label className="header__theme-label">{t('theme')}:</label>
        <button onClick={toggleTheme} className="header__theme-button">
          {theme === 'light' ? t('light') : t('dark')}
        </button>

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
