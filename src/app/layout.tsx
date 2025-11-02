import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'New Muslim Stories',
  description: 'Inspiring journeys to Islam from around the world.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}