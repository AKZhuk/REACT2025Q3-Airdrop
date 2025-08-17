
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ru'] as const;

const nav = createNavigation({
  locales,
  localePrefix: 'as-needed'
});

export const { Link, redirect, usePathname, useRouter } = nav;