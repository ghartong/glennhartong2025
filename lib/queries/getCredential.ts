import { db } from "@/db"
import { credentials } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getCredential(id: number) {
    const credential = await db.select()
        .from(credentials)
        .where(eq(credentials.id, id))

    return credential[0]
}