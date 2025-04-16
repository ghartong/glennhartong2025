import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";

import { dateDiffInYears } from "@/lib/utils";
import { getEmployers } from "@/lib/queries/getEmployers";

async function Employers() {
    const results = await getEmployers()
    return (
        <>
            <h1 className="font-extrabold mb-4">Employers</h1>
            <Button className="mb-4">
                <Link href="/reddog/employers/form"><UserRoundPlus /></Link>
            </Button>
            <p className="mb-4">{results?.length} records found</p>
            <ul>
                {results.map(e => (
                    <li key={e.id}>
                        <Link
                            href={`/reddog/employers/form?employerId=${e.id}`}
                        >
                            {e.name}{' - '}
                            {e.title}{' - '}
                            {dateDiffInYears(new Date(e.startedAt!), e?.endedAt ? new Date(e.endedAt!) : new Date())} years
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Employers;