"use client"

import React from 'react'
import { Label, Select } from "flowbite-react";
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value?: string }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Started", value: "STARTED" },
  { label: "Closed", value: "CLOSED" },
]


const StatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onChange = (status: string) => {
    const params = new URLSearchParams()
    if (status) params.append("status", status)
    const query = params.size ? `?${params.toString()}` : "0"
    router.push(`/projects${query}`)

  }

  return (
    <div className="max-w-md">
      <Select id="status" className='w-[150px]'
        defaultValue={searchParams.get("status") || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {statuses.map((status) => (
          <option key={status.value || "0"}
            value={status.value || "0"}>{status.label}</option>
        ))}
      </Select>
    </div>
  )
}

export default StatusFilter