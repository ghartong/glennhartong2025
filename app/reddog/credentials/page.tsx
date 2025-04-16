import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";

import { getCredentials } from "@/lib/queries/getCredentials";

async function Credentials() {
    const results = await getCredentials()
    return (
        <>
            <h1 className="font-extrabold mb-4">Credentials</h1>
            <Button className="mb-4">
                <Link href="/reddog/credentials/form"><BookPlus /></Link>
            </Button>
            <p className="mb-4">{results?.length} records found</p>
            <ul>
                {results.map(e => (
                    <li key={e.id}>
                        <Link
                            href={`/reddog/credentials/form?credentialId=${e.id}`}
                        >
                            {e.organization}{' - '}
                            {e.name}{' - '}
                            {e.acquiredAt}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Credentials;