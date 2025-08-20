import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const messages = (await import(`./src/i18n/messages/${locale}.json`)).default;
  return { messages, locale };
});
