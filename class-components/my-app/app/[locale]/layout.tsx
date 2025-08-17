import React from 'react';
import '../globals.css';
import { Providers } from '../providers/providers';
import { notFound } from 'next/navigation';
import { locales, type AppLocale } from '../../src/i18n/config';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Pokemon Search',
  description: 'SSR + RTK Query demo'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: AppLocale };
}) {
  const { locale } = params;
  if (!locales.includes(locale)) notFound();

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
