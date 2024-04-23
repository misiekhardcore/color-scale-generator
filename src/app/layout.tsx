import type { Metadata } from 'next';

import './globals.scss';

export const metadata: Metadata = {
  title: 'Color Scale Generator',
  description: 'Generate color scales easily',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
