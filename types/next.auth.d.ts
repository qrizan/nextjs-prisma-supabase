import NextAuth, { DefaulSessions } from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: string;
    } & DefaulSessions["user"]
  }

  interface User {
    id: number,
    name: string,
    email: string,
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
  }
}