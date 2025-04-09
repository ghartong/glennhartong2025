import { getCustomer } from "@/lib/queries/getCustomer"
import { getTicket } from "@/lib/queries/getTicket"
import { BackButton } from "../../../../components/ui/BackButton"

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

            console.log('customer', customer)

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

            console.log('ticket', ticket);
            console.log('customer', customer)

        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}