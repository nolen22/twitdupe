import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from './context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TwitDupe - A Twitter Clone',
  description: 'A Twitter clone built with Next.js, featuring real-time updates and modern UI.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <UserProvider>
          <div className="min-h-full bg-gray-50">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
