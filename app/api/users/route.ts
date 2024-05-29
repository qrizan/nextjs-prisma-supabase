import prisma from "@/prisma/db";
import { userSchema } from "@/schemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import options from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  if (session.user?.role !== "ADMINISTRATOR") {
    return NextResponse.json({ error: 'Not Admin' }, { status: 401 })
  }

  const body = await request.json()
  const validation = userSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const duplicate = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })

  if (duplicate) {
    return NextResponse.json({ message: "Duplicate Email" }, { status: 409 })
  }

  const hashPasword = await bcrypt.hash(body.password, 10)

  body.password = hashPasword

  const newUser = await prisma.user.create({
    data: {
      ...body
    }
  })

  return NextResponse.json(newUser, { status: 201 })

}
