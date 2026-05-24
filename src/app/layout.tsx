import dynamic from 'next/dynamic';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import './globals.css';

const PlausibleAnalytics = dynamic(() => import('@/components/PlausibleAnalytics'), { ssr: false });

export { metadata, viewport } from '@/lib/metadata';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
      </head>
      <body>
        {children}
        <PlausibleAnalytics />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
