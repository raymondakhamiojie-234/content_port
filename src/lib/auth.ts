import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@queenfineshii.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const normalizedEmail = credentials.email.trim().toLowerCase();

        // Check if database has any existing admin users
        const userCount = await prisma.user.count();
        if (userCount === 0) {
          const defaultAdminEmail = (process.env.ADMIN_EMAIL || "admin@queenfineshii.com").trim().toLowerCase();
          const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || "password123";

          if (normalizedEmail === defaultAdminEmail && credentials.password === initialPassword) {
            // First-time setup: persist properly hashed credentials to DB immediately
            const hashedPassword = await hash(credentials.password, 12);
            const newAdmin = await prisma.user.create({
              data: {
                email: defaultAdminEmail,
                name: "Admin",
                password: hashedPassword,
              }
            });

            return {
              id: newAdmin.id,
              email: newAdmin.email,
              name: newAdmin.name,
            };
          }
        }

        // Standard secure database lookup with bcrypt comparison
        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  }
};
