import React from 'react'
import { Badge } from "flowbite-react";
import { Status } from '@prisma/client';

interface Props {
  status: Status
}

const statusMap: Record<
  Status, { label: string; color: "warning" | "info" | "dark" }
> = {
  OPEN: { label: "Open", color: "info" },
  STARTED: { label: "Started", color: "warning" },
  CLOSED: { label: "Close", color: "dark" },
}

const StatusBadge = ({ status }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge color={`${statusMap[status].color}`}>
        {statusMap[status].label}
      </Badge>
    </div>
  )
}

export default StatusBadge