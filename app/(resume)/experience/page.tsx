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
            <section className="w-full lg:w-1/2">
                Glenn Hartong is an experienced software engineer with a focus on front-end development in ReactJS. Most recently serving as a Senior Front End Engineer II at RVshare from August 2019 to April 2025, 
                Glenn has previously held roles as UI Developer III at Signet Jewelers and UI Developer II at Sterling Jewelers. A background in programming and website maintenance is further 
                supported by a Senior Engineer position at WRIS Web Services. Additionally, Glenn co-founded Glick Productions and contributed to education as an Adjunct Instructor at Stark State College of Technology, teaching web development classes.
            </section>
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