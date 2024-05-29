import React from 'react'
import ProjectDetail from './detail-project'
import { Card, Button, Alert } from "flowbite-react";
import Link from 'next/link';
import prisma from '@/prisma/db';
import { HiInformationCircle } from "react-icons/hi";
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

interface Props {
  params: { id: string }
}

const ViewProject = async ({ params }: Props) => {
  const session = await getServerSession(options)

  if (!session) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info!</span> Not authenticated.
      </Alert>
    )
  }

  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) }
  })

  const users = await prisma.user.findMany()

  if (!project) {
    return <p>Project not found</p>
  }

  return (
    <ProjectDetail project={project} users={users} />
  )
}

export default ViewProject