"use client";

import { Project } from '@prisma/client'
import React from 'react'
import { Table, Tooltip } from "flowbite-react";
import StatusBadge from '../components/StatusBadge';
import PriorityLevel from '../components/PriorityLevel';
import Link from 'next/link';
import { HiArrowRight } from "react-icons/hi";

interface Props {
  projects: Project[]
}

const DataTable = ({ projects }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Priority</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {projects ? projects.map((project) => (

            <Table.Row key={project.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white ">
                {project.title}
              </Table.Cell>
              <Table.Cell>{project.category.name}</Table.Cell>
              <Table.Cell>
                <StatusBadge status={project.status} />
              </Table.Cell>
              <Table.Cell>
                <PriorityLevel priority={project.priority} />
              </Table.Cell>
              <Table.Cell>
                {project.createdAt.toLocaleDateString("en-US", {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </Table.Cell>
              <Table.Cell className="w-10">
                <Tooltip content="View Product">
                  <Link href={`/projects/${project.id}`} className='flex items-center justify-center'>
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

export default DataTable