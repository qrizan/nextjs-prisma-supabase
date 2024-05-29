import prisma from "@/prisma/db"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from 'bcrypt';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "password",
      name: "Email and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email
          }
        })

        if (!user) {
          return null
        }

        const match = await compare(credentials!.password, user.password)

        if (match) {
          return user
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.role = user.role
      }

      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || "USER"
      }
      return session
    },
  }
}

export default options