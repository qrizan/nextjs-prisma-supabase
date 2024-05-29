"use client"

import { Status } from '@prisma/client';
import { Card } from 'flowbite-react'
import React from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'

interface dataElements {
  name: Status
  total: number;
}

interface Props {
  data: dataElements[]
}

const DashboardChart = ({ data }: Props) => {

  return (
    <Card className="w-full">
      <div className="mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Projects Count
        </h5>
      </div>
      <div className="flow-root">
        <ResponsiveContainer width='100%' height={360}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="total" fill="#60A5FA" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default DashboardChart