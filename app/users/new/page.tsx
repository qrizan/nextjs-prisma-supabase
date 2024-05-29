import options from '@/app/api/auth/[...nextauth]/options'
import UserForm from '@/app/components/UserForm'
import { Alert, Card } from 'flowbite-react'
import { getServerSession } from 'next-auth'
import React from 'react'
import { HiInformationCircle } from "react-icons/hi";

const NewUser = async () => {
  const session = await getServerSession(options)

  if (session?.user.role !== "ADMINISTRATOR") {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info!</span> Admin access required.
      </Alert>
    )
  }

  return (
    <Card>
      <UserForm />
    </Card>
  )
}

export default NewUser