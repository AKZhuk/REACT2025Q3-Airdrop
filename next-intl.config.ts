import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  const messages = (await import(`./src/i18n/messages/${locale}.json`)).default;
  return { messages, locale };
});
