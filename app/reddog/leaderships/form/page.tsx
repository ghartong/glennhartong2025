import { getLeadership } from "@/lib/queries/getLeadership";
import { BackButton } from "../../../../components/ui/BackButton";
import LeadershipForm from "./LeadershipForm";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { leadershipId } = await searchParams

    if (!leadershipId) return { title: "New Leadership" }

    return { title: `Edit Leadership #${leadershipId}`}
}

export default async function LeadershipFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { leadershipId } = await searchParams

        // Edit customer form
        if (leadershipId) {
            const leadership = await getLeadership(parseInt(leadershipId))

            if (!leadership) {
                return (
                    <>
                        <h2>Leadership ID #{leadershipId} not found</h2>
                        <BackButton title="Go Back" />
                    </>
                )
            }
            return <LeadershipForm leadership={leadership} />
        } else {
            return <LeadershipForm />
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}