'use client';

import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '../context/UserContext';
import UserProfileModal from './UserProfileModal';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
        <UserProfileModal />
      </UserProvider>
    </SessionProvider>
  );
} 