import { getEmployers } from "@/lib/queries/getEmployers";
import ListCard from "@/app/(resume)/components/ListCard"

export const metadata = {
    title: "Experience",
}

function getDescription(name: string, location: string, startAt: string, endAt: string) {
    return (
        <>
            {name} | {location} |{' '}
            <em>
                {new Date(startAt).getFullYear()} - {endAt ? new Date(endAt!).getFullYear() : 'Present'}
            </em>
        </>
    )
}

async function Experience() {
    const results = await getEmployers()
    return (
        <>
            <h1 className="font-extrabold">Experience</h1>
            <section className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map(r => (
                    <ListCard
                        name={r.title}
                        description={getDescription(r.name, r.location!, r.startedAt!, r.endedAt!)}
                        key={r.id}
                    >
                        {r.duties && <p>{r.duties}</p>}
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

export default Experience;