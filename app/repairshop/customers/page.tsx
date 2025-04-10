import CustomerSearch from "./CustomerSearch"
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults"

export const metadata = {
    title: "Customer Search", 
}

async function Customers({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { searchText } = await searchParams

    if (!searchText) return <CustomerSearch />

    const results = await getCustomerSearchResults(searchText)

    return (
        <>
            <CustomerSearch />
            <p>{results?.length} records found</p>
            <p>{JSON.stringify(results)}</p>
        </>
    )
}

export default Customers;