import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "../../../../components/ui/BackButton";
import CustomerForm from "./CustomerForm"

export default async function CustomerFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { customerId } = await searchParams

        // Edit customer form
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId))

            if (!customer) {
                return (
                    <>
                        <h2>Customer ID #{customerId} not found</h2>
                        <BackButton title="Go Back" />
                    </>
                )
            }
            return <CustomerForm customer={customer} />
        } else {
            return <CustomerForm />
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}