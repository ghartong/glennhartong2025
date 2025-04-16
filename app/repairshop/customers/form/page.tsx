import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "../../../../components/ui/BackButton";
import CustomerForm from "./CustomerForm"

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { customerId } = await searchParams

    if (!customerId) return { title: "New Customer" }

    return { title: `Edit Customer #${customerId}`}
}

export default async function CustomerFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { getPermission } = getKindeServerSession()
        const managerPermission = await getPermission("manager")
        const isManager = managerPermission?.isGranted
        
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
            return <CustomerForm isManager={isManager} customer={customer} />
        } else {
            return <CustomerForm isManager={isManager} />
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}