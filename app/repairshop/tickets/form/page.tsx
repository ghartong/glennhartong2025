import { getCustomer } from "@/lib/queries/getCustomer"
import { getTicket } from "@/lib/queries/getTicket"
import { BackButton } from "../../../../components/ui/BackButton"
import TicketForm from "./TicketForm";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js"

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { customerId, ticketId } = await searchParams

    if (!customerId && !ticketId) return {
        title: 'Missing Ticket ID or Customer ID'
    }

    if (customerId) return {
        title: `New Tiecket for Customer #${customerId}`
    }

    if (ticketId) return {
        title: `Edit Ticket #${ticketId}`
    }

    return { title: 'Edit Ticket' }
}

export default async function TicketFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { customerId, ticketId } = await searchParams

        if (!customerId && !ticketId) {
            return (
                <>
                    <h2>Ticket ID or Customer ID required to load ticket form</h2>
                    <BackButton title="Go Back" />
                </>
            )
        }

        const { getPermission, getUser } = getKindeServerSession()
        const [managerPermission, user] = await Promise.all([
            getPermission('manager'),
            getUser(),
        ])

        const isManager = managerPermission?.isGranted

        if (customerId) {
            const customer = await getCustomer(parseInt(customerId))

            if (!customer?.active) {
                return (
                    <>
                        <h2>Customer ID #{customerId} is not active.</h2>
                        <BackButton title="Go Back" />
                    </>
                )
            }

            if (isManager) {
                kindeInit() // initialize Kinde management API
                const { users } = await Users.getUsers()

                const techs = users ? users.map(user => ({ id: user.email!, description: user.email! })) : []

                return <TicketForm customer={customer} techs={techs} isManager={isManager} />
            } else {
                return <TicketForm customer={customer} />
            }
        }

        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId))

            if (!ticket) {
                return (
                    <>
                        <h2>Ticket ID #{ticketId} was not found.</h2>
                        <BackButton title="Go Back" />
                    </>
                )
            }

            const customer = await getCustomer(ticket.customerId)

            if (isManager) {
                kindeInit() // initialize Kinde management API
                const { users } = await Users.getUsers()

                const techs = users ?
                    users
                        .filter((user): user is { email: string } => typeof user.email === "string")
                        .map(user => ({ id: user.email?.toLocaleLowerCase(), description: user.email?.toLocaleLowerCase() }))
                    : []

                return <TicketForm customer={customer} ticket={ticket} techs={techs} isManager={isManager} />
            } else {
                const isEditable = user?.email?.toLowerCase() === ticket.tech.toLowerCase()

                return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />
            }

            return <TicketForm customer={customer} ticket={ticket} />
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}