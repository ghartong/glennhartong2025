import { getCredentials } from "@/lib/queries/getCredentials"
import ListCard from "@/app/(resume)/components/ListCard"

export const metadata = {
    title: "Credentials",
}

async function Credentials() {
    const results = await getCredentials()
    return (
        <>
            <h1 className="font-extrabold">Credentials</h1>
            <section className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map(r => (
                    <ListCard 
                        name={r.name} 
                        description={<>{r.organization}</>}
                        key={r.id}
                    >
                        <p>{r.notes}</p>
                        <p>
                            {r.organization === 'Stark State College of Technology' ?
                                <span>Graduated 2003</span>
                            :
                                new Date(r.acquiredAt!).getFullYear()
                            }
                        </p>
                    </ListCard>
                ))}
            </section>
        </>
    );
}

export default Credentials;