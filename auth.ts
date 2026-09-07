import NextAuth from "next-auth"
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";


export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        return token;
      }

      // Heal stale session ids after DB reseed (same email, new id)
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { id: true, name: true, email: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        // session.user.role = token.role as string;
        // session.user.image = token.image as string;
      }
      return session;
    }
  },
  providers: [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },

    async authorize(credentials) {
      try {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          return null;
        }
        const isValidPassword = await comparePasswords(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
     
        };
      } catch (error) {
        console.error("Error during authorization:", error);
        return null;
      }

    },
  }),
],
})


export async function hashPassword (password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);

}


export async function comparePasswords (password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}