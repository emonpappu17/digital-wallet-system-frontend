/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableRowSkeleton } from "@/components/ui/TableRowSkeleton";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { useGetAllUsersStatsQuery } from "@/redux/features/userApi";
import { handleFormateDate } from "@/utils/handleFormateDate";
import { motion } from "framer-motion";
import { ChevronDownIcon, CircleXIcon, Search } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ITransaction } from "./AdminDashboardPage";
import Component, { Charts } from "@/components/modules/admin/Charts";
// import { Charts } from "@/components/modules/admin/Charts";
// import Charts from "@/components/modules/admin/Charts";
// // import { Charts } from "@/components/modules/admin/Charts";
// // import Charts from "@/components/modules/admin/Charts";

type TType = "CASH_IN" | "CASH_OUT" | "ADD_MONEY" | "SEND_MONEY"

const AdminTransactionPage = () => {
    const [search, setSearch] = useState("");
    const [txType, setTxType] = useState<TType | "">("");
    const [open, setOpen] = useState(false)

    // Date range filter
    const [date, setDate] = useState<DateRange | undefined>(undefined)
    const dateFrom = date?.from?.toISOString();
    const dateTo = date?.to?.toISOString();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const paginationItemsToDisplay = 4;

    // API Calls
    const { data, isLoading, isError, error, refetch } = useGetAllUsersStatsQuery({ limit, page: currentPage, search, type: txType, dateFrom, dateTo });

    // Data
    const totalPages = data?.meta?.totalPages || 1;
    const transactions = data?.data?.transactions?.list || [];
    const chartData = data?.data?.charts || []

    //Pagination
    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });

    const handleRetry = () => {
        refetch();
    };

    // Show error state
    if (isError && !isLoading) {
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-2 md:p-4">
                <ErrorState error={error} onRetry={handleRetry} />
                {/* <UserDetailsModal /> */}
            </motion.div>
        );
    }
    return (
        <div>
            <Charts chartData={chartData}></Charts>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3 gap-3">
                {/*  Search */}
                <div className="w-full md:w-auto">
                    <div className="relative">
                        <Input
                            className={cn("peer w-full md:min-w-60 ps-9")}
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search name, phone amount..."
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                            <Search size={16} aria-hidden="true" />
                        </div>
                        {search && (
                            <button
                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                                aria-label="Clear filter"
                                onClick={() => {
                                    setSearch("");
                                }}
                            >
                                <CircleXIcon size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/*  Date + TxType + Reset */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
                    {/* Date Picker */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full sm:w-48 justify-between font-normal bg-card/40 text-foreground/70"
                                >
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {date.from.toLocaleDateString()} - {date.to.toLocaleDateString()}
                                            </>
                                        ) : (
                                            date.from.toLocaleDateString()
                                        )
                                    ) : (
                                        "Select date range"
                                    )}
                                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0 z-0" align="start">
                                <Calendar
                                    mode="range"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border p-2"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Tx Type Select */}
                    <Select
                        value={txType}
                        onValueChange={(v) => {
                            setTxType(v as any);
                            setCurrentPage(1);
                        }}
                        disabled={isLoading}
                    >
                        <SelectTrigger className="w-full sm:w-40 select-none bg-card/40">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="CASH_IN">Cash in</SelectItem>
                                <SelectItem value="CASH_OUT">Cash out</SelectItem>
                                <SelectItem value="SEND_MONEY">Send money</SelectItem>
                                <SelectItem value="ADD_MONEY">Add money</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/*  Reset Button */}
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => {
                            setSearch("");
                            setDate(undefined);
                            setTxType("");
                            setCurrentPage(1);
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {/* Transactions Table */}
            <Card className="overflow-hidden bg-card/40">
                <CardHeader>
                    <CardTitle>Transactions List</CardTitle>
                    <CardDescription>
                        View transaction details. Click a row to view more if implemented.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {!isLoading && !isError && transactions && transactions.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <Table className="rounded-md border">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Fee</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Commission</TableHead>
                                    <TableHead>Receiver</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    // Show skeleton rows while loading
                                    Array.from({ length: limit }).map((_, index) => (
                                        <TableRowSkeleton key={index} />
                                    ))
                                ) : (
                                    transactions.map((transaction: ITransaction) => {
                                        const initials = transaction.fromName
                                            ? transaction.fromName
                                                .split(" ")
                                                .map((n) => n[0])
                                                .slice(0, 2)
                                                .join("")
                                            : "B"; // fallback initial for "Bank"

                                        return (
                                            <TableRow
                                                key={transaction._id}
                                                className="hover:bg-muted/50 transition-colors"
                                            >
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        {/* Initials Avatar */}
                                                        <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-white font-semibold">
                                                            {initials.toUpperCase()}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="font-medium">{transaction.fromName || "Bank"}</div>
                                                            <div className="text-xs text-muted-foreground">{transaction.fromPhone || "N/A"}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm">{transaction.fromRole || "Unknown"}</div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm capitalize">{transaction.type}</div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm">৳ {(transaction.fee as number).toFixed(2)}</div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm">৳ {(transaction.amount as number).toFixed(2)}</div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm">৳ {(transaction.agentCommission as number).toFixed(2)}</div>
                                                </TableCell>
                                                <TableCell>
                                                    {/* <div className="text-sm">{transaction.toName || "N/A"}</div> */}
                                                    <div className="flex flex-col">
                                                        <div className="font-medium">{transaction.fromName || "Bank"}</div>
                                                        <div className="text-xs text-muted-foreground">{transaction.fromPhone || "N/A"}</div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm">{handleFormateDate(transaction.createdAt)}</div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {!isLoading && !isError && transactions && transactions.length > 0 && (
                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        {/* Results per page */}
                        <div className="flex items-center gap-3">
                            <Select
                                defaultValue={String(limit)}
                                onValueChange={(value) => {
                                    setLimit(Number(value));
                                    setCurrentPage(1);
                                }}
                                aria-label="Results per page"
                                disabled={isLoading}
                            >
                                <SelectTrigger
                                    id="results-per-page"
                                    className="w-fit whitespace-nowrap"
                                >
                                    <SelectValue placeholder="Select number of results" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[5, 10, 15, 20].map((pageSize) => (
                                        <SelectItem key={pageSize} value={pageSize.toString()}>
                                            {pageSize} / page
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Pagination>
                                <PaginationContent>
                                    {/* Previous page button */}
                                    <PaginationItem>
                                        <PaginationPrevious
                                            className="aria-disabled:pointer-events-none cursor-pointer aria-disabled:opacity-50 select-none"
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            aria-disabled={currentPage === 1 ? true : undefined}
                                            role={currentPage === 1 ? "link" : undefined}
                                        />
                                    </PaginationItem>

                                    {/* Left ellipsis (...) */}
                                    {showLeftEllipsis && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    {/* Page number links */}
                                    {pages.map((page) => (
                                        <PaginationItem
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className="cursor-pointer select-none"
                                        >
                                            <PaginationLink
                                                isActive={currentPage === page}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    {/* Right ellipsis (...) */}
                                    {showRightEllipsis && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    {/* Next page button */}
                                    <PaginationItem>
                                        <PaginationNext
                                            className="aria-disabled:pointer-events-none aria-disabled:opacity-50 cursor-pointer select-none"
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            aria-disabled={currentPage === totalPages ? true : undefined}
                                            role={currentPage === totalPages ? "link" : undefined}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            )}


            {/* <Charts></Charts>
             */}
            {/* <Component chartData={chartData}></Component> */}
            {/* <Charts></Charts> */}
        </div>

    );
};

export default AdminTransactionPage;