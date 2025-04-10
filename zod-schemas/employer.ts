import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { employers } from "@/db/schema"

export const insertEmployerSchema = createInsertSchema(employers, {
    name: (schema) => schema.min(1, "Employer name is required"),
    title: (schema) => schema.min(1, "Job Title is required"),
})

export const selectEmployerSchema = createSelectSchema(employers)

export type insertEmployerSchemaType = typeof insertEmployerSchema._type

export type selectEmployerSchemaType = typeof selectEmployerSchema._type 