import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Pokemon Search',
  description: 'SSR + Next.js App Router migration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
