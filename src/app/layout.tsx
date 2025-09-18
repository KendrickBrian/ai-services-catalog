import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const fontJetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Бесплатные ИИ',
  description: 'Лучшие нейросети 2025',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn(
        'dark',
        fontInter.variable,
        fontSpaceGrotesk.variable,
        fontJetBrainsMono.variable
      )}
    >
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground bg-gradient-to-br from-bg-start to-bg-end min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
