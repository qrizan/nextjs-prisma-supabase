import React from 'react'
import { Card, Button } from "flowbite-react";
import Link from 'next/link';
import { Project, User } from '@prisma/client';
import ReactMarkdown from 'react-markdown'
import DeleteButton from './delete-button';
import StatusBadge from '@/app/components/StatusBadge';
import PriorityLevel from '@/app/components/PriorityLevel';
import AssignProject from './assign-project';

interface Props {
  project: Project;
  users: User[]
}

const ProjectDetail = ({ project, users }: Props) => {
  return (
    <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <Card className="w-full md:w-2/3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <StatusBadge status={project.status} />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {project.title}
            </h5>
          </div>
          <PriorityLevel priority={project.priority} />
        </div>
        <div className="prose mt-4 dark:prose-invert">
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            Updated:{" "}
            {project.updatedAt.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </Card>
      <Card className="size-full md:w-1/3">
        <AssignProject project={project} users={users} />
        <div className="mt-4 flex justify-between">
          <Button as={Link} href={`/projects/edit/${project.id}`}>
            Edit Project
          </Button>
          <DeleteButton projectId={project.id} />
        </div>
      </Card>
    </div>

  )
}

export default ProjectDetail