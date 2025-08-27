/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionButtonWithConfirm } from "@/components/ui/ConfirmButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCardSkeleton } from "@/components/ui/StatCardSkeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableRowSkeleton } from "@/components/ui/TableRowSkeleton";
import { UserDetailsModal } from "@/components/ui/UserDetailsModal";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { openModal } from "@/redux/features/modalSlice";
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from "@/redux/features/userApi";
import { useAppDispatch } from "@/redux/hook";
import { TUser } from "@/types";
import { Status } from "@/types/user.types";
import { motion } from "framer-motion";
import { CheckCircle, CircleXIcon, Eye, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString() + " " + new Date(iso).toLocaleTimeString() : "-";

const UsersPage = () => {
    const dispatch = useAppDispatch();

    // Filter
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<Status.ACTIVE | Status.BLOCKED | "">("");
    const [minTransactionVolume, setMinTransactionVolume] = useState<number | "">("");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const paginationItemsToDisplay = 4;

    //API Calls
    const { data, isLoading, isError, error, refetch } = useGetAllUsersQuery({ limit, page: currentPage, search: search, status: statusFilter, minTransactionVolume });
    const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
    const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();

    const totalPages = data?.meta?.totalPages || 1;
    const apiUsers = data?.data?.users;
    const statistics = data?.data?.statistics;

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });

    // console.log(apiUsers);

    const handleUnblock = async (userId: string | undefined) => {
        const toastId = toast.loading("Unblocking User...")
        try {
            await unblockUser(userId).unwrap();
            toast.success(`User unblock successfully`, { id: toastId });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to unblock", { id: toastId });
        }
    }

    const handleBlock = async (userId: string | undefined) => {
        const toastId = toast.loading("Blocking User...")
        try {
            await blockUser(userId).unwrap();
            toast.success(`User blocked successfully`, { id: toastId });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to block", { id: toastId });
        }
    }

    const handleRetry = () => {
        refetch();
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("");
        setCurrentPage(1);
        setMinTransactionVolume("")
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-2 md:p-4">
            {/* Header + Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2 bg-card/40">
                    <CardHeader>
                        <CardTitle>Manage Users</CardTitle>
                        <CardDescription>Block, Unblock, and review users — track volumes and performance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {isLoading ? (
                                <>
                                    <StatCardSkeleton />
                                    <StatCardSkeleton />
                                    <StatCardSkeleton />
                                </>
                            ) : (
                                <>
                                    <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-4">
                                        <div className="text-xs text-muted-foreground">Total Users</div>
                                        <div className="mt-1 text-2xl font-semibold text-blue-900 dark:text-white">{statistics?.totalUsers || 0}</div>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
                                        <div className="text-xs text-muted-foreground">Active</div>
                                        <div className="mt-1 text-2xl font-semibold text-green-700">{statistics?.totalActiveUsers || 0}</div>
                                    </div>
                                    <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4">
                                        <div className="text-xs text-muted-foreground">Blocked</div>
                                        <div className="mt-1 text-2xl font-semibold text-red-600">{statistics?.totalBlockedUsers || 0}</div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {isLoading ? (
                                <>
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-28" />
                                </>
                            ) : (
                                <>
                                    <div className="text-sm text-muted-foreground">Transactions: <span className="font-medium text-muted-foreground">{statistics?.totalTransactions || 0}</span></div>
                                    <div className="text-sm text-muted-foreground">Volume: <span className="font-medium">{`৳ ${statistics?.totalVolume || 0}`}</span></div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Filters Card */}
                <Card className="w-full bg-card/40">
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                        <CardDescription>Search and narrow results</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="relative">
                                <Input
                                    className={cn("peer w-full ps-9")}
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                                    placeholder="Search by name, email or phone number..."
                                    disabled={isLoading}
                                />
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                </div>
                                {search && (
                                    <button
                                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                                        aria-label="Clear filter"
                                        onClick={() => setSearch("")}
                                        disabled={isLoading}
                                    >
                                        <CircleXIcon size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
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
                                            <SelectItem value="ACTIVE">Active</SelectItem>
                                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Input
                                    type="number"
                                    placeholder="Min transaction volume BDT"
                                    value={minTransactionVolume}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setMinTransactionVolume(v === "" ? "" : Number(v));
                                        setCurrentPage(1);
                                    }}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={resetFilters}
                                    disabled={isLoading}
                                >
                                    Reset
                                </Button>
                                <div className="ml-auto text-sm text-muted-foreground">
                                    {isLoading ? (
                                        <Skeleton className="h-4 w-24" />
                                    ) : (
                                        `Showing ${apiUsers?.length || 0} results`
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <Card className="overflow-hidden bg-card/40">
                <CardHeader>
                    <CardTitle>Users List</CardTitle>
                    <CardDescription>Block or Unblock users. Click an user to view details.</CardDescription>
                </CardHeader>

                <CardContent>
                    {!isLoading && !isError && apiUsers && apiUsers.length === 0 ? (
                        <EmptyState />
                    ) : (
                        // Table Here
                        <Table className="rounded-md border">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Users</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Transactions</TableHead>
                                    <TableHead>Volume</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    // Show skeleton rows while loading
                                    Array.from({ length: limit }).map((_, index) => (
                                        <TableRowSkeleton columns={6} key={index} />
                                    ))
                                ) : (
                                    apiUsers?.map((user: TUser) => (
                                        <TableRow key={user._id} className="hover:bg-muted/5">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback>{user.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-xs text-muted-foreground">{user.phoneNumber}</div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <Badge variant={user.status === Status.ACTIVE ? "secondary" : "destructive"}>
                                                    {user.status.toUpperCase()}
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">{formatDate(user.createdAt)}</div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">
                                                    {user.transactionsCount}
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">
                                                    {`৳ ${user.transactionVolume}`}
                                                </div>
                                            </TableCell>


                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {(user.status === Status.BLOCKED) && (
                                                        <ActionButtonWithConfirm
                                                            icon={<CheckCircle className="h-4 w-4 text-white" />}
                                                            title="Unblock"
                                                            dialogTitle="Are you absolutely sure?"
                                                            dialogDescription={`Are you sure you want to unblock ${user?.name}? They will become an active user and gain access to the user dashboard all activities.`}
                                                            onConfirm={() => handleUnblock(user._id)}
                                                            disabled={isBlocking || isUnblocking}
                                                        />
                                                    )}
                                                    {user.status === Status.ACTIVE && (
                                                        <ActionButtonWithConfirm
                                                            icon={<XCircle className="h-4 w-4 text-white" />}
                                                            title="Block"
                                                            variant="destructive"
                                                            dialogTitle="Are you absolutely sure?"
                                                            dialogDescription={`Are you sure you want to block ${user?.name}? They will become a block user and cannot perform some actions.`}
                                                            onConfirm={() => handleBlock(user._id)}
                                                            disabled={isBlocking || isUnblocking}
                                                        />
                                                    )}

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => dispatch(openModal({ type: "user", data: user }))}
                                                        title="View"
                                                        disabled={isBlocking || isUnblocking}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Pagination */}
            {!isLoading && !isError && apiUsers && apiUsers.length > 0 && (
                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        {/* Results per page */}
                        <div className="flex items-center gap-3 bg-card/5">
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

            <UserDetailsModal />
        </motion.div>
    );
};

export default UsersPage;