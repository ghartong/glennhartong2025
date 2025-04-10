import TicketSearch from "./TicketSearch"
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults"
import { getOpenTickets } from "@/lib/queries/getOpenTickets"

export const metadata = {
    title: "Ticket Search", 
}

async function Tickets({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { searchText } = await searchParams

    if (!searchText) {
        const results = await getOpenTickets()
        return (
            <>
                <TicketSearch />
                <p>{results?.length} records found</p>
                <p>{JSON.stringify(results)}</p>
            </>
        )
    }

    const results = await getTicketSearchResults(searchText)

    return (
        <>
            <TicketSearch />
            <p>{results?.length} records found</p>
            <p>{JSON.stringify(results)}</p>
        </>
    )
}

export default Tickets;