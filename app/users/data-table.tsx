"use client";

import { User } from "@prisma/client";
import { Table, Tooltip } from "flowbite-react"
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

interface Props {
  users: User[]
}

const UserDataTable = ({ users }: Props) => {
  return (

    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users ? users.map((user) => (

            <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white ">
                {user.name}
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell className="w-10">
                <Tooltip content="View User">
                  <Link href={`/users/${user.id}`} className='flex items-center justify-center'>
                    <HiArrowRight className='text-lg' />
                  </Link>
                </Tooltip>

              </Table.Cell>
            </Table.Row>

          )) : null}

        </Table.Body>
      </Table>
    </div>
  )
}

export default UserDataTable