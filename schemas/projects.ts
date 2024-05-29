import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  status: z.string().min(1, "Status").max(10).optional(),
  priority: z.string().min(1, "Priority").max(10).optional(),
  categoryId: z.preprocess((val) => Number(val), z.number().int().positive())
})


export const projectPatchSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1, "Description is required").max(65535).optional(),
  status: z.string().min(1, "Status").max(10).optional(),
  priority: z.string().min(1, "Priority").max(10).optional(),
  categoryId: z.preprocess((val) => Number(val), z.number().int().positive()).optional()
})
