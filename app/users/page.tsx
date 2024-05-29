import React from 'react'
import UserForm from '../components/UserForm'
import UserDataTable from './data-table'
import prisma from '@/prisma/db'
import { Alert, Button } from 'flowbite-react'
import Link from 'next/link'
import { VscDiffAdded } from "react-icons/vsc";
import options from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { HiInformationCircle } from "react-icons/hi";


const Users = async () => {

  const session = await getServerSession(options)

  if (session?.user.role !== "ADMINISTRATOR") {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info!</span> Admin access required.
      </Alert>
    )
  }

  const users = await prisma.user.findMany()

  return (
    <div>
      <div className='mb-4 flex items-center justify-between'>
        <Button as={Link} href="/users/new" color="blue"><VscDiffAdded className="mr-2 size-5" />Create User</Button>
      </div>
      <UserDataTable users={users} />
    </div>

  )
}

export default Users