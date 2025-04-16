import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HousePlus } from "lucide-react";

import { getLeaderships } from "@/lib/queries/getLeaderships";

async function Leaderships() {
    const results = await getLeaderships()
    return (
        <>
            <h1 className="font-extrabold mb-4">Leaderships</h1>
            <Button className="mb-4">
                <Link href="/reddog/leaderships/form"><HousePlus /></Link>
            </Button>
            <p className="mb-4">{results?.length} records found</p>
            <ul>
                {results.map(e => (
                    <li key={e.id}>
                        <Link
                            href={`/reddog/leaderships/form?leadershipId=${e.id}`}
                        >
                            {e.organization}{' - '}
                            {e.title}{' - '}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Leaderships;