import { db } from "@/db"
import { credentials } from "@/db/schema"

export async function getCredentials() {
    const results = await db.select()
        .from(credentials)
        .orderBy(credentials.displayOrder)

    return results
}