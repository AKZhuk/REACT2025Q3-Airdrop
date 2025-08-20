'use client';

import React from 'react';
import { useRouter, usePathname } from '../../i18n/navigation';
import { useLocale } from 'next-intl';
import { locales, type AppLocale } from '../../i18n/config';

const LanguageSwitcher: React.FC = () => {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();

  const changeLang = (next: AppLocale) => {
    router.replace({ pathname }, { locale: next });
  };

  return (
    <div style={{ display: 'inline-flex', gap: 8, marginLeft: 8 }}>
      <select
        aria-label="language"
        value={locale}
        onChange={(e) => changeLang(e.target.value as AppLocale)}
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
