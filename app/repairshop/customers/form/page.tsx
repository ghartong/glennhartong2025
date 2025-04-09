import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "../../../../components/ui/BackButton";

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
            console.log(customer)
            // put costumer form component
        } else {
            // put new costumer form
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}