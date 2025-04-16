import { getLeaderships } from "@/lib/queries/getLeaderships";
import ListCard from "@/app/(resume)/components/ListCard"

export const metadata = {
    title: "Leadership",
}

async function Leadership() {
    const results = await getLeaderships()
    return (
        <>
            <h1 className="font-extrabold">Leadership</h1>
            <section className="w-full lg:w-1/2">
                <p>While my professional life revolves around building scalable, high-performance software, I've also spent many years building something equally important: community.</p>
                <p>I'm an active member and past leader in several Masonic organizations across Ohio. These roles have helped shape my leadership style — grounded in service, tradition, mentorship, and integrity. From organizing events to guiding members through degrees and ceremonies, I've gained valuable experience in team coordination, long-term planning, and community engagement.</p>
                <p>These experiences go far beyond titles — they reflect a commitment to stewardship, trust, and showing up when it matters.</p>
            </section>
            <section className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map(r => (
                    <ListCard
                        name={r.organization}
                        description={<>{r.title}</>}
                        key={r.id}
                    >
                        {r.notes &&
                            <ul className="mt-2">
                                {r.notes.split("|").map((note, i) => (
                                    <li key={i}>{note}</li>
                                ))}
                            </ul>
                        }
                    </ListCard>
                ))}
            </section>
        </>
    );
}

export default Leadership;