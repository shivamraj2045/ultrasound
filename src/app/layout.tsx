import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Ultrasound Probe',
  description: 'Portable Handheld Ultrasound – Clinic Dashboard',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 48 48%22 fill=%22none%22><path d=%22M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24%22 stroke=%22%233b82f6%22 stroke-width=%224%22 stroke-linecap=%22round%22/><path d=%22M24 6C33.9411 6 42 14.0589 42 24%22 stroke=%22%2316a34a%22 stroke-opacity=%220.7%22 stroke-width=%224%22 stroke-linecap=%22round%22/><path d=%22M14 24H19L22 18L26 30L29 18L32 24H37%22 stroke=%22%233b82f6%22 stroke-width=%223%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
