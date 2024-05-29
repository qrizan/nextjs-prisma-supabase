import { Prisma } from '@prisma/client'
import { Card } from 'flowbite-react'
import React from 'react'
import PriorityLevel from './PriorityLevel'
import StatusBadge from './StatusBadge'
import Link from 'next/link'

type ProjectWithUser = Prisma.ProjectGetPayload<{
  include: { assignedToUser: true }
}>

interface Props {
  projects: ProjectWithUser[]
}

const DashboardRecentProject = ({ projects }: Props) => {

  return (
    <Card className="w-full">
      <div className="mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Recenty Updated</h5>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {projects ? projects.map((project) => (
            <li key={project.id} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className='w-20'>
                  <StatusBadge status={project.status} />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/projects/${project.id}`}>
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{project.title}</p>
                  </Link>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">{project.assignedToUser?.name || "Unassigned"}</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <PriorityLevel priority={project.priority} />
                </div>
              </div>
            </li>
          )) : null}
        </ul>
      </div>
    </Card>
  )
}

export default DashboardRecentProject