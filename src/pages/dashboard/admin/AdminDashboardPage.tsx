
// // const AdminDashboardPage = () => {
// //     return (
// //         <div>
// // asdfasdf
// //         </div>
// //     );
// // };

// // export default AdminDashboardPage;


// import { useMemo, useState } from "react";

// // Note: This component assumes you're using Tailwind + shadcn UI + lucide-react + recharts
// // Install (example): npm i @radix-ui/react-icons lucide-react recharts

// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Table, TBody, Td, Th, Thead, Tr } from "@/components/ui/table";
// import { Activity, DollarSign, UserCheck, Users } from "lucide-react";

// import {
//     Area,
//     AreaChart,
//     CartesianGrid,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis,
// } from "recharts";

// // -------------------- Mock Data --------------------

// type Role = "admin" | "agent" | "user";

// type User = {
//     id: string;
//     name: string;
//     phone: string;
//     role: Role;
//     createdAt: string;
// };

// type Transaction = {
//     id: string;
//     from?: string; // user id
//     to?: string; // user id
//     type: "deposit" | "withdraw" | "send" | "cash-in" | "cash-out";
//     amount: number; // in BDT
//     fee?: number;
//     commission?: number;
//     createdAt: string;
//     initiatedBy: Role; // who initiated
// };

// const mockUsers: User[] = [
//     { id: "u1", name: "Rafi Ahmed", phone: "01711111111", role: "user", createdAt: "2025-08-01" },
//     { id: "u2", name: "Maya Rahman", phone: "01722222222", role: "user", createdAt: "2025-07-28" },
//     { id: "a1", name: "Agent Kamal", phone: "01833333333", role: "agent", createdAt: "2025-06-10" },
//     { id: "u3", name: "Sakib", phone: "01744444444", role: "user", createdAt: "2025-08-10" },
//     { id: "a2", name: "Agent Shila", phone: "01855555555", role: "agent", createdAt: "2025-05-22" },
//     { id: "u4", name: "Nabila", phone: "01766666666", role: "user", createdAt: "2025-01-03" },
//     { id: "admin1", name: "Super Admin", phone: "01700000000", role: "admin", createdAt: "2024-12-01" },
// ];

// const mockTransactions?: Transaction[] = [
//     { id: "t1", from: "u1", to: "u2", type: "send", amount: 1200, fee: 12, commission: 0, createdAt: "2025-08-25", initiatedBy: "user" },
//     { id: "t2", from: "a1", to: "u3", type: "cash-in", amount: 5000, fee: 0, commission: 25, createdAt: "2025-08-24", initiatedBy: "agent" },
//     { id: "t3", from: "u3", to: "u1", type: "send", amount: 300, fee: 3, commission: 0, createdAt: "2025-08-20", initiatedBy: "user" },
//     { id: "t4", from: "u2", to: undefined, type: "withdraw", amount: 800, fee: 8, commission: 0, createdAt: "2025-08-18", initiatedBy: "user" },
//     { id: "t5", from: undefined, to: "u4", type: "deposit", amount: 1500, fee: 0, commission: 0, createdAt: "2025-08-15", initiatedBy: "user" },
//     { id: "t6", from: "a2", to: "u4", type: "cash-in", amount: 2000, fee: 0, commission: 10, createdAt: "2025-08-10", initiatedBy: "agent" },
//     { id: "t7", from: "u4", to: "u2", type: "send", amount: 400, fee: 4, commission: 0, createdAt: "2025-08-02", initiatedBy: "user" },
// ];

// // -------------------- Helpers --------------------

// const currency = (n: number) => `৳${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

// function groupVolumeByDate(transactions: Transaction[]) {
//     // produce daily aggregated totals for last 14 days (dummy)
//     const days = 14;
//     const map = new Map<string, number>();
//     const today = new Date("2025-08-27"); // fixed so UI stable in preview

//     for (let i = days - 1; i >= 0; i--) {
//         const d = new Date(today);
//         d.setDate(today.getDate() - i);
//         const key = d.toISOString().slice(0, 10);
//         map.set(key, 0);
//     }

//     transactions.forEach((t) => {
//         const dateKey = t.createdAt.slice(0, 10);
//         if (map.has(dateKey)) map.set(dateKey, (map.get(dateKey) || 0) + t.amount);
//     });

//     return Array.from(map.entries()).map(([date, amount]) => ({ date, amount }));
// }

// // -------------------- Component --------------------

// export default function AdminDashboard() {
//     const [query, setQuery] = useState("");
//     const [page, setPage] = useState(1);
//     const perPage = 5;

//     const users = mockUsers;
//     const transactions = mockTransactions;

//     const totals = useMemo(() => {
//         const totalUsers = users.filter((u) => u.role === "user").length;
//         const totalAgents = users.filter((u) => u.role === "agent").length;
//         const transactionCount = transactions.length;
//         const transactionVolume = transactions.reduce((s, t) => s + t.amount, 0);
//         return { totalUsers, totalAgents, transactionCount, transactionVolume };
//     }, [users, transactions]);

//     const chartData = useMemo(() => groupVolumeByDate(transactions), [transactions]);

//     const filtered = useMemo(() => {
//         if (!query) return transactions;
//         const q = query.toLowerCase();
//         return transactions.filter((t) => {
//             const fromName = users.find((u) => u.id === t.from)?.name || "";
//             const toName = users.find((u) => u.id === t.to)?.name || "";
//             return (
//                 t.id.toLowerCase().includes(q) ||
//                 t.type.toLowerCase().includes(q) ||
//                 fromName.toLowerCase().includes(q) ||
//                 toName.toLowerCase().includes(q) ||
//                 String(t.amount).includes(q)
//             );
//         });
//     }, [query, transactions, users]);

//     const paged = useMemo(() => {
//         const start = (page - 1) * perPage;
//         return filtered.slice(start, start + perPage);
//     }, [page, filtered]);

//     return (
//         <div className="p-6 space-y-6">
//             <header className="flex items-center justify-between">
//                 <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
//                 <div className="flex items-center gap-4">
//                     <Input
//                         placeholder="Search transactions, user, amount..."
//                         value={query}
//                         onChange={(e) => {
//                             setQuery(e.target.value);
//                             setPage(1);
//                         }}
//                         className="max-w-sm"
//                     />
//                     <Button onClick={() => { setQuery(""); setPage(1); }}>Reset</Button>
//                 </div>
//             </header>

//             {/* Overview cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <Users className="h-5 w-5" /> Users
//                         </CardTitle>
//                         <CardDescription>Total registered users</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-3xl font-bold">{totals.totalUsers}</div>
//                         <div className="text-sm text-muted-foreground mt-1">Active users</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <UserCheck className="h-5 w-5" /> Agents
//                         </CardTitle>
//                         <CardDescription>Total approved agents</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-3xl font-bold">{totals.totalAgents}</div>
//                         <div className="text-sm text-muted-foreground mt-1">Approved agents</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <Activity className="h-5 w-5" /> Transactions
//                         </CardTitle>
//                         <CardDescription>Transactions recorded</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-3xl font-bold">{totals.transactionCount}</div>
//                         <div className="text-sm text-muted-foreground mt-1">Total transactions</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <DollarSign className="h-5 w-5" /> Volume
//                         </CardTitle>
//                         <CardDescription>Transaction volume (BDT)</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-3xl font-bold">{currency(totals.transactionVolume)}</div>
//                         <div className="text-sm text-muted-foreground mt-1">Since launch (mock)</div>
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* Chart + Recent transactions */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <Card className="lg:col-span-2">
//                     <CardHeader>
//                         <CardTitle>Transaction Volume (Last 14 days)</CardTitle>
//                         <CardDescription>Daily aggregated amount</CardDescription>
//                     </CardHeader>
//                     <CardContent className="h-64">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
//                                 <defs>
//                                     <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
//                                         <stop offset="5%" stopOpacity={0.8} stopColor="#8884d8" />
//                                         <stop offset="95%" stopOpacity={0.1} stopColor="#8884d8" />
//                                     </linearGradient>
//                                 </defs>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
//                                 <YAxis />
//                                 <Tooltip formatter={(value: number) => currency(value)} />
//                                 <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorAmt)" />
//                             </AreaChart>
//                         </ResponsiveContainer>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Recent Transactions</CardTitle>
//                         <CardDescription>Latest activity (paginated)</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <Table>
//                             <Thead>
//                                 <Tr>
//                                     <Th>ID</Th>
//                                     <Th>Type</Th>
//                                     <Th>From</Th>
//                                     <Th>To</Th>
//                                     <Th className="text-right">Amount</Th>
//                                 </Tr>
//                             </Thead>
//                             <TBody>
//                                 {paged.map((t) => (
//                                     <Tr key={t.id}>
//                                         <Td>{t.id}</Td>
//                                         <Td className="capitalize">{t.type}</Td>
//                                         <Td>{users.find((u) => u.id === t.from)?.name || "—"}</Td>
//                                         <Td>{users.find((u) => u.id === t.to)?.name || "—"}</Td>
//                                         <Td className="text-right font-medium">{currency(t.amount)}</Td>
//                                     </Tr>
//                                 ))}
//                             </TBody>
//                         </Table>

//                         <div className="flex items-center justify-between mt-4">
//                             <div className="text-sm text-muted-foreground">
//                                 Showing {Math.min((page - 1) * perPage + 1, filtered.length)} -{' '}
//                                 {Math.min(page * perPage, filtered.length)} of {filtered.length}
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 <Button variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))}>
//                                     Prev
//                                 </Button>
//                                 <div className="px-3">{page}</div>
//                                 <Button
//                                     variant="ghost"
//                                     onClick={() => setPage((p) => (p * perPage < filtered.length ? p + 1 : p))}
//                                 >
//                                     Next
//                                 </Button>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* quick actions */}
//             <div className="flex flex-wrap gap-3">
//                 <Button>Manage Users</Button>
//                 <Button>Manage Agents</Button>
//                 <Button>View All Transactions</Button>
//                 <Button variant="secondary">System Settings</Button>
//             </div>
//         </div>
//     );
// }



// import { useMemo, useState } from "react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import QuickActions from "@/components/ui/QuickActions";
// import { handleFormateDate } from "@/utils/handleFormateDate";
// import { Activity, Clock, CreditCard, DollarSign, Filter, User, UserCheck, Users } from "lucide-react";
// import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
// import { Badge } from "@/components/ui/badge";

// // -------------------- Mock Types --------------------

// type Role = "ADMIN" | "AGENT" | "USER";

// interface IUser {
//     id: string;
//     name: string;
//     phone: string;
//     role: Role;
//     createdAt: string;
// }

// interface ITransaction {
//     id: string;
//     type: "DEPOSIT" | "WITHDRAW" | "SEND" | "CASH_IN" | "CASH_OUT";
//     amount: number;
//     fee?: number;
//     commission?: number;
//     createdAt: string;
//     from?: string;
//     to?: string;
//     initiatedBy: Role;
//     status?: string;
// }

// // -------------------- Dummy Data --------------------

// const mockUsers: IUser[] = [
//     { id: "u1", name: "Rafi Ahmed", phone: "01711111111", role: "USER", createdAt: "2025-08-01" },
//     { id: "u2", name: "Maya Rahman", phone: "01722222222", role: "USER", createdAt: "2025-07-28" },
//     { id: "a1", name: "Agent Kamal", phone: "01833333333", role: "AGENT", createdAt: "2025-06-10" },
//     { id: "u3", name: "Sakib", phone: "01744444444", role: "USER", createdAt: "2025-08-10" },
//     { id: "a2", name: "Agent Shila", phone: "01855555555", role: "AGENT", createdAt: "2025-05-22" },
//     { id: "u4", name: "Nabila", phone: "01766666666", role: "USER", createdAt: "2025-01-03" },
//     { id: "admin1", name: "Super Admin", phone: "01700000000", role: "ADMIN", createdAt: "2024-12-01" },
// ];

// const mockTransactions: ITransaction[] = [
//     { id: "t1", type: "SEND", amount: 1200, fee: 12, commission: 0, createdAt: "2025-08-25", from: "u1", to: "u2", initiatedBy: "USER", status: "COMPLETED" },
//     { id: "t2", type: "CASH_IN", amount: 5000, fee: 0, commission: 25, createdAt: "2025-08-24", from: "a1", to: "u3", initiatedBy: "AGENT", status: "COMPLETED" },
//     { id: "t3", type: "SEND", amount: 300, fee: 3, commission: 0, createdAt: "2025-08-20", from: "u3", to: "u1", initiatedBy: "USER", status: "COMPLETED" },
//     { id: "t4", type: "WITHDRAW", amount: 800, fee: 8, commission: 0, createdAt: "2025-08-18", from: "u2", initiatedBy: "USER", status: "COMPLETED" },
//     { id: "t5", type: "DEPOSIT", amount: 1500, fee: 0, commission: 0, createdAt: "2025-08-15", to: "u4", initiatedBy: "USER", status: "COMPLETED" },
//     { id: "t6", type: "CASH_IN", amount: 2000, fee: 0, commission: 10, createdAt: "2025-08-10", from: "a2", to: "u4", initiatedBy: "AGENT", status: "COMPLETED" },
//     { id: "t7", type: "SEND", amount: 400, fee: 4, commission: 0, createdAt: "2025-08-02", from: "u4", to: "u2", initiatedBy: "USER", status: "COMPLETED" },
// ];

// // -------------------- Helpers --------------------

// const currency = (n: number) => `৳${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

// function aggregateLastNDays(transactions: ITransaction[], days = 14) {
//     const map = new Map<string, number>();
//     const today = new Date("2025-08-27"); // fixed for deterministic preview
//     for (let i = days - 1; i >= 0; i--) {
//         const d = new Date(today);
//         d.setDate(today.getDate() - i);
//         const key = d.toISOString().slice(0, 10);
//         map.set(key, 0);
//     }

//     transactions.forEach((t) => {
//         const key = t.createdAt.slice(0, 10);
//         if (map.has(key)) map.set(key, (map.get(key) || 0) + t.amount);
//     });

//     return Array.from(map.entries()).map(([date, amount]) => ({ date, amount }));
// }

// const LoadingSkeleton = () => (
//     <div className="space-y-4">
//         {Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg animate-pulse">
//                 <div className="flex items-center gap-3">
//                     <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
//                     <div>
//                         <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
//                         <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                     </div>
//                 </div>
//                 <div className="text-right">
//                     <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
//                     <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                 </div>
//             </div>
//         ))}
//     </div>
// );

// // -------------------- Component --------------------

// export default function AdminDashboardPage() {
//     const [loading] = useState(false); // toggle to true to preview skeletons
//     const [query, setQuery] = useState("");
//     const [page, setPage] = useState(1);
//     const perPage = 5;

//     const users = mockUsers;
//     const transactions = mockTransactions;

//     const totals = useMemo(() => {
//         const totalUsers = users.filter((u) => u.role === "USER").length;
//         const totalAgents = users.filter((u) => u.role === "AGENT").length;
//         const transactionCount = transactions.length;
//         const transactionVolume = transactions.reduce((s, t) => s + t.amount, 0);
//         return { totalUsers, totalAgents, transactionCount, transactionVolume };
//     }, [users, transactions]);

//     const chartData = useMemo(() => aggregateLastNDays(transactions, 14), [transactions]);

//     const filtered = useMemo(() => {
//         if (!query) return transactions;
//         const q = query.toLowerCase();
//         return transactions.filter((t) => {
//             const fromName = users.find((u) => u.id === t.from)?.name || "";
//             const toName = users.find((u) => u.id === t.to)?.name || "";
//             return (
//                 t.id.toLowerCase().includes(q) ||
//                 t.type.toLowerCase().includes(q) ||
//                 fromName.toLowerCase().includes(q) ||
//                 toName.toLowerCase().includes(q) ||
//                 String(t.amount).includes(q)
//             );
//         });
//     }, [query, transactions, users]);

//     const paged = useMemo(() => {
//         const start = (page - 1) * perPage;
//         return filtered.slice(start, start + perPage);
//     }, [page, filtered]);

//     return (
//         <div className="p-4 md:p-6 space-y-6 animate-in fade-in duration-300">
//             <header className="flex items-center justify-between">
//                 <div>
//                     <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Overview of users, agents and transactions</p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                     <input
//                         aria-label="Search"
//                         placeholder="Search txns, users, amounts..."
//                         value={query}
//                         onChange={(e) => { setQuery(e.target.value); setPage(1); }}
//                         className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
//                     />
//                     <Button variant="ghost" onClick={() => { setQuery(""); setPage(1); }}>
//                         Reset
//                     </Button>
//                 </div>
//             </header>

//             {/* Overview cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <Users className="h-5 w-5" /> Users
//                         </CardTitle>
//                         <CardDescription>Total registered users</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-3xl font-bold">{totals.totalUsers}</div>
//                         <div className="text-sm text-muted-foreground mt-1">Active users</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <UserCheck className="h-5 w-5" /> Agents
//                         </CardTitle>
//                         <CardDescription>Total approved agents</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-3xl font-bold">{totals.totalAgents}</div>
//                         <div className="text-sm text-muted-foreground mt-1">Approved agents</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <Activity className="h-5 w-5" /> Transactions
//                         </CardTitle>
//                         <CardDescription>Transactions recorded</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-3xl font-bold">{totals.transactionCount}</div>
//                         <div className="text-sm text-muted-foreground mt-1">Total transactions</div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <DollarSign className="h-5 w-5" /> Volume
//                         </CardTitle>
//                         <CardDescription>Transaction volume (BDT)</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-3xl font-bold">{currency(totals.transactionVolume)}</div>
//                         <div className="text-sm text-muted-foreground mt-1">Since launch (mock)</div>
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* Chart + recent txns */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <Card className="lg:col-span-2">
//                     <CardHeader>
//                         <CardTitle>Transaction Volume (Last 14 days)</CardTitle>
//                         <CardDescription>Daily aggregated amount</CardDescription>
//                     </CardHeader>
//                     <CardContent className="h-64">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
//                                 <defs>
//                                     <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
//                                         <stop offset="5%" stopOpacity={0.8} stopColor="#8884d8" />
//                                         <stop offset="95%" stopOpacity={0.1} stopColor="#8884d8" />
//                                     </linearGradient>
//                                 </defs>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
//                                 <YAxis />
//                                 <Tooltip formatter={(value: number) => currency(value)} />
//                                 <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorAmt)" />
//                             </AreaChart>
//                         </ResponsiveContainer>
//                     </CardContent>
//                 </Card>

//                 {/* <Card>
//                     <CardHeader>
//                         <CardTitle>Recent Transactions</CardTitle>
//                         <CardDescription>Latest activity (paginated)</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         {loading ? (
//                             <LoadingSkeleton />
//                         ) : paged.length === 0 ? (
//                             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                                 <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                                 <p>No transactions found</p>
//                             </div>
//                         ) : (
//                             <div className="space-y-3">
//                                 {paged.map((t) => {
//                                     const from = users.find((u) => u.id === t.from)?.name || "—";
//                                     const to = users.find((u) => u.id === t.to)?.name || "—";

//                                     return (
//                                         <div key={t.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
//                                             <div className="flex items-center gap-3">
//                                                 <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
//                                                     <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//                                                 </div>
//                                                 <div>
//                                                     <div className="font-medium text-gray-900 dark:text-gray-100">{t.type}</div>
//                                                     <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
//                                                         <Clock className="h-3 w-3" />
//                                                         {handleFormateDate(t.createdAt)} • {from} → {to}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="text-right">
//                                                 <div className="font-semibold">{currency(t.amount)}</div>
//                                                 <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
//                                                     <CreditCard className="h-3 w-3" /> {t.id.slice(-6)}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}

//                                 <div className="flex items-center justify-between mt-3">
//                                     <div className="text-sm text-muted-foreground">
//                                         Showing {Math.min((page - 1) * perPage + 1, filtered.length)} - {Math.min(page * perPage, filtered.length)} of {filtered.length}
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <Button variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
//                                         <div className="px-3">{page}</div>
//                                         <Button variant="ghost" onClick={() => setPage((p) => (p * perPage < filtered.length ? p + 1 : p))}>Next</Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </CardContent>
//                 </Card> */}

//                 <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
//                     <CardHeader className="pb-4">
//                         <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-gray-100">
//                             <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
//                                 <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//                             </div>
//                             Recent Transactions
//                         </CardTitle>
//                         <CardDescription className="text-gray-600 dark:text-gray-400">
//                             Latest activity (paginated)
//                         </CardDescription>
//                     </CardHeader>

//                     <CardContent>
//                         {loading ? (
//                             <LoadingSkeleton />
//                         ) : paged.length === 0 ? (
//                             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//                                 <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
//                                 <p>No transactions found</p>
//                             </div>
//                         ) : (
//                             <div className="space-y-3">
//                                 {paged.map((t) => {
//                                     const from = users.find((u) => u.id === t.from)?.name || "—";
//                                     const to = users.find((u) => u.id === t.to)?.name || "—";

//                                     return (
//                                         <div
//                                             key={t.id}
//                                             className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:shadow-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
//                                         >
//                                             {/* Left side */}
//                                             <div className="flex items-center gap-4">
//                                                 <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
//                                                     <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />
//                                                 </div>
//                                                 <div>
//                                                     <div className="flex items-center gap-2 mb-1">
//                                                         <span className="font-medium text-gray-900 dark:text-gray-100">
//                                                             {t.type}
//                                                         </span>
//                                                         <Badge className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
//                                                             {t.status || "Done"}
//                                                         </Badge>
//                                                     </div>
//                                                     <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
//                                                         <span className="flex items-center gap-1">
//                                                             <Clock className="h-3 w-3" />
//                                                             {handleFormateDate(t.createdAt)}
//                                                         </span>
//                                                         <span className="flex items-center gap-1">
//                                                             <User className="h-3 w-3" /> {from} → {to}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Right side */}
//                                             <div className="text-right">
//                                                 <div className="mb-1 font-semibold">
//                                                     {currency(t.amount)}
//                                                 </div>
//                                                 <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
//                                                     <CreditCard className="h-3 w-3" />
//                                                     {t.id.slice(-6)}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}

//                                 {/* Pagination */}
//                                 <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
//                                     <div className="text-sm text-muted-foreground">
//                                         Showing{" "}
//                                         {Math.min((page - 1) * perPage + 1, filtered.length)} -{" "}
//                                         {Math.min(page * perPage, filtered.length)} of {filtered.length}
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <Button
//                                             variant="ghost"
//                                             size="sm"
//                                             disabled={page === 1}
//                                             onClick={() => setPage((p) => Math.max(1, p - 1))}
//                                         >
//                                             Prev
//                                         </Button>
//                                         <div className="px-3">{page}</div>
//                                         <Button
//                                             variant="ghost"
//                                             size="sm"
//                                             disabled={page * perPage >= filtered.length}
//                                             onClick={() =>
//                                                 setPage((p) => (p * perPage < filtered.length ? p + 1 : p))
//                                             }
//                                         >
//                                             Next
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </CardContent>
//                 </Card>

//             </div>

//             <QuickActions />

//             <div className="flex gap-3">
//                 <Button>Manage Users</Button>
//                 <Button>Manage Agents</Button>
//                 <Button>All Transactions</Button>
//                 <Button variant="secondary">System Settings</Button>
//             </div>
//         </div>
//     );
// }




import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllUsersStatsQuery } from '@/redux/features/userApi';
import { handleFormateDate } from "@/utils/handleFormateDate";
import { Activity, Clock, CreditCard, DollarSign, Filter, User, UserCheck, UserIcon, Users } from 'lucide-react';
import { Link } from "react-router";


interface ITransaction {
    _id: string;
    type: "CASH_IN" | "CASH_OUT" | "SEND_MONEY" | string;
    amount: number;
    fee: number;
    agentCommission: number;
    status: "COMPLETED"
    createdAt: string;
    from: string;
    fromName: string;
    fromEmail: string;
    fromPhone: string;
    fromRole: "USER" | "AGENT" | "BANK" | string;
    to: string;
    toName: string;
    toEmail: string;
    toPhone: string;
    toRole: "USER" | "AGENT" | "BANK" | string;
    counterpart: {
        from: string;
        to: string;
    };
}


const AdminDashboardPage = () => {
    //API Calls
    const { data, isLoading: loading, } = useGetAllUsersStatsQuery({ limit: 7 });

    // const users = data?.data?.users;

    const totals = data?.data?.totals;

    const transactions = data?.data?.transactions?.list || [];

    console.log(transactions);

    return (
        <div className="space-y-6">
            <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                Welcome back, {"Admin"}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Activity className="h-4 w-4" />
                                Your wallet overview and recent activity
                            </CardDescription>
                        </div>

                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Users */}
                        <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                                        <Users className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                                    </div>
                                    <span className="text-base font-medium">Users</span>
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                                    Total registered users
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="p-4 rounded-lg border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
                                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totals?.totalUsers.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground mt-1">Active users</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Agents */}
                        <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                        <UserCheck className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                                    </div>
                                    <span className="text-base font-medium">Agents</span>
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                                    Total registered agents
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="p-4 rounded-lg border border-amber-100 dark:border-amber-900/30 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
                                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totals?.totalAgents.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground mt-1">Registered agents</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Transactions */}
                        <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                                        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-base font-medium">Transactions</span>
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                                    Transactions recorded
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
                                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totals?.totalTransactions.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground mt-1">Total transactions</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Volume */}
                        <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                        <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <span className="text-base font-medium">Volume</span>
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                                    Transaction volume (BDT)
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
                                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {/* {currency(1515)} */}
                                        {totals?.totalTransactionVolume.toLocaleString()}
                                        {/* 235 */}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">Since launch</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Manage Users */}
                <Card className="border border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900 hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 group-hover:scale-105 transition-transform duration-200">
                                    <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                                    Manage Users
                                </span>
                            </div>

                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                View, edit or suspend regular users
                            </p>

                            <Link to="/admin/users" aria-label="Manage users">
                                <Button
                                    title="Open Manage Users"
                                    className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    Open
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Manage Agents */}
                <Card className="border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:scale-105 transition-transform duration-200">
                                    <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                                    Manage Agents
                                </span>
                            </div>

                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                Approve/decline agents, view shops & stats
                            </p>

                            <Link to="/admin/agents" aria-label="Manage agents">
                                <Button
                                    title="Open Manage Agents"
                                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    Open
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction History */}
                <Card className="border border-purple-100 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/20 dark:to-gray-900 hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:scale-105 transition-transform duration-200">
                                    <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                                    Transactions
                                </span>
                            </div>

                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                Full transaction list, filters & exports
                            </p>

                            <Link to="/admin/transaction" aria-label="Transaction history">
                                <Button
                                    title="Open Transactions"
                                    className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    View
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile / Settings */}
                <Card className="border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-950/20 dark:to-gray-900 hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform duration-200">
                                    <UserIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                </div>
                                <span className="font-semibold text-base sm:text-lg text-gray-900 dark:text-gray-100">
                                    Profile
                                </span>
                            </div>

                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                View your admin profile & settings
                            </p>

                            <Link to="/admin/profile" aria-label="Admin profile">
                                <Button
                                    title="Open Profile"
                                    className="mt-2 w-full bg-slate-600 hover:bg-slate-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    Open
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent */}
            <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-gray-100">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                            <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        Recent Transactions
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Latest activity
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div className="text-center py-8">Loading...</div>
                    ) : transactions?.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No transactions found</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {transactions?.map((t: ITransaction) => (
                                <div
                                    key={t._id}
                                    className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:shadow-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                                >
                                    {/* Left side */}
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                                            <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                                    {t.type.replace("_", " ")}
                                                </span>
                                                <Badge className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                    {t.status}
                                                </Badge>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {handleFormateDate(t.createdAt)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    {t.fromName} ({t.fromRole}) → {t.toName} ({t.toRole})
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right side */}
                                    <div className="text-right">
                                        <div className="mb-1 font-semibold">{(t.amount)}</div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                            <CreditCard className="h-3 w-3" />
                                            {t._id.slice(-6)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>


        </div>
    );
};

export default AdminDashboardPage;