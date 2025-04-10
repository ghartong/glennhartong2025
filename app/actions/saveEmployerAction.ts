'use server'

import { eq } from 'drizzle-orm'
import { flattenValidationErrors } from 'next-safe-action'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { employers } from '@/db/schema'
import { actionClient } from '@/lib/safe-action'
import { insertEmployerSchema, insertEmployerSchemaType } from '@/zod-schemas/employer'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const saveEmployerAction = actionClient
    .metadata({ actionName: 'saveEmployerAction'})
    .schema(insertEmployerSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({
        parsedInput: employer
    }: { parsedInput: insertEmployerSchemaType }) => {        
        const { isAuthenticated } = getKindeServerSession()

        const isAuth = await isAuthenticated()

        if (!isAuth) redirect('/login')

        // new employer
        if (employer.id === 0) {
            const result = await db.insert(employers).values({
                name: employer.name,
                title: employer.title,
                ...(employer.location?.trim() ? { location: employer.location } : {}),
                isActive: employer.isActive,
                ...(employer.duties?.trim() ? { duties: employer.duties } : {}),
                ...(employer.notes?.trim() ? { notes: employer.notes } : {}),
                startedAt: employer.startedAt,
                endedAt: employer.endedAt,
            }).returning({ insertedId: employers.id})

            return { message: `Employer ID #${result[0].insertedId} created successfully`}
        }

        // existing employer
        const result =  await db.update(employers)
            .set({
                name: employer.name,
                title: employer.title,
                location: employer.location?.trim() ?? null,
                isActive: employer.isActive,
                duties: employer.duties?.trim() ?? null,
                notes: employer.notes?.trim() ?? null,
                startedAt: employer.startedAt,
                endedAt: employer.endedAt,
            })
            .where(eq(employers.id, employer.id!))
            .returning({ updatedId: employers.id})

            return { message: `Employer ID #${result[0].updatedId} updated successfully`}
    })