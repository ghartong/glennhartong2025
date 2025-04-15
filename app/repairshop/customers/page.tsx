import CustomerSearch from "./CustomerSearch"
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults"
import CustomerTable from "./CustomerTable"

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
            {results.length ? (
                <>
                    <p>{results.length} records found</p>
                    <CustomerTable data={results} /> 
                </>
            ) : (
                <p className="mt-4">No results found</p>
            )}
        </>
    )
}

export default Customers;