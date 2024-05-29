"use client"

import { userSchema } from '@/schemas/users'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, Select, Label, TextInput } from "flowbite-react";
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
import axios from 'axios'

type UserFormData = z.infer<typeof userSchema>

interface Props {
  user?: User
}

const UserForm = ({ user }: Props) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      setIsSubmitting(true)
      if (user) {
        await axios.patch("/api/users/" + user.id, values)
      } else {
        await axios.post("/api/users", values)
      }

      setIsSubmitting(false)
      reset();
      router.push("/users")
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
          <Label htmlFor="name" value="Name" />
        </div>
        <Controller
          name="name"
          control={control}
          defaultValue={user?.name}
          render={({ field }) => (
            <TextInput
              id="name"
              type="text"
              placeholder="User name..."
              {...field}
              required
              shadow
            />
          )}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <Controller
          name="email"
          control={control}
          defaultValue={user?.email}
          render={({ field }) => (
            <TextInput
              id="email"
              type="text"
              placeholder="User email..."
              {...field}
              required
              shadow
            />
          )}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              id="password"
              type="password"
              required={user ? false : true}
              placeholder="User password..."
              {...field}
              shadow
            />
          )}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="role" value="Role" />
        </div>
        <Controller
          name="role"
          control={control}
          defaultValue={user?.role}
          render={({ field }) => (
            <Select id="role" required {...field}>
              <option value="USER">User</option>
              <option value="ADMINISTRATOR">Administrtor</option>
            </Select>
          )}
        />
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {user ? "Update user" : "Create user"}
      </Button>
    </form>
  )
}

export default UserForm