import { getEmployers } from "@/lib/queries/getEmployers";

export const metadata = {
    title: "Experience",
}

async function Experience() {
    const results = await getEmployers()
    return (
        <section>
            <h1>Experience</h1>
            <p>{results?.length} records found</p>
            <p>{JSON.stringify(results)}</p>
        </section>
    );
}

export default Experience;