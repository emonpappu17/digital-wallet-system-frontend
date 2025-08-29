/* eslint-disable @typescript-eslint/no-explicit-any */
import TransactionTable from '@/components/modules/common/TransactionTable';
import { useGetAgentStatsQuery } from '@/redux/features/userApi';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CircleXIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const AgentTransactionPage = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const paginationItemsToDisplay = 4;
    // API Calls
    const { data, isLoading, isError } = useGetAgentStatsQuery({ limit, page: currentPage, search: search, type: statusFilter });
    const transactions = data?.data?.transaction || [];

    const totalPages = data?.meta?.totalPages || 1;

    //Pagination
    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });


    return (
        <div>
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

                {/*  Type + Reset */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <Select
                            value={statusFilter}
                            onValueChange={(v) => {
                                setStatusFilter(v as any);
                                setCurrentPage(1);
                            }}
                            disabled={isLoading}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="CASH_IN">Cash in</SelectItem>
                                    <SelectItem value="CASH_OUT">Cash out</SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => {
                            setSearch("");
                            setStatusFilter("");
                            setCurrentPage(1);
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {/* Table */}
            <TransactionTable
                transactions={transactions}
                isLoading={isLoading}
                isError={isError} />

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
        </div>
    );
};

export default AgentTransactionPage;