import { Priority } from '@prisma/client'
import { SiTask } from "react-icons/si";
import React from 'react'

interface Props {
  priority: Priority
}

const priorityMap: Record<Priority, { label: string, level: 1 | 2 | 3 }
> = {
  HIGH: { label: "High", level: 3 },
  MEDIUM: { label: "Medium", level: 2 },
  LOW: { label: "Low", level: 1 },
}

const PriorityLevel = ({ priority }: Props) => {
  return (
    <div className='flex justify-start'>
      <SiTask className={`${priorityMap[priority].level >= 1 ? "text-lime-500" : "text-transparent"} text-base`} />
      <SiTask className={`${priorityMap[priority].level >= 2 ? "text-lime-500" : "text-transparent"} text-base`} />
      <SiTask className={`${priorityMap[priority].level >= 3 ? "text-lime-500" : "text-transparent"} text-base`} />
    </div>
  )
}

export default PriorityLevel