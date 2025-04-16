import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { credentials } from "@/db/schema"

export const insertCredentialSchema = createInsertSchema(credentials, {
    name: (schema) => schema.min(1, "Credential name is required"),
    organization: (schema) => schema.min(1, "Organization is required"),
})

export const selectCredentialSchema = createSelectSchema(credentials)

export type insertCredentialSchemaType = typeof insertCredentialSchema._type

export type selectCredentialSchemaType = typeof selectCredentialSchema._type 