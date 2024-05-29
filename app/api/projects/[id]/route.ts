import prisma from "@/prisma/db";
import { projectPatchSchema } from "@/schemas/projects";
import { NextRequest, NextResponse } from "next/server";
import options from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(options)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()
  const validation = projectPatchSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400
    })
  }

  const project = await prisma.project.findUnique({ where: { id: parseInt(params.id) } })

  if (!project) {
    return NextResponse.json({ error: "Project not found " }, { status: 404 })
  }

  if (body?.assignedToUserId) {
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }

  const updateProject = await prisma.project.update({
    where: { id: project.id },
    data: {
      ...body
    }
  })

  return NextResponse.json(updateProject)

}


export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(options)

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!project) {
    return NextResponse.json({ error: "Project not found " }, { status: 404 })
  }

  await prisma.project.delete({
    where: { id: project.id }
  })

  return NextResponse.json({ message: "Project deleted" })
}