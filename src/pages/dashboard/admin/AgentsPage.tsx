/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { useApproveAgentMutation, useGetAllAgentsQuery, useSuspendAgentMutation } from "@/redux/features/userApi";
import { useAppDispatch } from "@/redux/hook";
import { TUser } from "@/types";
import { Status } from "@/types/user.types";
import { handleFormateDate } from "@/utils/handleFormateDate";
import { motion } from "framer-motion";
import {
    CheckCircle,
    CircleXIcon,
    Eye,
    Search,
    XCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AgentStatus = "PENDING" | "ACTIVE" | "SUSPEND";

export default function AgentsPage() {
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<AgentStatus | "">("");
    const [minCommission, setMinCommission] = useState<number | "">("");

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const paginationItemsToDisplay = 4;

    // API Calls
    const { data, isLoading, isError, error, refetch } = useGetAllAgentsQuery(
        { limit, page: currentPage, search: search, status: statusFilter, minCommission },
        {
            // Add some RTK Query options for better UX
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        }
    );

    const [approveAgent, { isLoading: isApproving }] = useApproveAgentMutation();
    const [suspendAgent, { isLoading: isSuspending }] = useSuspendAgentMutation();

    const totalPages = data?.meta?.totalPages || 1;
    const apiAgents = data?.data?.agents;
    const statistics = data?.data?.statistics;

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });

    // console.log('apiAgents==>', apiAgents);

    const handleApprove = async (agentId: string | undefined) => {
        const toastId = toast.loading("Approving Agent...")
        try {
            await approveAgent(agentId).unwrap();
            toast.success(`Agent approved successfully`, { id: toastId });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to approve", { id: toastId });
        }
    };

    const handleSuspend = async (agentId: string | undefined) => {
        const toastId = toast.loading("Suspending Agent...")
        try {
            await suspendAgent(agentId).unwrap();
            toast.success(`Agent suspended successfully`, { id: toastId });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to suspend", { id: toastId });
        }
    };

    const handleRetry = () => {
        refetch();
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("");
        setMinCommission("");
        setCurrentPage(1);
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
                        <CardTitle>Manage Agents</CardTitle>
                        <CardDescription>Approve, suspend, and review agents — track volumes and performance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {isLoading ? (
                                <>
                                    <StatCardSkeleton />
                                    <StatCardSkeleton />
                                    <StatCardSkeleton />
                                    <StatCardSkeleton />
                                </>
                            ) : (
                                <>
                                    <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-4">
                                        <div className="text-xs text-muted-foreground">Total Agents</div>
                                        <div className="mt-1 text-2xl font-semibold text-blue-900 dark:text-white">{statistics?.totalAgents || 0}</div>
                                    </div>
                                    <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-lg p-4">
                                        <div className="text-xs text-muted-foreground">Pending</div>
                                        <div className="mt-1 text-2xl font-semibold text-yellow-700">{statistics?.totalPendingAgents || 0}</div>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
                                        <div className="text-xs text-muted-foreground">Active</div>
                                        <div className="mt-1 text-2xl font-semibold text-green-700">{statistics?.totalActiveAgents || 0}</div>
                                    </div>
                                    <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4">
                                        <div className="text-xs text-muted-foreground">Suspended</div>
                                        <div className="mt-1 text-2xl font-semibold text-red-600">{statistics?.totalSuspendedAgents || 0}</div>
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
                                            <SelectItem value="PENDING">Pending</SelectItem>
                                            <SelectItem value="ACTIVE">Active</SelectItem>
                                            <SelectItem value="SUSPEND">Suspended</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Input
                                    type="number"
                                    placeholder="Min commission BDT"
                                    value={minCommission}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setMinCommission(v === "" ? "" : Number(v));
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
                                        `Showing ${apiAgents?.length || 0} results`
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Agents Table */}
            <Card className="overflow-hidden bg-card/40">
                <CardHeader>
                    <CardTitle>Agents List</CardTitle>
                    <CardDescription>Approve or suspend agents. Click an agent to view details.</CardDescription>
                </CardHeader>

                <CardContent>
                    {!isLoading && !isError && apiAgents && apiAgents.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <Table className="rounded-md border">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Agent</TableHead>
                                    <TableHead>Shop</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Transactions</TableHead>
                                    <TableHead>Volume</TableHead>
                                    <TableHead>Commission</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    // Show skeleton rows while loading
                                    Array.from({ length: limit }).map((_, index) => (
                                        <TableRowSkeleton key={index} />
                                    ))
                                ) : (
                                    apiAgents?.map((agent: TUser) => {
                                        const initials = agent?.name
                                            ? agent?.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .slice(0, 2)
                                                .join("")
                                            : "B";
                                        return <TableRow key={agent._id} className="hover:bg-muted/5">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {/* Initials Avatar */}
                                                    <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-white font-semibold">
                                                        {initials.toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="font-medium">{agent?.name || "Bank"}</div>
                                                        {/* <div className="text-xs text-muted-foreground">{agent?.name || "N/A"}</div> */}
                                                        <div className="text-xs text-muted-foreground">{agent.phoneNumber || "N/A"}</div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">{agent.shopName}</div>
                                            </TableCell>

                                            <TableCell>
                                                <Badge variant={agent.status === Status.ACTIVE ? "secondary" : agent.status === Status.PENDING ? "outline" : "destructive"}>
                                                    {agent.status.toUpperCase()}
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">{handleFormateDate(agent.createdAt)}</div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">
                                                    {agent.transactionsCount}
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">
                                                    {`৳ ${agent.transactionVolume}`}
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">
                                                    ৳ {(agent.commission as number).toFixed(2)}
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {(agent.status === Status.PENDING || agent.status === Status.SUSPEND) && (
                                                        <ActionButtonWithConfirm
                                                            icon={<CheckCircle className="h-4 w-4 text-white" />}
                                                            title="Approve"
                                                            dialogTitle="Are you absolutely sure?"
                                                            dialogDescription={`Are you sure you want to approve ${agent?.name}? They will become an active agent and gain access to the agent dashboard all activities.`}
                                                            onConfirm={() => handleApprove(agent._id)}
                                                            disabled={isApproving || isSuspending}
                                                        />
                                                    )}
                                                    {agent.status !== Status.SUSPEND && agent.status !== Status.REJECTED && (
                                                        <ActionButtonWithConfirm
                                                            icon={<XCircle className="h-4 w-4 text-white" />}
                                                            title="Suspend"
                                                            variant="destructive"
                                                            dialogTitle="Are you absolutely sure?"
                                                            dialogDescription={`Are you sure you want to suspend ${agent?.name}? They will become a suspended agent and cannot perform some actions.`}
                                                            onConfirm={() => handleSuspend(agent._id)}
                                                            disabled={isApproving || isSuspending}
                                                        />
                                                    )}

                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => dispatch(openModal({ type: "agent", data: agent }))}
                                                        title="View"
                                                        disabled={isApproving || isSuspending}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    })
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Pagination - only show if we have data and not loading */}
            {!isLoading && !isError && apiAgents && apiAgents.length > 0 && (
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
            <UserDetailsModal />
        </motion.div>
    );
}
