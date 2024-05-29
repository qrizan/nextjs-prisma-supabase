import prisma from "@/prisma/db";
import { projectSchema } from "@/schemas/projects";
import { NextRequest, NextResponse } from "next/server";
import options from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }


  const body = await request.json()
  const validation = projectSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400
    })
  }

  const newTicket = await prisma.project.create({
    data: { ...body }
  })

  return NextResponse.json(newTicket, { status: 201 })
}
