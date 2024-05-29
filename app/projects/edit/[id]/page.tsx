import options from '@/app/api/auth/[...nextauth]/options'
import ProjectForm from '@/app/components/ProjectForm'
import prisma from '@/prisma/db'
import { Alert, Card } from 'flowbite-react'
import { getServerSession } from 'next-auth'
import React from 'react'
import { HiInformationCircle } from "react-icons/hi";

interface Props {
  params: { id: string }
}

const EditProject = async ({ params }: Props) => {
  const session = await getServerSession(options)

  if (!session) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info!</span> Not authenticated.
      </Alert>
    )
  }

  const category = await prisma.category.findMany()

  const project = await prisma?.project.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!project) {
    return <p>Project not found</p>
  }

  return (
    <Card>
      <ProjectForm project={project} categories={category} />
    </Card>
  )
}

export default EditProject