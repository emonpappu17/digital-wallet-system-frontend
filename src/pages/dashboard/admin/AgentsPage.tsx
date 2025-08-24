/* eslint-disable @typescript-eslint/no-explicit-any */

// // const AgentsPage = () => {
// //     return (
// //         <div>
// //             AgentsPage
// //         </div>
// //     );
// // };

// // export default AgentsPage;


// // src/pages/admin/ManageAgentsPage.tsx
// import React, { useMemo, useState, useEffect } from "react";
// import {
//     Card,
//     CardHeader,
//     CardTitle,
//     CardContent,
//     CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, } from "@/components/ui/drawer";
// import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// // import { formatCurrency } from "@/lib/utils"; // optional helper you might already have
// import { motion } from "framer-motion";
// import {
//     CheckCircle,
//     XCircle,
//     Eye,
//     MoreHorizontal,
//     Search,
//     ChevronLeft,
//     ChevronRight,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// type AgentStatus = "pending" | "active" | "suspended" | "rejected";

// type Agent = {
//     id: string;
//     name: string;
//     phone: string;
//     email?: string;
//     shopName?: string;
//     joinedAt: string; // ISO
//     status: AgentStatus;
//     commissionRate: number; // 0.02 => 2%
//     transactionsCount: number;
//     transactionVolume: number; // BDT
//     balance: number;
//     avatarUrl?: string | null;
//     reason?: string; // reason for suspension/rejection
// };

// const simulateNetwork = <T,>(result: T, ms = 700) =>
//     new Promise<T>((res) => setTimeout(() => res(result), ms));

// /** Simple replacement for toast (replace with react-hot-toast or your toast util) */
// function useToasts() {
//     return {
//         success: (msg: string) => {
//             // minimal: replace with your toast lib
//             console.info("[toast success]", msg);
//             // fallback: browser toast
//             // eslint-disable-next-line no-alert
//             // alert(msg);
//         },
//         error: (msg: string) => {
//             console.error("[toast error]", msg);
//             // eslint-disable-next-line no-alert
//             // alert(msg);
//         },
//     };
// }

// /** Mock seed data */
// const initialAgents: Agent[] = [
//     {
//         id: "A-1001",
//         name: "Rakib Hossain",
//         phone: "+8801711111111",
//         email: "rakib@example.com",
//         shopName: "Rakib Cash Center",
//         joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
//         status: "pending",
//         commissionRate: 0.015,
//         transactionsCount: 124,
//         transactionVolume: 248500,
//         balance: 2500,
//         avatarUrl: null,
//     },
//     {
//         id: "A-1002",
//         name: "Anika Ferdous",
//         phone: "+8801712222222",
//         email: "anika@example.com",
//         shopName: "Anika Store",
//         joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 70).toISOString(),
//         status: "active",
//         commissionRate: 0.02,
//         transactionsCount: 512,
//         transactionVolume: 1245000,
//         balance: 12000,
//         avatarUrl: null,
//     },
//     {
//         id: "A-1003",
//         name: "Monir Ahmed",
//         phone: "+8801713333333",
//         email: "monir@example.com",
//         shopName: "Monir Shop",
//         joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
//         status: "suspended",
//         commissionRate: 0.018,
//         transactionsCount: 64,
//         transactionVolume: 84200,
//         balance: 400,
//         avatarUrl: null,
//         reason: "Suspicious activity - manual review required",
//     },
//     {
//         id: "A-1004",
//         name: "Shila Rahman",
//         phone: "+8801714444444",
//         email: "shila@example.com",
//         shopName: "Shila Corner",
//         joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
//         status: "pending",
//         commissionRate: 0.012,
//         transactionsCount: 8,
//         transactionVolume: 5200,
//         balance: 100,
//         avatarUrl: null,
//     },
// ];

// /** simple util for date format */
// const formatDate = (iso?: string) =>
//     iso ? new Date(iso).toLocaleDateString() + " " + new Date(iso).toLocaleTimeString() : "-";

// /** page component */
// export default function AgentsPage() {
//     const toasts = useToasts();

//     // data source (in real app, replace with RTK Query)
//     const [agents, setAgents] = useState<Agent[]>(initialAgents);
//     const [loading, setLoading] = useState(false);

//     // filters & state
//     const [search, setSearch] = useState("");
//     const [statusFilter, setStatusFilter] = useState<AgentStatus | "all">("all");
//     const [minCommission, setMinCommission] = useState<number | "">("");
//     const [page, setPage] = useState(1);
//     const [perPage, setPerPage] = useState(8);

//     // drawer / dialog states
//     const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [confirmDialog, setConfirmDialog] = useState<{ type: "approve" | "suspend" | null; agent: Agent | null }>({
//         type: null,
//         agent: null,
//     });
//     const [suspendReason, setSuspendReason] = useState("");

//     // derived stats
//     const stats = useMemo(() => {
//         const total = agents.length;
//         const pending = agents.filter((a) => a.status === "pending").length;
//         const active = agents.filter((a) => a.status === "active").length;
//         const suspended = agents.filter((a) => a.status === "suspended").length;
//         const txCount = agents.reduce((s, a) => s + a.transactionsCount, 0);
//         const txVolume = agents.reduce((s, a) => s + a.transactionVolume, 0);
//         return { total, pending, active, suspended, txCount, txVolume };
//     }, [agents]);

//     // filtering
//     const filtered = useMemo(() => {
//         let list = agents.slice();

//         if (statusFilter !== "all") {
//             list = list.filter((a) => a.status === statusFilter);
//         }

//         if (search.trim()) {
//             const q = search.toLowerCase();
//             list = list.filter(
//                 (a) =>
//                     a.name.toLowerCase().includes(q) ||
//                     a.phone.toLowerCase().includes(q) ||
//                     (a.shopName || "").toLowerCase().includes(q) ||
//                     (a.email || "").toLowerCase().includes(q)
//             );
//         }

//         if (minCommission !== "") {
//             const min = Number(minCommission);
//             if (!Number.isNaN(min)) {
//                 list = list.filter((a) => a.commissionRate >= min / 100); // input in percent
//             }
//         }

//         // default sort by joinedAt desc
//         list.sort((x, y) => (new Date(y.joinedAt).getTime() - new Date(x.joinedAt).getTime()));
//         return list;
//     }, [agents, statusFilter, search, minCommission]);

//     // pagination
//     const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
//     const paginated = useMemo(() => {
//         const start = (page - 1) * perPage;
//         return filtered.slice(start, start + perPage);
//     }, [filtered, page, perPage]);

//     // Admin actions (simulate API)
//     const approveAgent = async (agentId: string) => {
//         setLoading(true);
//         try {
//             const a = agents.find((x) => x.id === agentId);
//             if (!a) throw new Error("Agent not found");

//             // simulate API
//             await simulateNetwork(true, 900);
//             setAgents((prev) => prev.map((p) => (p.id === agentId ? { ...p, status: "active" } : p)));
//             toasts.success(`Agent ${a.name} approved`);
//         } catch (err: any) {
//             toasts.error(err?.message || "Failed to approve");
//         } finally {
//             setLoading(false);
//             setConfirmDialog({ type: null, agent: null });
//         }
//     };

//     const suspendAgent = async (agentId: string, reason?: string) => {
//         setLoading(true);
//         try {
//             const a = agents.find((x) => x.id === agentId);
//             if (!a) throw new Error("Agent not found");

//             await simulateNetwork(true, 900);
//             setAgents((prev) =>
//                 prev.map((p) => (p.id === agentId ? { ...p, status: "suspended", reason: reason || "Suspended by admin" } : p))
//             );
//             toasts.success(`Agent ${a.name} suspended`);
//         } catch (err: any) {
//             toasts.error(err?.message || "Failed to suspend");
//         } finally {
//             setLoading(false);
//             setConfirmDialog({ type: null, agent: null });
//             setSuspendReason("");
//         }
//     };

//     // UI helpers
//     const openDetails = (agent: Agent) => {
//         setSelectedAgent(agent);
//         setDrawerOpen(true);
//     };

//     // when switching pages ensure page in range
//     useEffect(() => {
//         if (page > totalPages) setPage(totalPages);
//     }, [totalPages, page]);

//     return (
//         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-6">
//             {/* Header + Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <Card className="col-span-2">
//                     <CardHeader>
//                         <CardTitle>Manage Agents</CardTitle>
//                         <CardDescription>Approve, suspend, and review agents — track volumes and performance.</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                             <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-4">
//                                 <div className="text-xs text-muted-foreground">Total Agents</div>
//                                 <div className="mt-1 text-2xl font-semibold text-blue-900 dark:text-white">{stats.total}</div>
//                             </div>
//                             <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-lg p-4">
//                                 <div className="text-xs text-muted-foreground">Pending</div>
//                                 <div className="mt-1 text-2xl font-semibold text-yellow-700">{stats.pending}</div>
//                             </div>
//                             <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
//                                 <div className="text-xs text-muted-foreground">Active</div>
//                                 <div className="mt-1 text-2xl font-semibold text-green-700">{stats.active}</div>
//                             </div>
//                             <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4">
//                                 <div className="text-xs text-muted-foreground">Suspended</div>
//                                 <div className="mt-1 text-2xl font-semibold text-red-600">{stats.suspended}</div>
//                             </div>
//                         </div>

//                         <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
//                             <div className="text-sm text-muted-foreground">Transactions: <span className="font-medium text-muted-foreground">{stats.txCount}</span></div>
//                             <div className="text-sm text-muted-foreground">Volume: <span className="font-medium">
//                                 {/* {formatCurrency ? formatCurrency(stats.txVolume) : `৳${stats.txVolume.toLocaleString()}`} */}
//                                 {`৳${stats.txVolume.toLocaleString()}`}
//                             </span></div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Filters Card */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Filters</CardTitle>
//                         <CardDescription>Search and narrow results</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-3">
//                             <div className="flex items-center gap-2">
//                                 <Search className="h-4 w-4 text-muted-foreground" />
//                                 <Input placeholder="Search by name / phone / shop / email" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
//                             </div>

//                             <div className="grid grid-cols-2 gap-2">
//                                 <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as any); setPage(1); }}>
//                                     <SelectTrigger className="w-full">
//                                         <div className="px-2">{statusFilter === "all" ? "All statuses" : statusFilter}</div>
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="all">All</SelectItem>
//                                         <SelectItem value="pending">Pending</SelectItem>
//                                         <SelectItem value="active">Active</SelectItem>
//                                         <SelectItem value="suspended">Suspended</SelectItem>
//                                         <SelectItem value="rejected">Rejected</SelectItem>
//                                     </SelectContent>
//                                 </Select>

//                                 <Input type="number" placeholder="Min commission %" value={minCommission} onChange={(e) => { const v = e.target.value; setMinCommission(v === "" ? "" : Number(v)); setPage(1); }} />
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 <Button variant="ghost" onClick={() => { setSearch(""); setStatusFilter("all"); setMinCommission(""); }}>Reset</Button>
//                                 <div className="ml-auto text-sm text-muted-foreground">Showing {filtered.length ?? 0} results</div>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* Agents Table */}
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Agents List</CardTitle>
//                     <CardDescription>Approve or suspend agents. Click an agent to view details.</CardDescription>
//                 </CardHeader>

//                 <CardContent>
//                     <ScrollArea className="max-h-[48vh] rounded-md border">
//                         <Table>
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Agent</TableHead>
//                                     <TableHead>Shop</TableHead>
//                                     <TableHead>Status</TableHead>
//                                     <TableHead>Joined</TableHead>
//                                     <TableHead>Tx Count</TableHead>
//                                     <TableHead>Volume</TableHead>
//                                     <TableHead>Commission</TableHead>
//                                     <TableHead className="text-right">Actions</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 {paginated.map((agent) => (
//                                     <TableRow key={agent.id} className="hover:bg-muted/5">
//                                         <TableCell>
//                                             <div className="flex items-center gap-3">
//                                                 <Avatar className="h-9 w-9">
//                                                     <AvatarImage src={agent.avatarUrl ?? undefined} />
//                                                     <AvatarFallback>{agent.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
//                                                 </Avatar>
//                                                 <div className="flex flex-col">
//                                                     <div className="font-medium">{agent.name}</div>
//                                                     <div className="text-xs text-muted-foreground">{agent.phone}</div>
//                                                 </div>
//                                             </div>
//                                         </TableCell>

//                                         <TableCell>
//                                             <div className="text-sm">{agent.shopName}</div>
//                                         </TableCell>

//                                         <TableCell>
//                                             <Badge variant={agent.status === "active" ? "secondary" : agent.status === "pending" ? "outline" : "destructive"}>
//                                                 {agent.status.toUpperCase()}
//                                             </Badge>
//                                         </TableCell>

//                                         <TableCell>
//                                             <div className="text-sm">{formatDate(agent.joinedAt)}</div>
//                                         </TableCell>

//                                         <TableCell>
//                                             <div className="text-sm">{agent.transactionsCount}</div>
//                                         </TableCell>

//                                         <TableCell>
//                                             <div className="text-sm">
//                                                 {/* {formatCurrency ? formatCurrency(agent.transactionVolume) : `৳ ${agent.transactionVolume.toLocaleString()}`} */}
//                                                 {`৳ ${agent.transactionVolume.toLocaleString()}`}
//                                             </div>
//                                         </TableCell>

//                                         <TableCell>
//                                             <div className="text-sm">{(agent.commissionRate * 100).toFixed(2)}%</div>
//                                         </TableCell>

//                                         <TableCell className="text-right">
//                                             <div className="flex items-center justify-end gap-2">
//                                                 {agent.status === "pending" && (
//                                                     <Button size="sm" onClick={() => setConfirmDialog({ type: "approve", agent })} title="Approve">
//                                                         <CheckCircle className="h-4 w-4" />
//                                                     </Button>
//                                                 )}
//                                                 {agent.status !== "suspended" && agent.status !== "rejected" && (
//                                                     <Button size="sm" variant="destructive" onClick={() => setConfirmDialog({ type: "suspend", agent })} title="Suspend">
//                                                         <XCircle className="h-4 w-4" />
//                                                     </Button>
//                                                 )}
//                                                 <Button size="sm" variant="ghost" onClick={() => openDetails(agent)} title="View">
//                                                     <Eye className="h-4 w-4" />
//                                                 </Button>
//                                             </div>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}

//                                 {paginated.length === 0 && (
//                                     <TableRow>
//                                         <TableCell colSpan={8} className="py-8 text-center text-sm text-muted-foreground">
//                                             No agents found for the selected filters.
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </ScrollArea>

//                     {/* Pagination controls */}
//                     <div className="mt-4 flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                             <Button size="sm" variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
//                                 <ChevronLeft className="h-4 w-4" />
//                             </Button>
//                             <div className="text-sm">{page} / {totalPages}</div>
//                             <Button size="sm" variant="ghost" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
//                                 <ChevronRight className="h-4 w-4" />
//                             </Button>
//                         </div>

//                         <div className="flex items-center gap-2">
//                             <div className="text-sm text-muted-foreground">Rows</div>
//                             <Select value={String(perPage)} onValueChange={(v) => { setPerPage(Number(v)); setPage(1); }}>
//                                 <SelectTrigger className="w-24">
//                                     <div className="px-2">{perPage}</div>
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="5">5</SelectItem>
//                                     <SelectItem value="8">8</SelectItem>
//                                     <SelectItem value="12">12</SelectItem>
//                                     <SelectItem value="20">20</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>

//             {/* Confirm Dialog */}
//             <Dialog open={Boolean(confirmDialog.type)} onOpenChange={(open) => { if (!open) setConfirmDialog({ type: null, agent: null }); }}>
//                 <DialogContent>
//                     <DialogHeader>
//                         <DialogTitle>{confirmDialog.type === "approve" ? "Approve Agent" : "Suspend Agent"}</DialogTitle>
//                     </DialogHeader>

//                     <div className="py-2">
//                         <p className="text-sm text-muted-foreground">
//                             {confirmDialog.type === "approve"
//                                 ? `Are you sure you want to approve ${confirmDialog.agent?.name}? They will become an active agent and gain access to the agent dashboard.`
//                                 : `Provide a reason for suspension of ${confirmDialog.agent?.name} (optional).`}
//                         </p>

//                         {confirmDialog.type === "suspend" && (
//                             <div className="mt-3">
//                                 <Input placeholder="Reason (optional)" value={suspendReason} onChange={(e) => setSuspendReason(e.target.value)} />
//                             </div>
//                         )}
//                     </div>

//                     <DialogFooter>
//                         <Button variant="ghost" onClick={() => setConfirmDialog({ type: null, agent: null })}>Cancel</Button>
//                         <Button
//                             onClick={async () => {
//                                 if (!confirmDialog.agent) return;
//                                 if (confirmDialog.type === "approve") {
//                                     await approveAgent(confirmDialog.agent.id);
//                                 } else {
//                                     await suspendAgent(confirmDialog.agent.id, suspendReason);
//                                 }
//                             }}
//                         >
//                             {confirmDialog.type === "approve" ? "Approve" : "Suspend"}
//                         </Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>

//             {/* Agent Details Drawer */}
//             <Drawer open={drawerOpen} onOpenChange={(open) => setDrawerOpen(open)}>
//                 <DrawerContent  >
//                     <DrawerHeader>
//                         <DrawerTitle>Agent Details</DrawerTitle>
//                     </DrawerHeader>

//                     {/* <DrawerBody>

//                     </DrawerBody> */}
//                     {selectedAgent ? (
//                         <div className="space-y-4">
//                             <div className="flex items-center gap-4">
//                                 <Avatar className="h-14 w-14">
//                                     <AvatarImage src={selectedAgent.avatarUrl ?? undefined} />
//                                     <AvatarFallback>{selectedAgent.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
//                                 </Avatar>
//                                 <div>
//                                     <div className="text-lg font-semibold">{selectedAgent.name}</div>
//                                     <div className="text-sm text-muted-foreground">{selectedAgent.email}</div>
//                                     <div className="text-sm text-muted-foreground">{selectedAgent.phone}</div>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-3">
//                                 <Card>
//                                     <CardContent>
//                                         <div className="text-xs text-muted-foreground">Wallet Balance</div>
//                                         <div className="text-lg font-semibold mt-1">৳ {selectedAgent.balance.toLocaleString()}</div>
//                                     </CardContent>
//                                 </Card>

//                                 <Card>
//                                     <CardContent>
//                                         <div className="text-xs text-muted-foreground">Commission</div>
//                                         <div className="text-lg font-semibold mt-1">{(selectedAgent.commissionRate * 100).toFixed(2)}%</div>
//                                     </CardContent>
//                                 </Card>
//                             </div>

//                             <div>
//                                 <div className="flex items-center justify-between">
//                                     <h4 className="text-sm font-medium">Recent Transactions</h4>
//                                     <Button size="sm" variant="ghost">View full</Button>
//                                 </div>

//                                 <div className="mt-2 space-y-2">
//                                     {/* simple mock transactions */}
//                                     {[...Array(6)].map((_, i) => (
//                                         <div key={i} className="flex items-center justify-between gap-2 border-b py-2 last:border-b-0">
//                                             <div className="text-sm">
//                                                 <div className="font-medium">Tx #{selectedAgent.transactionsCount - i}</div>
//                                                 <div className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</div>
//                                             </div>
//                                             <div className="text-sm font-medium">৳ {(Math.random() * 5000).toFixed(0)}</div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 {selectedAgent.status !== "active" && (
//                                     <Button onClick={() => setConfirmDialog({ type: "approve", agent: selectedAgent })}>
//                                         <CheckCircle className="h-4 w-4 mr-2" /> Approve
//                                     </Button>
//                                 )}
//                                 {selectedAgent.status !== "suspended" && (
//                                     <Button variant="destructive" onClick={() => setConfirmDialog({ type: "suspend", agent: selectedAgent })}>
//                                         <XCircle className="h-4 w-4 mr-2" /> Suspend
//                                     </Button>
//                                 )}
//                                 <Button variant="ghost" onClick={() => { setDrawerOpen(false); setSelectedAgent(null); }}>Close</Button>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="text-sm text-muted-foreground">No agent selected</div>
//                     )}
//                 </DrawerContent>
//             </Drawer>
//         </motion.div>
//     );
// }



// src/pages/admin/ManageAgentsPage.tsx
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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useApproveAgentMutation, useGetAllAgentsQuery, useSuspendAgentMutation } from "@/redux/features/userApi";
import { TUser } from "@/types";
import { Status } from "@/types/user.types";
import { motion } from "framer-motion";
import {
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Eye,
    Search,
    XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ActionButtonWithConfirm } from "@/components/ui/ConfirmButton";

type AgentStatus = "pending" | "active" | "suspended" | "rejected";

type Agent = {
    id: string;
    name: string;
    phone: string;
    email?: string;
    shopName?: string;
    joinedAt: string; // ISO
    status: AgentStatus;
    commissionRate: number; // 0.02 => 2%
    transactionsCount: number;
    transactionVolume: number; // BDT
    balance: number;
    avatarUrl?: string | null;
    reason?: string; // reason for suspension/rejection
};

const simulateNetwork = <T,>(result: T, ms = 700) =>
    new Promise<T>((res) => setTimeout(() => res(result), ms));

/** Simple replacement for toast (replace with react-hot-toast or your toast util) */
function useToasts() {
    return {
        success: (msg: string) => {
            console.info("[toast success]", msg);
        },
        error: (msg: string) => {
            console.error("[toast error]", msg);
        },
    };
}

/** Mock seed data */
const initialAgents: Agent[] = [
    {
        id: "A-1001",
        name: "Rakib Hossain",
        phone: "+8801711111111",
        email: "rakib@example.com",
        shopName: "Rakib Cash Center",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
        status: "pending",
        commissionRate: 0.015,
        transactionsCount: 124,
        transactionVolume: 248500,
        balance: 2500,
        avatarUrl: null,
    },
    {
        id: "A-1002",
        name: "Anika Ferdous",
        phone: "+8801712222222",
        email: "anika@example.com",
        shopName: "Anika Store",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 70).toISOString(),
        status: "active",
        commissionRate: 0.02,
        transactionsCount: 512,
        transactionVolume: 1245000,
        balance: 12000,
        avatarUrl: null,
    },
    {
        id: "A-1003",
        name: "Monir Ahmed",
        phone: "+8801713333333",
        email: "monir@example.com",
        shopName: "Monir Shop",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
        status: "suspended",
        commissionRate: 0.018,
        transactionsCount: 64,
        transactionVolume: 84200,
        balance: 400,
        avatarUrl: null,
        reason: "Suspicious activity - manual review required",
    },
    {
        id: "A-1004",
        name: "Shila Rahman",
        phone: "+8801714444444",
        email: "shila@example.com",
        shopName: "Shila Corner",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
        status: "pending",
        commissionRate: 0.012,
        transactionsCount: 8,
        transactionVolume: 5200,
        balance: 100,
        avatarUrl: null,
    },
];

/** simple util for date format */
const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString() + " " + new Date(iso).toLocaleTimeString() : "-";

/** Agent Details Modal (in-file component) */
function AgentDetailsModal({
    open,
    onOpenChange,
    agent,
    onApprove,
    onSuspend,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    agent: Agent | null;
    onApprove: (id: string) => Promise<void>;
    onSuspend: (id: string, reason?: string) => Promise<void>;
}) {
    const [suspendReasonLocal, setSuspendReasonLocal] = useState("");

    useEffect(() => {
        if (!open) setSuspendReasonLocal("");
    }, [open]);

    if (!agent) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14">
                            <AvatarImage src={agent.avatarUrl ?? undefined} />
                            <AvatarFallback>{agent.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle className="text-lg">{agent.name}</DialogTitle>
                            <div className="text-sm text-muted-foreground">{agent.shopName}</div>
                            <div className="text-xs text-muted-foreground">{agent.phone} • {agent.email}</div>
                        </div>
                        <div className="ml-auto">
                            <Badge variant={agent.status === "active" ? "secondary" : agent.status === "pending" ? "outline" : "destructive"}>
                                {agent.status.toUpperCase()}
                            </Badge>
                        </div>
                    </div>
                </DialogHeader>

                <div className="mt-4">
                    <Tabs defaultValue="profile" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="wallet">Wallet</TabsTrigger>
                            <TabsTrigger value="transactions">Transactions</TabsTrigger>
                            <TabsTrigger value="audit">Audit</TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile">
                            <Card>
                                <CardContent className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-xs text-muted-foreground">Joined</div>
                                        <div className="font-medium">{new Date(agent.joinedAt).toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground">Commission</div>
                                        <div className="font-medium">{(agent.commissionRate * 100).toFixed(2)}%</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground">Transactions</div>
                                        <div className="font-medium">{agent.transactionsCount}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground">Volume</div>
                                        <div className="font-medium">৳ {agent.transactionVolume.toLocaleString()}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="wallet">
                            <Card>
                                <CardContent className="grid grid-cols-1 gap-2">
                                    <div className="text-xs text-muted-foreground">Balance</div>
                                    <div className="text-2xl font-semibold">৳ {agent.balance.toLocaleString()}</div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="transactions">
                            <div className="space-y-2">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between border-b py-2">
                                        <div>
                                            <div className="font-medium">Tx #{agent.transactionsCount - i}</div>
                                            <div className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</div>
                                        </div>
                                        <div className="font-medium">৳ {(Math.random() * 4000).toFixed(0)}</div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="audit">
                            <div className="text-sm text-muted-foreground">Audit logs and notes will show here. (Replace with real data)</div>
                        </TabsContent>
                    </Tabs>
                </div>

                <DialogFooter className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {agent.status !== "active" && (
                            <Button onClick={() => onApprove(agent.id)}><CheckCircle className="mr-2 h-4 w-4" /> Approve</Button>
                        )}
                        {agent.status !== "suspended" && (
                            <div className="flex items-center gap-2">
                                <Input placeholder="Reason (optional)" value={suspendReasonLocal} onChange={(e) => setSuspendReasonLocal(e.target.value)} />
                                <Button variant="destructive" onClick={() => onSuspend(agent.id, suspendReasonLocal)}><XCircle className="mr-2 h-4 w-4" /> Suspend</Button>
                            </div>
                        )}
                    </div>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

/** page component */
export default function AgentsPage() {
    const toasts = useToasts();

    // API Call
    const { data: apiAgents, isLoading } = useGetAllAgentsQuery(undefined);
    const [approveAgent] = useApproveAgentMutation();
    const [suspendAgent] = useSuspendAgentMutation();

    console.log('apiAgents==>', apiAgents);

    // data source (in real app, replace with RTK Query)
    const [agents, setAgents] = useState<Agent[]>(initialAgents);
    const [loading, setLoading] = useState(false);

    // filters & state
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<AgentStatus | "all">("all");
    const [minCommission, setMinCommission] = useState<number | "">("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(8);

    // modal / dialog states
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<{ type: "approve" | "suspend" | null; agent: TUser | null }>({
        type: null,
        agent: null,
    });
    const [suspendReason, setSuspendReason] = useState("");

    // derived stats
    const stats = useMemo(() => {
        const total = agents.length;
        const pending = agents.filter((a) => a.status === "pending").length;
        const active = agents.filter((a) => a.status === "active").length;
        const suspended = agents.filter((a) => a.status === "suspended").length;
        const txCount = agents.reduce((s, a) => s + a.transactionsCount, 0);
        const txVolume = agents.reduce((s, a) => s + a.transactionVolume, 0);
        return { total, pending, active, suspended, txCount, txVolume };
    }, [agents]);

    // filtering
    const filtered = useMemo(() => {
        let list = agents.slice();

        if (statusFilter !== "all") {
            list = list.filter((a) => a.status === statusFilter);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (a) =>
                    a.name.toLowerCase().includes(q) ||
                    a.phone.toLowerCase().includes(q) ||
                    (a.shopName || "").toLowerCase().includes(q) ||
                    (a.email || "").toLowerCase().includes(q)
            );
        }

        if (minCommission !== "") {
            const min = Number(minCommission);
            if (!Number.isNaN(min)) {
                list = list.filter((a) => a.commissionRate >= min / 100); // input in percent
            }
        }

        // default sort by joinedAt desc
        list.sort((x, y) => (new Date(y.joinedAt).getTime() - new Date(x.joinedAt).getTime()));
        return list;
    }, [agents, statusFilter, search, minCommission]);

    // pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = useMemo(() => {
        const start = (page - 1) * perPage;
        return filtered.slice(start, start + perPage);
    }, [filtered, page, perPage]);

    // Admin actions (simulate API)
    const handleApprove = async (agentId: string | undefined) => {
        console.log("hit ==>", agentId);
        // setLoading(true);
        const toastId = toast.loading("Approving Agent...")
        try {
            // const a = agents.find((x) => x.id === agentId);
            // if (!a) throw new Error("Agent not found");

            // // simulate API
            // await simulateNetwork(true, 900);
            // setAgents((prev) => prev.map((p) => (p.id === agentId ? { ...p, status: "active" } : p)));
            console.log("inside=>", agentId);
            const res = await approveAgent(agentId).unwrap();

            console.log('approve res==>', res);
            toast.success(`Agent approved successfully`, { id: toastId });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to approve", { id: toastId });
        }
    };

    const handleSuspend = async (agentId: string | undefined) => {
        console.log("hit ==>", agentId);
        // setLoading(true);
        const toastId = toast.loading("Suspending Agent...")
        try {
            // const a = agents.find((x) => x.id === agentId);
            // if (!a) throw new Error("Agent not found");

            // // simulate API
            // await simulateNetwork(true, 900);
            // setAgents((prev) => prev.map((p) => (p.id === agentId ? { ...p, status: "active" } : p)));
            console.log("inside=>", agentId);
            const res = await suspendAgent(agentId).unwrap();

            console.log('suspend res==>', res);
            toast.success(`Agent suspend successfully`, { id: toastId });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to approve", { id: toastId });
        }
    };

    // const suspendAgent = async (agentId: string) => {
    //     setLoading(true);
    //     try {
    //         const a = agents.find((x) => x.id === agentId);
    //         if (!a) throw new Error("Agent not found");

    //         await simulateNetwork(true, 900);
    //         setAgents((prev) =>
    //             prev.map((p) => (p.id === agentId ? { ...p, status: "suspended", reason: reason || "Suspended by admin" } : p))
    //         );
    //         toasts.success(`Agent ${a.name} suspended`);
    //     } catch (err: any) {
    //         toasts.error(err?.message || "Failed to suspend");
    //     } finally {
    //         setLoading(false);
    //         setConfirmDialog({ type: null, agent: null });
    //         setSuspendReason("");
    //         // close modal if it referred to this agent
    //         if (selectedAgent?.id === agentId) {
    //             setModalOpen(false);
    //             setSelectedAgent(null);
    //         }
    //     }
    // };

    // UI helpers
    const openDetails = (agent: Agent) => {
        setSelectedAgent(agent);
        setModalOpen(true);
    };

    // when switching pages ensure page in range
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [totalPages, page]);

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
                                <div className="mt-1 text-2xl font-semibold text-blue-900 dark:text-white">{stats.total}</div>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-lg p-4">
                                <div className="text-xs text-muted-foreground">Pending</div>
                                <div className="mt-1 text-2xl font-semibold text-yellow-700">{stats.pending}</div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4">
                                <div className="text-xs text-muted-foreground">Active</div>
                                <div className="mt-1 text-2xl font-semibold text-green-700">{stats.active}</div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-4">
                                <div className="text-xs text-muted-foreground">Suspended</div>
                                <div className="mt-1 text-2xl font-semibold text-red-600">{stats.suspended}</div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="text-sm text-muted-foreground">Transactions: <span className="font-medium text-muted-foreground">{stats.txCount}</span></div>
                            <div className="text-sm text-muted-foreground">Volume: <span className="font-medium">{`৳${stats.txVolume.toLocaleString()}`}</span></div>
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
                                <Input placeholder="Search by name / phone / shop / email" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as any); setPage(1); }}>
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

                                <Input type="number" placeholder="Min commission %" value={minCommission} onChange={(e) => { const v = e.target.value; setMinCommission(v === "" ? "" : Number(v)); setPage(1); }} />
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={() => { setSearch(""); setStatusFilter("all"); setMinCommission(""); }}>Reset</Button>
                                <div className="ml-auto text-sm text-muted-foreground">Showing {filtered.length ?? 0} results</div>
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

                <CardContent className="">
                    {/* <ScrollArea className="max-h-[48vh] rounded-md border">
                    </ScrollArea> */}

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
                                            {/* {agent.transactionsCount} */}
                                            59(H)
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm">
                                            {/* {`৳ ${agent.transactionVolume.toLocaleString()}`} */}
                                            2352(H)
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="text-sm">
                                            {/* {(agent.commissionRate * 100).toFixed(2)}% */}
                                            1.34%(H)
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
                                                    size="sm"
                                                    variant="destructive"
                                                    dialogTitle="Are you absolutely sure?"
                                                    dialogDescription={`Are you sure you want to suspend ${agent?.name}? They will become an suspend agent and can not paly some action.`}
                                                    onConfirm={() => handleSuspend(agent._id)}
                                                />
                                            )}
                                            <Button size="sm" variant="outline" onClick={() => ('')} title="View">
                                                <Eye className="h-4 w-4 " />
                                            </Button>
                                        </div>


                                    </TableCell>
                                </TableRow>
                            ))}

                            {paginated.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} className="py-8 text-center text-sm text-muted-foreground">
                                        No agents found for the selected filters.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination controls */}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="text-sm">{page} / {totalPages}</div>
                            <Button size="sm" variant="ghost" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground">Rows</div>
                            <Select value={String(perPage)} onValueChange={(v) => { setPerPage(Number(v)); setPage(1); }}>
                                <SelectTrigger className="w-24">
                                    <div className="px-2">{perPage}</div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="8">8</SelectItem>
                                    <SelectItem value="12">12</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Confirm Dialog */}
            <Dialog open={Boolean(confirmDialog.type)} onOpenChange={(open) => { if (!open) setConfirmDialog({ type: null, agent: null }); }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{confirmDialog.type === "approve" ? "Approve Agent" : "Suspend Agent"}</DialogTitle>
                    </DialogHeader>

                    <div className="py-2">
                        <p className="text-sm text-muted-foreground">
                            {confirmDialog.type === "approve"
                                ? `Are you sure you want to approve ${confirmDialog.agent?.name}? They will become an active agent and gain access to the agent dashboard.`
                                : `Provide a reason for suspension of ${confirmDialog.agent?.name} (optional).`}
                        </p>

                        {confirmDialog.type === "suspend" && (
                            <div className="mt-3">
                                <Input placeholder="Reason (optional)" value={suspendReason} onChange={(e) => setSuspendReason(e.target.value)} />
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setConfirmDialog({ type: null, agent: null })}>Cancel</Button>
                        <Button
                            onClick={async () => {
                                if (!confirmDialog.agent) return;
                                if (confirmDialog.type === "approve") {
                                    await approveAgent(confirmDialog.agent.id);
                                } else {
                                    await suspendAgent(confirmDialog.agent.id, suspendReason);
                                }
                            }}
                        >
                            {confirmDialog.type === "approve" ? "Approve" : "Suspend"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Agent Details Modal (replaces Drawer) */}
            <AgentDetailsModal
                open={modalOpen}
                onOpenChange={(open) => {
                    setModalOpen(open);
                    if (!open) setSelectedAgent(null);
                }}
                agent={selectedAgent}
                onApprove={async (id) => {
                    await approveAgent(id);
                }}
                onSuspend={async (id, reason) => {
                    await suspendAgent(id, reason);
                }}
            />
        </motion.div>
    );
}

