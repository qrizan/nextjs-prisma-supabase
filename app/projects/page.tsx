import prisma from '@/prisma/db'
import React from 'react'
import DataTable from './data-table'
import PaginationTable from '../components/PaginationTable'
import { Alert, Button } from "flowbite-react";
import { VscDiffAdded } from "react-icons/vsc";
import Link from 'next/link';
import StatusFilter from '../components/StatusFilter';
import { Status } from '@prisma/client';
import options from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { HiInformationCircle } from "react-icons/hi";


export interface SearchParams {
  status: Status,
  page: string
}

const Projects = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await getServerSession(options)

  if (!session) {
    return (
      <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info!</span> Not authenticated.
      </Alert>
    )
  }

  const pageSize = 10
  const page = parseInt(searchParams.page) || 1

  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined


  let where = {}

  if (status) {
    where = {
      status
    }
  }

  const projectCount = await prisma.project.count({ where })

  const projects = await prisma.project.findMany({
    where,
    include: {
      category: true
    },
    take: pageSize,
    skip: (page - 1) * pageSize
  })

  return (
    <div>
      <div className='mb-4 flex items-center justify-between'>
        <Button as={Link} href="/projects/new" color="blue"><VscDiffAdded className="mr-2 size-5" />Create Project</Button>
        <StatusFilter />
      </div>
      <DataTable projects={projects} />
      <PaginationTable
        itemCount={projectCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  )
}

export default Projects