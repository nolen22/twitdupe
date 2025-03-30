import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.name) return null;

        // Create or find user
        const user = await prisma.user.upsert({
          where: { name: credentials.name },
          update: {},
          create: {
            name: credentials.name,
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(credentials.name)}`,
          },
        });

        return {
          id: user.id,
          name: user.name,
          image: user.image,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
}; 