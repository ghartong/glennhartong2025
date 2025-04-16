import { db } from "@/db"
import { leaderships } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getLeadership(id: number) {
    const leadership = await db.select()
        .from(leaderships)
        .where(eq(leaderships.id, id))

    return leadership[0]
}