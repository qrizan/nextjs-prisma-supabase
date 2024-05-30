import prisma from '@/prisma/db'
import React from 'react'
import DashboardRecentProject from './components/DashboardRecentProject'
import DashboardChart from './components/DashboardChart'
import { HiOutlineArrowRight } from "react-icons/hi";
import options from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import DashboardStats from './components/DashboardStats';

const Dashboard = async () => {
  const session = await getServerSession(options)

  if (!session) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
        <div className="text-center text-gray-600 dark:text-white md:text-left">
          Project Management Application
        </div>
        <Button as={Link} href="/api/auth/signin" className="flex items-center">
          Get Started
          <HiOutlineArrowRight className="ml-2 size-5" />
        </Button>
      </div>
    )
  }

  const recentprojects = await prisma.project.findMany({
    where: {
      NOT: [
        {
          status: "CLOSED"
        }
      ]
    },
    orderBy: {
      updatedAt: "desc"
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true
    }
  })

  const groupProject = await prisma.project.groupBy({
    by: ["status"],
    _count: {
      id: true
    }
  })

  const dataProjects = groupProject.map((item) => {
    return {
      name: item.status,
      total: item._count.id
    }
  })

  const dataTotal = {
    projects: await prisma.project.count(),
    users: await prisma.user.count(),
    categories: await prisma.category.count()
  }

  return (
    <div>
      <div className='my-4 px-2'>
        <DashboardStats data={dataTotal} />
      </div>
      <div className='grid gap-4 px-2 md:grid-cols-2'>
        <DashboardRecentProject projects={recentprojects} />
        <DashboardChart data={dataProjects} />
      </div>
    </div>
  )
}

export default Dashboard