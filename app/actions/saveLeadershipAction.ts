'use server'

import { eq } from 'drizzle-orm'
import { flattenValidationErrors } from 'next-safe-action'
import { redirect } from 'next/navigation'

import { db } from '@/db'
import { leaderships } from '@/db/schema'
import { actionClient } from '@/lib/safe-action'
import { insertLeadershipSchema, insertLeadershipSchemaType } from '@/zod-schemas/leadership'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const saveLeadershipAction = actionClient
    .metadata({ actionName: 'saveLeadershipAction'})
    .schema(insertLeadershipSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({
        parsedInput: leadership
    }: { parsedInput: insertLeadershipSchemaType }) => {        
        const { isAuthenticated } = getKindeServerSession()

        const isAuth = await isAuthenticated()

        if (!isAuth) redirect('/login')

        // new Leadership
        if (leadership.id === 0) {
            const result = await db.insert(leaderships).values({
                organization: leadership.organization,
                title: leadership.title,
                ...(leadership.notes?.trim() ? { notes: leadership.notes } : {}),
                displayOrder: leadership.displayOrder,
            }).returning({ insertedId: leaderships.id})

            return { message: `Leadership ID #${result[0].insertedId} created successfully`}
        }

        // existing Leadership
        const result =  await db.update(leaderships)
            .set({
                organization: leadership.organization,
                title: leadership.title,
                notes: leadership.notes?.trim() ?? null,
                displayOrder: leadership.displayOrder,
            })
            .where(eq(leaderships.id, leadership.id!))
            .returning({ updatedId: leaderships.id})

            return { message: `Leadership ID #${result[0].updatedId} updated successfully`}
    })