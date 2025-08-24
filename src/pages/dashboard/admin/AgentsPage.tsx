/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserDetailsModal } from "@/components/ui/UserDetailsModal";
import { openModal } from "@/redux/features/modalSlice";
import { useApproveAgentMutation, useGetAllAgentsQuery, useSuspendAgentMutation } from "@/redux/features/userApi";
import { useAppDispatch } from "@/redux/hook";
import { TUser } from "@/types";
import { Status } from "@/types/user.types";
import { motion } from "framer-motion";
import {
    CheckCircle,
    Eye,
    Search,
    XCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AgentStatus = "pending" | "active" | "suspended" | "rejected";


/** simple util for date format */
const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString() + " " + new Date(iso).toLocaleTimeString() : "-";

/** Agent Details Modal (in-file component) */
// function AgentDetailsModal({
//     open,
//     onOpenChange,
//     agent,
//     handleApprove,
//     onSuspend,
// }: {
//     open: boolean;
//     onOpenChange: (v: boolean) => void;
//     agent: TUser | null;
//     onApprove: (id: string) => Promise<void>;
//     onSuspend: (id: string) => Promise<void>;
// }) {
//     const [suspendReasonLocal, setSuspendReasonLocal] = useState("");

//     useEffect(() => {
//         if (!open) setSuspendReasonLocal("");
//     }, [open]);

//     if (!agent) return null;

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="max-w-2xl">
//                 <DialogHeader>
//                     <div className="flex items-center gap-4">
//                         <Avatar className="h-14 w-14">
//                             <AvatarImage src="https://github.com/shadcn.png" />
//                             <AvatarFallback>{agent.name.slice(0, 2).toUpperCase()}</AvatarFallback>
//                         </Avatar>
//                         <div>
//                             <DialogTitle className="text-lg">{agent.name}</DialogTitle>
//                             <div className="text-sm text-muted-foreground">{agent.shopName}</div>
//                             <div className="text-xs text-muted-foreground">{agent.phoneNumber} • {agent.email}</div>
//                         </div>
//                         <div className="ml-auto">
//                             <Badge variant={agent.status === Status.ACTIVE ? "secondary" : agent.status === Status.PENDING ? "outline" : "destructive"}>
//                                 {agent.status.toUpperCase()}
//                             </Badge>
//                         </div>
//                     </div>
//                 </DialogHeader>

//                 <div className="mt-4">
//                     <Tabs defaultValue="profile" className="space-y-4">
//                         <TabsList>
//                             <TabsTrigger value="profile">Profile</TabsTrigger>
//                             <TabsTrigger value="wallet">Wallet</TabsTrigger>
//                             <TabsTrigger value="transactions">Transactions</TabsTrigger>
//                             {/* <TabsTrigger value="audit">Audit</TabsTrigger> */}
//                         </TabsList>

//                         <TabsContent value="profile">
//                             <Card>
//                                 <CardContent className="grid grid-cols-2 gap-3">
//                                     <div>
//                                         <div className="text-xs text-muted-foreground">Joined</div>
//                                         <div className="font-medium">{new Date(agent.createdAt).toLocaleString()}</div>
//                                     </div>
//                                     <div>
//                                         <div className="text-xs text-muted-foreground">Commission</div>
//                                         <div className="font-medium">
//                                             ৳ {agent.commission}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-xs text-muted-foreground">Transactions</div>
//                                         <div className="font-medium">
//                                             {agent.transactionsCount}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <div className="text-xs text-muted-foreground">Volume</div>
//                                         <div className="font-medium">

//                                             ৳ {agent.transactionVolume}
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>

//                         <TabsContent value="wallet">
//                             <Card>
//                                 <CardContent className="grid grid-cols-1 gap-2">
//                                     <div className="text-xs text-muted-foreground">Balance</div>
//                                     <div className="text-2xl font-semibold">
//                                         ৳ {agent.balance}
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>

//                         <TabsContent value="transactions">
//                             <div className="space-y-2">
//                                 {[...Array(6)].map((_, i) => (
//                                     <div key={i} className="flex items-center justify-between border-b py-2">
//                                         <div>
//                                             <div className="font-medium">
//                                                 Tx #{agent.transactionsCount as number - i}
//                                             </div>
//                                             <div className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</div>
//                                         </div>
//                                         <div className="font-medium">৳ {(Math.random() * 4000).toFixed(0)}</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </TabsContent>

//                         {/* <TabsContent value="audit">
//                             <div className="text-sm text-muted-foreground">Audit logs and notes will show here. (Replace with real data)</div>
//                         </TabsContent> */}
//                     </Tabs>
//                 </div>

//                 <DialogFooter className="mt-4 flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                         {agent.status !== Status.ACTIVE && (
//                             // <Button
//                             // // onClick={() => onApprove(agent._id)}

//                             // ><CheckCircle className="mr-2 h-4 w-4" /> Approve</Button>
//                             <ActionButtonWithConfirm
//                                 icon={<CheckCircle className="h-4 w-4 text-white" />}
//                                 title="Approve"
//                                 dialogTitle="Are you absolutely sure?"
//                                 dialogDescription={`Are you sure you want to approve ${agent?.name}? They will become an active agent and gain access to the agent dashboard all activities.`}
//                                 onConfirm={() => handleApprove(agent._id)}
//                             />
//                         )}
//                         {agent.status !== Status.SUSPEND && (
//                             <div className="flex items-center gap-2">
//                                 <Input placeholder="Reason (optional)" value={suspendReasonLocal} onChange={(e) => setSuspendReasonLocal(e.target.value)} />
//                                 <Button variant="destructive"
//                                 // onClick={() => onSuspend(agent.id, suspendReasonLocal)}
//                                 ><XCircle className="mr-2 h-4 w-4" /> Suspend</Button>
//                             </div>
//                         )}
//                     </div>
//                     <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }

export default function AgentsPage() {
    const dispatch = useAppDispatch();

    // API Call
    const { data: apiAgents } = useGetAllAgentsQuery(undefined);
    const [approveAgent] = useApproveAgentMutation();
    const [suspendAgent] = useSuspendAgentMutation();

    console.log('apiAgents==>', apiAgents);

    // filters & state
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<AgentStatus | "all">("all");
    const [minCommission, setMinCommission] = useState<number | "">("");

    // modal / dialog states
    // const [selectedAgent, setSelectedAgent] = useState<TUser | null>(null);
    // const [modalOpen, setModalOpen] = useState(false);

    // filtering
    // const filtered = useMemo(() => {
    //     let list = agents.slice();

    //     if (statusFilter !== "all") {
    //         list = list.filter((a) => a.status === statusFilter);
    //     }

    //     if (search.trim()) {
    //         const q = search.toLowerCase();
    //         list = list.filter(
    //             (a) =>
    //                 a.name.toLowerCase().includes(q) ||
    //                 a.phone.toLowerCase().includes(q) ||
    //                 (a.shopName || "").toLowerCase().includes(q) ||
    //                 (a.email || "").toLowerCase().includes(q)
    //         );
    //     }

    //     if (minCommission !== "") {
    //         const min = Number(minCommission);
    //         if (!Number.isNaN(min)) {
    //             list = list.filter((a) => a.commissionRate >= min / 100); // input in percent
    //         }
    //     }

    //     // default sort by joinedAt desc
    //     list.sort((x, y) => (new Date(y.joinedAt).getTime() - new Date(x.joinedAt).getTime()));
    //     return list;
    // }, [agents, statusFilter, search, minCommission]);

    // pagination
    // const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    // const paginated = useMemo(() => {
    //     const start = (page - 1) * perPage;
    //     return filtered.slice(start, start + perPage);
    // }, [filtered, page, perPage]);

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
            toast.success(`Agent suspend successfully`, { id: toastId });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to approve", { id: toastId });
        }
    };

    // UI helpers
    // const openDetails = (agent: TUser) => {
    //     setSelectedAgent(agent);
    //     setModalOpen(true);
    // };


    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-6">
            {/* Header + Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Manage Agents</CardTitle>
                        <CardDescription>Approve, suspend, and review agents — track volumes and performance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-4">
                                <div className="text-xs text-muted-foreground">Total Agents</div>
                                <div className="mt-1 text-2xl font-semibold text-blue-900 dark:text-white">{apiAgents?.data.length}</div>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-lg p-4">
                                <div className="text-xs text-muted-foreground">Pending</div>
                                <div className="mt-1 text-2xl font-semibold text-yellow-700">4(H)</div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
                                <div className="text-xs text-muted-foreground">Active</div>
                                <div className="mt-1 text-2xl font-semibold text-green-700">6(H)</div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4">
                                <div className="text-xs text-muted-foreground">Suspended</div>
                                <div className="mt-1 text-2xl font-semibold text-red-600">67(H)</div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="text-sm text-muted-foreground">Transactions: <span className="font-medium text-muted-foreground">456(H)</span></div>
                            <div className="text-sm text-muted-foreground">Volume: <span className="font-medium">{`৳ 235(H)`}</span></div>
                        </div>
                    </CardContent>
                </Card>

                {/* Filters Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filters</CardTitle>
                        <CardDescription>Search and narrow results</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search by name / phone / shop / email" value={search}
                                // onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Select value={statusFilter}
                                // ={(v) => { setStatusFilter(v as any); setPage(1); }}
                                >
                                    <SelectTrigger className="w-full">
                                        <div className="px-2">{statusFilter === "all" ? "All statuses" : statusFilter}</div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Input type="number" placeholder="Min commission %" value={minCommission}
                                //  onChange={(e) => { const v = e.target.value; setMinCommission(v === "" ? "" : Number(v)); setPage(1); }} 
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={() => { setSearch(""); setStatusFilter("all"); setMinCommission(""); }}>Reset</Button>
                                <div className="ml-auto text-sm text-muted-foreground">Showing 234 results</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Agents Table */}
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Agents List</CardTitle>
                    <CardDescription>Approve or suspend agents. Click an agent to view details.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Table className="rounded-md border">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Agent</TableHead>
                                <TableHead>Shop</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Tx Count</TableHead>
                                <TableHead>Volume</TableHead>
                                <TableHead>Commission</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {paginated.map((agent) => (
                                <TableRow key={agent.id} className="hover:bg-muted/5">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={agent.avatarUrl ?? undefined} />
                                                <AvatarFallback>{agent.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <div className="font-medium">{agent.name}</div>
                                                <div className="text-xs text-muted-foreground">{agent.phone}</div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm">{agent.shopName}</div>
                                    </TableCell>

                                    <TableCell>
                                        <Badge variant={agent.status === "active" ? "secondary" : agent.status === "pending" ? "outline" : "destructive"}>
                                            {agent.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm">{formatDate(agent.joinedAt)}</div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm">{agent.transactionsCount}</div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm">
                                            {`৳ ${agent.transactionVolume.toLocaleString()}`}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm">{(agent.commissionRate * 100).toFixed(2)}%</div>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {agent.status === "pending" && (
                                                <Button size="sm" onClick={() => setConfirmDialog({ type: "approve", agent })} title="Approve">
                                                    <CheckCircle className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {agent.status !== "suspended" && agent.status !== "rejected" && (
                                                <Button size="sm" variant="destructive" onClick={() => setConfirmDialog({ type: "suspend", agent })} title="Suspend">
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button size="sm" variant="ghost" onClick={() => openDetails(agent)} title="View">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                             */}

                            {apiAgents?.data?.map((agent: TUser) => (
                                <TableRow key={agent._id} className="hover:bg-muted/5">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                <AvatarFallback>{agent.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <div className="font-medium">{agent.name}</div>
                                                <div className="text-xs text-muted-foreground">{agent.phoneNumber}</div>
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
                                        <div className="text-sm">{formatDate(agent.createdAt)}</div>
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
                                                />
                                            )}
                                            {agent.status !== Status.SUSPEND && agent.status !== Status.REJECTED && (
                                                <ActionButtonWithConfirm
                                                    icon={<XCircle className="h-4 w-4 text-white" />}
                                                    title="Suspend"
                                                    variant="destructive"
                                                    dialogTitle="Are you absolutely sure?"
                                                    dialogDescription={`Are you sure you want to suspend ${agent?.name}? They will become an suspend agent and can not paly some action.`}
                                                    onConfirm={() => handleSuspend(agent._id)}
                                                />
                                            )}


                                            <Button size="sm"
                                                variant="outline"
                                                onClick={() => dispatch(openModal({ type: "agent", data: agent }))}
                                                // onClick={() => openDetails(agent)}
                                                title="View"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>

                                        </div>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Agent Details Modal (replaces Drawer) */}
            {/* <AgentDetailsModal
                open={modalOpen}
                onOpenChange={(open) => {
                    setModalOpen(open);
                    if (!open) setSelectedAgent(null);
                }}
                agent={selectedAgent}
                onApprove={async (id) => {
                    await approveAgent(id);
                }}
                onSuspend={async (id,) => {
                    await suspendAgent(id);
                }}
            /> */}

            <UserDetailsModal
            // handleApprove={() => handleApprove(agent._id)}
            // handleSuspend={() => handleSuspend(agent._id)}
            ></UserDetailsModal>
        </motion.div>
    );
}

