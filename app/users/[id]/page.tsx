import UserForm from '@/app/components/UserForm'
import prisma from '@/prisma/db'
import React from 'react'
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Card } from "flowbite-react";
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

interface Props {
  params: { id: string }
}

const EditUser = async ({ params }: Props) => {

  const session = await getServerSession(options)

  if (session?.user.role !== "ADMINISTRATOR") {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info!</span> Admin access required.
      </Alert>
    )
  }

  const user = await prisma?.user.findUnique({
    where: {
      id: parseInt(params.id)
    },
  })

  if (!user) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info!</span> User not found.
      </Alert>
    )
  }

  user.password = ''
  return (
    <Card>
      <UserForm user={user} />
    </Card>
  )
}

export default EditUser