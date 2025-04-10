import { db } from "@/db"
import { employers } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getEmployer(id: number) {
    const employer = await db.select()
        .from(employers)
        .where(eq(employers.id, id))

    return employer[0]
}