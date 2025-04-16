import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { leaderships } from "@/db/schema"

export const insertLeadershipSchema = createInsertSchema(leaderships, {
    organization: (schema) => schema.min(1, "Organization is required"),
    title: (schema) => schema.min(1, "Title is required"),
})

export const selectLeadershipSchema = createSelectSchema(leaderships)

export type insertLeadershipSchemaType = typeof insertLeadershipSchema._type

export type selectLeadershipSchemaType = typeof selectLeadershipSchema._type 