import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from './context/UserContext';
import UserProfileModal from './components/UserProfileModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TwitDupe',
  description: 'A Twitter clone built with Next.js',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
          {children}
          <UserProfileModal />
        </UserProvider>
      </body>
    </html>
  );
}
