import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'New Muslim Stories',
  description: 'Inspiring journeys to Islam from around the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: <html> is defined in the locale layout to set proper lang/dir
  return <body className={inter.className}>{children}</body>;
}