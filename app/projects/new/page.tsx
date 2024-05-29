import prisma from '@/prisma/db'
import React from 'react'
import dynamic from 'next/dynamic'
import { Alert, Card } from 'flowbite-react'
import { HiInformationCircle } from "react-icons/hi";
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';


const ProjectForm = dynamic(() => import('@/app/components/ProjectForm'), {
  ssr: false
})

const NewProject = async () => {

  const session = await getServerSession(options)

  if (!session) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info!</span> Not authenticated.
      </Alert>
    )
  }

  const category = await prisma.category.findMany()

  return (
    <Card>
      <ProjectForm categories={category} />
    </Card>
  )
}

export default NewProject