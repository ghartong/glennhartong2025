import { db } from "@/db"
import { desc } from "drizzle-orm"
import { employers } from "@/db/schema"

export async function getEmployers() {
    const results = await db.select()
        .from(employers)
        .orderBy(employers.displayOrder)

    return results
}