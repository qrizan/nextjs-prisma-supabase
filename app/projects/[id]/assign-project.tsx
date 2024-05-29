"use client"

import { Project, User } from '@prisma/client';
import axios from 'axios';
import { Label, Select } from 'flowbite-react'
import React, { useState } from 'react'

const AssignProject = ({ project, users }: { project: Project; users: User[] }) => {

  const [isAssigning, setAssigning] = useState(false)
  const [error, setError] = useState("")

  const assignProject = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    setError("")
    setAssigning(true)

    await axios.patch(`/api/projects/${project.id}`, {
      assignedToUserId: userId === "0" ? null : userId
    }).catch(() => {
      setError("Unable to assign Project")
    })

    setAssigning(false)

  }

  return (
    <div className="w-full">
      <Select
        id="assignedToUserId"
        onChange={assignProject}
        disabled={isAssigning}
        defaultValue={project.assignedToUserId?.toString() || "0"}
      >
        <option value='0'>Unassign</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id.toString() || "0"}>{user.name}</option>
        ))}

      </Select>
    </div>
  )
}

export default AssignProject