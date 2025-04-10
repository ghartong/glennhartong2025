import { getEmployer } from "@/lib/queries/getEmployer";
import { BackButton } from "../../../../components/ui/BackButton";
import EmployerForm from "./EmployerForm";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { employerId } = await searchParams

    if (!employerId) return { title: "New Employer" }

    return { title: `Edit Employer #${employerId}`}
}

export default async function EmployerFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { employerId } = await searchParams

        // Edit customer form
        if (employerId) {
            const employer = await getEmployer(parseInt(employerId))

            if (!employer) {
                return (
                    <>
                        <h2>Employer ID #{employerId} not found</h2>
                        <BackButton title="Go Back" />
                    </>
                )
            }
            return <EmployerForm employer={employer} />
        } else {
            return <EmployerForm />
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}