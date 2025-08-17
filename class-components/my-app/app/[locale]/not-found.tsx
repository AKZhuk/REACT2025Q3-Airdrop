import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className="not-found">
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <Link href="/" className="layout-link">
        {t('cta')}
      </Link>
    </div>
  );
}
