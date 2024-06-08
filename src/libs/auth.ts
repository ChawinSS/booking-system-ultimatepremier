import { config } from 'dotenv';
config();

// Add this line to check if NEXTAUTH_SECRET is being loaded
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);

import { NextAuthOptions } from 'next-auth';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import sanityClient from './sanity';

export const authOptions: NextAuthOptions = {
  providers: [
    /*
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    SanityCredentials(sanityClient),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  adapter: SanityAdapter(sanityClient),
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      console.log('Session callback:', session, token); // Add debug log
      const userEmail = token.email;
      const userIdObj = await sanityClient.fetch<{ _id: string }>(
        `*[_type == "user" && email == $email][0] {
            _id
        }`,
        { email: userEmail }
      );
      if (!userIdObj) {
        throw new Error('User not found');
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: userIdObj._id,
        },
      };
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      console.log('JWT callback:', token, user, account, profile, isNewUser); // Add debug log
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
