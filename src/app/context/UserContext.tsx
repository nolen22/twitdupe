'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

interface UserContextType {
  user: User | null;
  login: (user: { id: string; name: string; avatar: string }) => void;
}

const UserContext = createContext<UserContextType>({ 
  user: null,
  login: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  } : null;

  const login = (userData: { id: string; name: string; avatar: string }) => {
    // Since we're using NextAuth now, this function is just a placeholder
    // You might want to trigger the NextAuth signin instead
    console.warn('Using login() is deprecated. Please use NextAuth signin instead.');
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
} 