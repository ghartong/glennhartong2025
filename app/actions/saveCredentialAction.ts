'use server'

import { eq } from 'drizzle-orm'
import { flattenValidationErrors } from 'next-safe-action'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { credentials } from '@/db/schema'
import { actionClient } from '@/lib/safe-action'
import { insertCredentialSchema, insertCredentialSchemaType } from '@/zod-schemas/credential'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const saveCredentialAction = actionClient
    .metadata({ actionName: 'saveCredentialAction'})
    .schema(insertCredentialSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({
        parsedInput: credential
    }: { parsedInput: insertCredentialSchemaType }) => {        
        const { isAuthenticated } = getKindeServerSession()

        const isAuth = await isAuthenticated()

        if (!isAuth) redirect('/login')

        // new Credential
        if (credential.id === 0) {
            const result = await db.insert(credentials).values({
                name: credential.name,
                organization: credential.organization,
                ...(credential.notes?.trim() ? { notes: credential.notes } : {}),
                acquiredAt: credential.acquiredAt,
            }).returning({ insertedId: credentials.id})

            return { message: `Credential ID #${result[0].insertedId} created successfully`}
        }

        // existing Credential
        const result =  await db.update(credentials)
            .set({
                name: credential.name,
                organization: credential.organization,
                notes: credential.notes?.trim() ?? null,
                acquiredAt: credential.acquiredAt,
            })
            .where(eq(credentials.id, credential.id!))
            .returning({ updatedId: credentials.id})

            return { message: `Credential ID #${result[0].updatedId} updated successfully`}
    })