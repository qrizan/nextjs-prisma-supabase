import { Card } from 'flowbite-react'
import React from 'react'
import { PiUsersThreeLight } from "react-icons/pi";
import { formatNumber } from '@/utils/formatNumber';
import { GoProjectSymlink } from "react-icons/go";
import { MdCategory } from "react-icons/md";

interface dataElements {
  projects: number
  users: number
  categories: number
}
interface Props {
  data: dataElements
}

const DashboardStats = ({ data }: Props) => {
  return (
    <div className='grid gap-1 sm:grid-cols-3 sm:gap-4 '>
      <Card className="w-full">
        <div className='flex items-center justify-between'>
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {formatNumber(data.projects)}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Total Projects
            </p>
          </div>
          <div>
            <GoProjectSymlink className='text-4xl' />
          </div>
        </div>
      </Card>
      <Card className="w-full">
        <div className='flex items-center justify-between'>
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {formatNumber(data.users)}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Total Users
            </p>
          </div>
          <div>
            <PiUsersThreeLight className='text-4xl' />
          </div>
        </div>
      </Card>
      <Card className="w-full">
        <div className='flex items-center justify-between'>
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {formatNumber(data.categories)}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Total Categories
            </p>
          </div>
          <div>
            <MdCategory className='text-4xl' />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DashboardStats