"use client"

import type { TicketSearchResultsType } from "@/lib/queries/getTicketSearchResults"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { usePolling } from "@/hooks/usePolling"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
}
    from "@/components/ui/table"
import {
    CircleCheckIcon,
    CircleXIcon,
    ArrowUpDown,
    ArrowDown,
    ArrowUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
    data: TicketSearchResultsType,
}

type RowType = TicketSearchResultsType[0] //convience type

export default function TicketTable({ data }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "ticketDate",
            desc: false, // false for ascending
        },
    ])

    usePolling(searchParams.get("searchText"), 5000)

    const pageIndex = useMemo(() => {
        const page = searchParams.get("page")
        return page ? parseInt(page) - 1 : 0
    }, [searchParams.get("page")])

    const columnHeadersArray: Array<keyof RowType> = [
        "ticketDate",
        "title",
        "tech",
        "firstName",
        "lastName",
        "email",
        "completed",
    ]

    const columnHelper = createColumnHelper<RowType>()

    const columns = columnHeadersArray.map((columnName) => {
        return columnHelper.accessor((row) => { // this is where you transform data
            const value = row[columnName] // convience
            if (columnName === "ticketDate" && value instanceof Date) {
                return value.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
            }
            if (columnName === "completed") {
                return value ? "COMPLETED" : "OPEN"
            }
            return value
        }, {
            id: columnName,
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="pl-1 w-full flex justify-between"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {columnName[0].toUpperCase() + columnName.slice(1)}

                        {column.getIsSorted() === "asc" && (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        )}
                        {column.getIsSorted() === "desc" && (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        )}
                        {column.getIsSorted() !== "asc" && column.getIsSorted() !== "desc" && (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                )
            },
            cell: ({ getValue }) => {  // presentational
                const value = getValue()
                if (columnName === "completed") {
                    return (
                        <div className="grid place-content-center">
                            {value === "OPEN" ? <CircleXIcon className="opacity-25" /> : <CircleCheckIcon className="text-green-600" />}
                        </div>
                    )
                }
                return value
            }
        })
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination: {
                pageIndex,
                pageSize: 10,
            },
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="mt-6 flex flex-col gap-4">
            <div className="rounded-lg overflow-hidden border border-border">
                <Table className="border">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id} className="bg-secondary">
                                        <div>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow
                                key={row.id}
                                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                                onClick={() => router.push(`/repairshop/tickets/form?ticketId=${row.original.id}`)}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} className="border">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between items-center gap-1 flex-wrap">
                <div>
                    <p className="whitespace-nowrap font-bold">
                        {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
                        &nbsp;&nbsp;
                        {`[${table.getFilteredRowModel().rows.length} ${table.getFilteredRowModel().rows.length !== 1 ? "total results" : "result"}]`}
                    </p>
                </div>
                <div className="flex flex-row gap-1">
                    <div className="flex flex-row gap-1">
                        <Button
                            variant="ghost"
                            onClick={() => router.refresh()}
                        >
                            Refresh Data
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => table.resetSorting()}
                        >
                            Reset Sorting
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        <Button
                            variant="outline"
                            onClick={() => {
                                const newIndex = table.getState().pagination.pageIndex - 1
                                table.setPageIndex(newIndex)
                                const params = new URLSearchParams(searchParams.toString())
                                params.set("page", (newIndex + 1).toString())
                                router.replace(`?${params.toString()}`, { scroll: false })
                            }}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                const newIndex = table.getState().pagination.pageIndex + 1
                                table.setPageIndex(newIndex)
                                const params = new URLSearchParams(searchParams.toString())
                                params.set("page", (newIndex + 1).toString())
                                router.replace(`?${params.toString()}`, { scroll: false })
                            }}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}