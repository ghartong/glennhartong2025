import { db } from "@/db"
import { employers } from "@/db/schema"

export async function getEmployers() {
    const results = await db.select()
        .from(employers)
        .orderBy(employers.displayOrder)

    return results
}