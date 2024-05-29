"use client"

import { projectSchema } from '@/schemas/projects'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Select, Label, TextInput } from "flowbite-react";
import { useRouter } from 'next/navigation'
import { Category, Project } from '@prisma/client'
import axios from 'axios'
import SimpleMdeReact from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";

type ProjectFormData = z.infer<typeof projectSchema>

interface Props {
  project?: Project;
  categories: Category[]
}

const ProjectForm = ({ project, categories }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema)
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    try {
      setIsSubmitting(true)

      if (project) {
        await axios.patch("/api/projects/" + project.id, values)
      } else {
        await axios.post("/api/projects", values)
      }

      setIsSubmitting(false)

      router.push("/projects")
      router.refresh()

    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <Controller
          name="title"
          control={control}
          defaultValue={project?.title}
          render={({ field }) => (
            <TextInput
              id="title"
              type="text"
              placeholder="Project title..."
              {...field}
              required
              shadow
            />
          )}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="categoryId" value="Category" />
        </div>
        <Controller
          name="categoryId"
          control={control}
          defaultValue={project?.categoryId}
          render={({ field }) => (
            <Select id="categoryId" required {...field}>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Select>
          )}
        />
        {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Description" />
        </div>
        <Controller
          name="description"
          control={control}
          defaultValue={project?.description}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Project description..." {...field} />
          )}
        />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      <div className='flex justify-between space-x-4'>
        <div className="w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="status" value="Status" />
          </div>
          <Controller
            name="status"
            control={control}
            defaultValue={project?.status}
            render={({ field }) => (
              <Select id="status" required {...field}>
                <option value="OPEN">Open</option>
                <option value="STARTED">Started</option>
                <option value="CLOSED">Closed</option>
              </Select>
            )}
          />
          {errors.status && <p className="text-red-500">{errors.status.message}</p>}
        </div>
        <div className="w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="priority" value="Priority" />
          </div>
          <Controller
            name="priority"
            control={control}
            defaultValue={project?.priority}
            render={({ field }) => (
              <Select id="priority" required {...field}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </Select>
            )}
          />
          {errors.priority && <p className="text-red-500">{errors.priority.message}</p>}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  )
}

export default ProjectForm