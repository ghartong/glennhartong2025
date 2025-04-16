import { db } from "@/db"
import { leaderships } from "@/db/schema"

export async function getLeaderships() {
    const results = await db.select()
        .from(leaderships)
        .orderBy(leaderships.displayOrder)

    return results
}