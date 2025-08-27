// import { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router";
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowDownLeft, ArrowUpRight, Send, History, Wallet, ArrowRight, RefreshCw, Search, Filter, CheckCircle, Clock, XCircle
// } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// // ---------- Mock Data ----------
// type TTx = {
//   id: string;
//   type: "DEPOSIT" | "WITHDRAW" | "SEND" | "RECEIVE";
//   amount: number;
//   counterparty?: string;
//   createdAt: string; // ISO
//   status: "COMPLETED" | "PENDING" | "FAILED";
// };

// const MOCK_WALLET = {
//   balance: 12540.75,
//   accountNo: "DW-0192837465",
//   name: "John Doe",
// };

// const MOCK_TXS: TTx[] = [
//   { id: "TXN10021", type: "DEPOSIT", amount: 2000, createdAt: "2025-08-24T09:40:00.000Z", status: "COMPLETED", counterparty: "Agent Rahman" },
//   { id: "TXN10020", type: "SEND", amount: 550, createdAt: "2025-08-24T08:05:00.000Z", status: "COMPLETED", counterparty: "Luka" },
//   { id: "TXN10019", type: "WITHDRAW", amount: 1000, createdAt: "2025-08-24T07:50:26.528Z", status: "PENDING", counterparty: "Agent City Mobile" },
//   { id: "TXN10018", type: "RECEIVE", amount: 800, createdAt: "2025-08-24T06:10:00.000Z", status: "COMPLETED", counterparty: "Mina" },
//   { id: "TXN10017", type: "SEND", amount: 1200, createdAt: "2025-08-23T19:30:00.000Z", status: "FAILED", counterparty: "Arif" },
//   { id: "TXN10016", type: "DEPOSIT", amount: 3000, createdAt: "2025-08-23T16:18:00.000Z", status: "COMPLETED", counterparty: "Agent Digital Point" },
//   { id: "TXN10015", type: "WITHDRAW", amount: 1500, createdAt: "2025-08-23T11:42:00.000Z", status: "COMPLETED", counterparty: "Agent Rahman" },
// ];

// // ---------- Helpers ----------
// const formatBDT = (n: number) => `৳${n.toLocaleString()}`;
// const shortDateTime = (iso: string) =>
//   new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

// const statusBadge = (s: TTx["status"]) => {
//   if (s === "COMPLETED") return <Badge className="gap-1"><CheckCircle className="h-3 w-3" />Completed</Badge>;
//   if (s === "PENDING") return <Badge variant="outline" className="gap-1 text-orange-600 border-orange-600"><Clock className="h-3 w-3" />Pending</Badge>;
//   return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Failed</Badge>;
// };

// const typeIcon = (t: TTx["type"]) => {
//   switch (t) {
//     case "DEPOSIT": return <ArrowDownLeft className="h-4 w-4" />;
//     case "WITHDRAW": return <ArrowUpRight className="h-4 w-4" />;
//     case "SEND": return <Send className="h-4 w-4" />;
//     case "RECEIVE": return <ArrowDownLeft className="h-4 w-4" />;
//   }
// };

// // ---------- Component ----------
// export default function DemoAgent() {
//   const [loading, setLoading] = useState(true);
//   const [txs, setTxs] = useState<TTx[]>([]);
//   const [q, setQ] = useState("");
//   const [tab, setTab] = useState<"ALL" | TTx["type"]>("ALL");
//   const [page, setPage] = useState(1);
//   const pageSize = 5;

//   // simulate initial fetch
//   useEffect(() => {
//     const t = setTimeout(() => {
//       setTxs(MOCK_TXS);
//       setLoading(false);
//     }, 800);
//     return () => clearTimeout(t);
//   }, []);

//   // filters
//   const filtered = useMemo(() => {
//     const byTab = tab === "ALL" ? txs : txs.filter((t) => t.type === tab);
//     const byQ = q.trim()
//       ? byTab.filter(
//         (t) =>
//           t.id.toLowerCase().includes(q.toLowerCase()) ||
//           t.counterparty?.toLowerCase().includes(q.toLowerCase())
//       )
//       : byTab;
//     return byQ.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
//   }, [txs, tab, q]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//   const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

//   useEffect(() => {
//     // reset to page 1 on filter change
//     setPage(1);
//   }, [tab, q]);

//   return (
//     <div className="p-4 md:p-6 space-y-6">
//       {/* Hero / Balance */}
//       <Card className="overflow-hidden">
//         <CardHeader className="pb-0">
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="flex items-center gap-2">
//                 <Wallet className="h-5 w-5" />
//                 Welcome back, {MOCK_WALLET.name}
//               </CardTitle>
//               <CardDescription>Your wallet overview and recent activity</CardDescription>
//             </div>
//             <Button variant="ghost" className="gap-2" onClick={() => setLoading(true)}>
//               <RefreshCw className="h-4 w-4" />
//               Refresh
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="pt-6">
//           {loading ? (
//             <div className="grid gap-4 sm:grid-cols-3">
//               <Skeleton className="h-24 rounded-xl" />
//               <Skeleton className="h-24 rounded-xl" />
//               <Skeleton className="h-24 rounded-xl" />
//             </div>
//           ) : (
//             <div className="grid gap-4 sm:grid-cols-3">
//               <div className="rounded-xl border p-4 bg-muted/30">
//                 <p className="text-sm text-muted-foreground">Wallet Balance</p>
//                 <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
//                   {formatBDT(MOCK_WALLET.balance)}
//                 </p>
//               </div>
//               <div className="rounded-xl border p-4">
//                 <p className="text-sm text-muted-foreground">Account Number</p>
//                 <p className="text-lg font-semibold mt-1">{MOCK_WALLET.accountNo}</p>
//               </div>
//               <div className="rounded-xl border p-4">
//                 <p className="text-sm text-muted-foreground">Today’s Net Change</p>
//                 <p className="text-lg font-semibold mt-1 text-green-600">+ {formatBDT(800)}</p>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Quick Actions */}
//       <div className="grid gap-4 md:grid-cols-4">
//         <Card>
//           <CardContent className="p-4 flex flex-col gap-3">
//             <div className="flex items-center gap-2">
//               <ArrowDownLeft className="h-4 w-4" />
//               <span className="font-semibold">Deposit</span>
//             </div>
//             <p className="text-sm text-muted-foreground">Add money via agent (cash-in)</p>
//             <Button asChild className="mt-auto">
//               <Link to="/user/deposit">
//                 Continue <ArrowRight className="h-4 w-4 ml-2" />
//               </Link>
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4 flex flex-col gap-3">
//             <div className="flex items-center gap-2">
//               <ArrowUpRight className="h-4 w-4" />
//               <span className="font-semibold">Withdraw</span>
//             </div>
//             <p className="text-sm text-muted-foreground">Get cash from nearby agents</p>
//             <Button asChild className="mt-auto" variant="secondary">
//               <Link to="/user/withdraw">
//                 Continue <ArrowRight className="h-4 w-4 ml-2" />
//               </Link>
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4 flex flex-col gap-3">
//             <div className="flex items-center gap-2">
//               <Send className="h-4 w-4" />
//               <span className="font-semibold">Send Money</span>
//             </div>
//             <p className="text-sm text-muted-foreground">Transfer to wallet or phone</p>
//             <Button asChild className="mt-auto" variant="outline">
//               <Link to="/user/send">
//                 Continue <ArrowRight className="h-4 w-4 ml-2" />
//               </Link>
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4 flex flex-col gap-3">
//             <div className="flex items-center gap-2">
//               <History className="h-4 w-4" />
//               <span className="font-semibold">History</span>
//             </div>
//             <p className="text-sm text-muted-foreground">View all transactions & filters</p>
//             <Button asChild className="mt-auto" variant="ghost">
//               <Link to="/user/transactions">
//                 Open <ArrowRight className="h-4 w-4 ml-2" />
//               </Link>
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Transactions */}
//       <Card>
//         <CardHeader className="pb-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle>Recent Transactions</CardTitle>
//               <CardDescription>Filter and review your latest activity</CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {/* Filters */}
//           <div className="grid gap-3 md:grid-cols-3">
//             <div className="col-span-2">
//               <Label htmlFor="search" className="sr-only">Search</Label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="search"
//                   placeholder="Search by ID or name (e.g., TXN10021, Rahman)..."
//                   value={q}
//                   onChange={(e) => setQ(e.target.value)}
//                   className="pl-9"
//                 />
//               </div>
//             </div>
//             <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
//               <TabsList className="grid w-full grid-cols-5">
//                 <TabsTrigger value="ALL">All</TabsTrigger>
//                 <TabsTrigger value="DEPOSIT">Deposit</TabsTrigger>
//                 <TabsTrigger value="WITHDRAW">Withdraw</TabsTrigger>
//                 <TabsTrigger value="SEND">Send</TabsTrigger>
//                 <TabsTrigger value="RECEIVE">Receive</TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>

//           <Separator />

//           {/* List / Skeleton */}
//           {loading ? (
//             <div className="space-y-3">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <div key={i} className="flex items-center justify-between border rounded-lg p-3">
//                   <div className="flex items-center gap-3">
//                     <Skeleton className="h-9 w-9 rounded-full" />
//                     <div>
//                       <Skeleton className="h-4 w-36 mb-2" />
//                       <Skeleton className="h-3 w-24" />
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <Skeleton className="h-4 w-20 mb-2" />
//                     <Skeleton className="h-3 w-28" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <>
//               {visible.length === 0 ? (
//                 <Alert>
//                   <Filter className="h-4 w-4" />
//                   <AlertDescription>No transactions found for the current filters.</AlertDescription>
//                 </Alert>
//               ) : (
//                 <div className="space-y-3">
//                   {visible.map((t) => (
//                     <div key={t.id} className="flex items-center justify-between border rounded-lg p-3">
//                       <div className="flex items-center gap-3">
//                         <div className="h-9 w-9 rounded-full bg-muted/60 flex items-center justify-center">
//                           {typeIcon(t.type)}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <p className="font-semibold">{t.type}</p>
//                             {statusBadge(t.status)}
//                           </div>
//                           <p className="text-sm text-muted-foreground">
//                             {t.counterparty ? `With ${t.counterparty} • ` : ""}{shortDateTime(t.createdAt)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className={`font-semibold ${t.type === "SEND" || t.type === "WITHDRAW" ? "text-red-600" : "text-green-600"}`}>
//                           {t.type === "SEND" || t.type === "WITHDRAW" ? "-" : "+"} {formatBDT(t.amount)}
//                         </p>
//                         <p className="text-xs text-muted-foreground">ID: {t.id}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Pagination */}
//               <div className="flex items-center justify-between pt-2">
//                 <p className="text-sm text-muted-foreground">
//                   Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={page === 1}
//                     onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   >
//                     Prev
//                   </Button>
//                   <span className="text-sm">
//                     Page {page} / {totalPages}
//                   </span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={page === totalPages}
//                     onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                   >
//                     Next
//                   </Button>
//                 </div>
//               </div>
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//     Card, CardContent, CardDescription, CardHeader, CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//     Activity,
//     ArrowDownLeft, ArrowUpRight,
//     CheckCircle, Clock,
//     CreditCard,
//     Filter,
//     Minus,
//     Plus,
//     Search,
//     Send,
//     Star,
//     User,
//     Users,
//     XCircle,
//     Zap
// } from "lucide-react";
// import { useEffect, useMemo, useState } from "react";

// // ---------- Mock Data ----------
// type TTx = {
//     id: string;
//     type: "DEPOSIT" | "WITHDRAW" | "SEND" | "RECEIVE";
//     amount: number;
//     counterparty?: string;
//     createdAt: string; // ISO
//     status: "COMPLETED" | "PENDING" | "FAILED";
// };

// // const MOCK_WALLET = {
// //     balance: 12540.75,
// //     accountNo: "DW-0192837465",
// //     name: "John Doe",
// // };

// const MOCK_TXS: TTx[] = [
//     { id: "TXN10021", type: "DEPOSIT", amount: 2000, createdAt: "2025-08-24T09:40:00.000Z", status: "COMPLETED", counterparty: "Agent Rahman" },
//     { id: "TXN10020", type: "SEND", amount: 550, createdAt: "2025-08-24T08:05:00.000Z", status: "COMPLETED", counterparty: "Luka" },
//     { id: "TXN10019", type: "WITHDRAW", amount: 1000, createdAt: "2025-08-24T07:50:26.528Z", status: "PENDING", counterparty: "Agent City Mobile" },
//     { id: "TXN10018", type: "RECEIVE", amount: 800, createdAt: "2025-08-24T06:10:00.000Z", status: "COMPLETED", counterparty: "Mina" },
//     { id: "TXN10017", type: "SEND", amount: 1200, createdAt: "2025-08-23T19:30:00.000Z", status: "FAILED", counterparty: "Arif" },
//     { id: "TXN10016", type: "DEPOSIT", amount: 3000, createdAt: "2025-08-23T16:18:00.000Z", status: "COMPLETED", counterparty: "Agent Digital Point" },
//     { id: "TXN10015", type: "WITHDRAW", amount: 1500, createdAt: "2025-08-23T11:42:00.000Z", status: "COMPLETED", counterparty: "Agent Rahman" },
// ];

// // ---------- Helpers ----------
// const formatBDT = (n: number) => `৳${n.toLocaleString()}`;
// const shortDateTime = (iso: string) =>
//     new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

// const statusBadge = (s: TTx["status"]) => {
//     if (s === "COMPLETED") return (
//         <Badge className="gap-1.5 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors">
//             <CheckCircle className="h-3 w-3" />
//             Completed
//         </Badge>
//     );
//     if (s === "PENDING") return (
//         <Badge variant="outline" className="gap-1.5 text-amber-600 border-amber-300 bg-amber-50 hover:bg-amber-100 transition-colors animate-pulse">
//             <Clock className="h-3 w-3" />
//             Pending
//         </Badge>
//     );
//     return (
//         <Badge variant="destructive" className="gap-1.5 bg-red-50 text-red-700 border-red-200 hover:bg-red-100 transition-colors">
//             <XCircle className="h-3 w-3" />
//             Failed
//         </Badge>
//     );
// };

// const typeIcon = (t: TTx["type"], size = "h-4 w-4") => {
//     const className = `${size} transition-transform duration-200`;
//     switch (t) {
//         case "DEPOSIT": return <ArrowDownLeft className={`${className} text-green-600`} />;
//         case "WITHDRAW": return <ArrowUpRight className={`${className} text-blue-600`} />;
//         case "SEND": return <Send className={`${className} text-purple-600`} />;
//         case "RECEIVE": return <ArrowDownLeft className={`${className} text-emerald-600`} />;
//     }
// };

// const getTypeGradient = (t: TTx["type"]) => {
//     switch (t) {
//         case "DEPOSIT": return "from-green-400 to-green-600";
//         case "WITHDRAW": return "from-blue-400 to-blue-600";
//         case "SEND": return "from-purple-400 to-purple-600";
//         case "RECEIVE": return "from-emerald-400 to-emerald-600";
//     }
// };

// // ---------- Component ----------
// export default function DemoAgent() {
//     const [loading, setLoading] = useState(true);
//     const [txs, setTxs] = useState<TTx[]>([]);
//     const [q, setQ] = useState("");
//     const [tab, setTab] = useState<"ALL" | TTx["type"]>("ALL");
//     const [page, setPage] = useState(1);
//     // const [balanceVisible, setBalanceVisible] = useState(true);
//     const pageSize = 5;

//     // simulate initial fetch
//     useEffect(() => {
//         const t = setTimeout(() => {
//             setTxs(MOCK_TXS);
//             setLoading(false);
//         }, 800);
//         return () => clearTimeout(t);
//     }, []);

//     // filters
//     const filtered = useMemo(() => {
//         const byTab = tab === "ALL" ? txs : txs.filter((t) => t.type === tab);
//         const byQ = q.trim()
//             ? byTab.filter(
//                 (t) =>
//                     t.id.toLowerCase().includes(q.toLowerCase()) ||
//                     t.counterparty?.toLowerCase().includes(q.toLowerCase())
//             )
//             : byTab;
//         return byQ.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
//     }, [txs, tab, q]);

//     const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//     const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

//     useEffect(() => {
//         // reset to page 1 on filter change
//         setPage(1);
//     }, [tab, q]);

//     return (
//         <div className="p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
//             {/* Hero / Balance */}
//             {/* <Card className="overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
//                 <CardHeader className="pb-0">
//                     <div className="flex items-center justify-between">
//                         <div className="space-y-2">
//                             <CardTitle className="flex items-center gap-3 text-xl">
//                                 <div className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md">
//                                     <Wallet className="h-5 w-5" />
//                                 </div>
//                                 <div>
//                                     <div className="flex items-center gap-2">
//                                         Welcome back, {MOCK_WALLET.name}
//                                         <div className="flex items-center gap-1">
//                                             <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                                             <Shield className="h-4 w-4 text-green-600" />
//                                         </div>
//                                     </div>
//                                     <CardDescription className="flex items-center gap-2 mt-1">
//                                         <Activity className="h-4 w-4 text-green-500 animate-pulse" />
//                                         Your wallet overview and recent activity
//                                     </CardDescription>
//                                 </div>
//                             </CardTitle>
//                         </div>
//                         <Button
//                             variant="ghost"
//                             className="gap-2 hover:scale-105 transition-transform duration-200"
//                             onClick={() => setLoading(true)}
//                         >
//                             <RefreshCw className="h-4 w-4" />
//                             Refresh
//                         </Button>
//                     </div>
//                 </CardHeader>
//                 <CardContent className="pt-6">
//                     {loading ? (
//                         <div className="grid gap-4 sm:grid-cols-3">
//                             <Skeleton className="h-28 rounded-xl animate-pulse" />
//                             <Skeleton className="h-28 rounded-xl animate-pulse" />
//                             <Skeleton className="h-28 rounded-xl animate-pulse" />
//                         </div>
//                     ) : (
//                         <div className="grid gap-4 sm:grid-cols-3">
//                             <div className="rounded-xl border border-blue-200 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 hover:shadow-lg transition-all duration-300 group">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                                             <DollarSign className="h-3 w-3" />
//                                             Wallet Balance
//                                         </p>
//                                         <div className="flex items-center gap-2 mt-1">
//                                             <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400 transition-all duration-300 ${balanceVisible ? '' : 'blur-sm'}`}>
//                                                 {balanceVisible ? formatBDT(MOCK_WALLET.balance) : '৳••••••'}
//                                             </p>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 onClick={() => setBalanceVisible(!balanceVisible)}
//                                                 className="p-1 h-6 w-6 hover:scale-110 transition-transform"
//                                             >
//                                                 {balanceVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
//                                             </Button>
//                                         </div>
//                                     </div>
//                                     <TrendingUp className="h-8 w-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
//                                 </div>
//                             </div>

//                             <div className="rounded-xl border border-purple-200 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 hover:shadow-lg transition-all duration-300 group">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                                             <CreditCard className="h-3 w-3" />
//                                             Account Number
//                                         </p>
//                                         <p className="text-lg font-semibold mt-1 font-mono">{MOCK_WALLET.accountNo}</p>
//                                     </div>
//                                     <User className="h-8 w-8 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
//                                 </div>
//                             </div>

//                             <div className="rounded-xl border border-green-200 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 hover:shadow-lg transition-all duration-300 group">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                                             <Calendar className="h-3 w-3" />
//                                             Today's Net Change
//                                         </p>
//                                         <div className="flex items-center gap-1 mt-1">
//                                             <TrendingUp className="h-4 w-4 text-green-600" />
//                                             <p className="text-lg font-semibold text-green-600">+ {formatBDT(800)}</p>
//                                         </div>
//                                     </div>
//                                     <Target className="h-8 w-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </CardContent>
//             </Card> */}

//             {/* Quick Actions */}
//             {/* <div className="grid gap-4 md:grid-cols-4">
//                 <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
//                     <CardContent className="p-4 flex flex-col gap-3">
//                         <div className="flex items-center gap-3">
//                             <div className={`p-2 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
//                                 <ArrowDownLeft className="h-4 w-4" />
//                             </div>
//                             <span className="font-semibold">Deposit</span>
//                         </div>
//                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                             <Building2 className="h-3 w-3" />
//                             Add money via agent (cash-in)
//                         </p>
//                         <Button className="mt-auto group-hover:scale-105 transition-transform duration-200 bg-green-600 hover:bg-green-700">
//                             <Plus className="h-4 w-4 mr-2" />
//                             Continue
//                             <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
//                         </Button>
//                     </CardContent>
//                 </Card>

//                 <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
//                     <CardContent className="p-4 flex flex-col gap-3">
//                         <div className="flex items-center gap-3">
//                             <div className={`p-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
//                                 <ArrowUpRight className="h-4 w-4" />
//                             </div>
//                             <span className="font-semibold">Withdraw</span>
//                         </div>
//                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                             <Banknote className="h-3 w-3" />
//                             Get cash from nearby agents
//                         </p>
//                         <Button className="mt-auto group-hover:scale-105 transition-transform duration-200" variant="secondary">
//                             <Minus className="h-4 w-4 mr-2" />
//                             Continue
//                             <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
//                         </Button>
//                     </CardContent>
//                 </Card>

//                 <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
//                     <CardContent className="p-4 flex flex-col gap-3">
//                         <div className="flex items-center gap-3">
//                             <div className={`p-2 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
//                                 <Send className="h-4 w-4" />
//                             </div>
//                             <span className="font-semibold">Send Money</span>
//                         </div>
//                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                             <Smartphone className="h-3 w-3" />
//                             Transfer to wallet or phone
//                         </p>
//                         <Button className="mt-auto group-hover:scale-105 transition-transform duration-200" variant="outline">
//                             <Zap className="h-4 w-4 mr-2" />
//                             Continue
//                             <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
//                         </Button>
//                     </CardContent>
//                 </Card>

//                 <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20">
//                     <CardContent className="p-4 flex flex-col gap-3">
//                         <div className="flex items-center gap-3">
//                             <div className={`p-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
//                                 <History className="h-4 w-4" />
//                             </div>
//                             <span className="font-semibold">History</span>
//                         </div>
//                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                             <Globe className="h-3 w-3" />
//                             View all transactions & filters
//                         </p>
//                         <Button className="mt-auto group-hover:scale-105 transition-transform duration-200" variant="ghost">
//                             <Activity className="h-4 w-4 mr-2" />
//                             Open
//                             <ArrowRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
//                         </Button>
//                     </CardContent>
//                 </Card>
//             </div> */}

//             {/* Recent Transactions */}
//             <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardHeader className="pb-2">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <CardTitle className="flex items-center gap-2">
//                                 <Activity className="h-5 w-5 text-blue-600" />
//                                 Recent Transactions
//                             </CardTitle>
//                             <CardDescription className="flex items-center gap-1">
//                                 <Filter className="h-3 w-3" />
//                                 Filter and review your latest activity
//                             </CardDescription>
//                         </div>
//                     </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     {/* Filters */}
//                     <div className="grid gap-3 md:grid-cols-3">
//                         <div className="col-span-2">
//                             <Label htmlFor="search" className="sr-only">Search</Label>
//                             <div className="relative group">
//                                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
//                                 <Input
//                                     id="search"
//                                     placeholder="Search by ID or name (e.g., TXN10021, Rahman)..."
//                                     value={q}
//                                     onChange={(e) => setQ(e.target.value)}
//                                     className="pl-9 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                                 />
//                             </div>
//                         </div>
//                         <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
//                             <TabsList className="grid w-full grid-cols-5 bg-muted/50">
//                                 <TabsTrigger value="ALL" className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
//                                     <Users className="h-3 w-3 mr-1" />
//                                     All
//                                 </TabsTrigger>
//                                 <TabsTrigger value="DEPOSIT" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:shadow-sm transition-all">
//                                     <Plus className="h-3 w-3 mr-1" />
//                                     Deposit
//                                 </TabsTrigger>
//                                 <TabsTrigger value="WITHDRAW" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm transition-all">
//                                     <Minus className="h-3 w-3 mr-1" />
//                                     Withdraw
//                                 </TabsTrigger>
//                                 <TabsTrigger value="SEND" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm transition-all">
//                                     <Send className="h-3 w-3 mr-1" />
//                                     Send
//                                 </TabsTrigger>
//                                 <TabsTrigger value="RECEIVE" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm transition-all">
//                                     <ArrowDownLeft className="h-3 w-3 mr-1" />
//                                     Receive
//                                 </TabsTrigger>
//                             </TabsList>
//                         </Tabs>
//                     </div>

//                     <Separator />

//                     {/* List / Skeleton */}
//                     {loading ? (
//                         <div className="space-y-3">
//                             {Array.from({ length: 5 }).map((_, i) => (
//                                 <div key={i} className="flex items-center justify-between border rounded-lg p-3 animate-pulse">
//                                     <div className="flex items-center gap-3">
//                                         <Skeleton className="h-12 w-12 rounded-full" />
//                                         <div>
//                                             <Skeleton className="h-4 w-36 mb-2" />
//                                             <Skeleton className="h-3 w-24" />
//                                         </div>
//                                     </div>
//                                     <div className="text-right">
//                                         <Skeleton className="h-4 w-20 mb-2" />
//                                         <Skeleton className="h-3 w-28" />
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <>
//                             {visible.length === 0 ? (
//                                 <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
//                                     <Filter className="h-4 w-4" />
//                                     <AlertDescription>No transactions found for the current filters.</AlertDescription>
//                                 </Alert>
//                             ) : (
//                                 <div className="space-y-3">
//                                     {visible.map((t, i) => (
//                                         <div
//                                             key={t.id}
//                                             className="flex items-center justify-between border rounded-lg p-3 hover:shadow-md hover:bg-muted/20 transition-all duration-200 group"
//                                             style={{ animationDelay: `${i * 100}ms` }}
//                                         >
//                                             <div className="flex items-center gap-3">
//                                                 <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${getTypeGradient(t.type)} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
//                                                     {typeIcon(t.type, "h-5 w-5")}
//                                                 </div>
//                                                 <div>
//                                                     <div className="flex items-center gap-2">
//                                                         <p className="font-semibold flex items-center gap-1">
//                                                             {t.type}
//                                                             {t.type === "SEND" && <Zap className="h-3 w-3 text-purple-500" />}
//                                                             {t.type === "RECEIVE" && <Star className="h-3 w-3 text-emerald-500" />}
//                                                         </p>
//                                                         {statusBadge(t.status)}
//                                                     </div>
//                                                     <p className="text-sm text-muted-foreground flex items-center gap-1">
//                                                         {t.counterparty && (
//                                                             <>
//                                                                 <User className="h-3 w-3" />
//                                                                 {`With ${t.counterparty} • `}
//                                                             </>
//                                                         )}
//                                                         <Clock className="h-3 w-3" />
//                                                         {shortDateTime(t.createdAt)}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="text-right">
//                                                 <p className={`font-semibold flex items-center gap-1 ${t.type === "SEND" || t.type === "WITHDRAW" ? "text-red-600" : "text-green-600"}`}>
//                                                     {t.type === "SEND" || t.type === "WITHDRAW" ? (
//                                                         <Minus className="h-4 w-4" />
//                                                     ) : (
//                                                         <Plus className="h-4 w-4" />
//                                                     )}
//                                                     {t.type === "SEND" || t.type === "WITHDRAW" ? "-" : "+"} {formatBDT(t.amount)}
//                                                 </p>
//                                                 <p className="text-xs text-muted-foreground flex items-center gap-1">
//                                                     <CreditCard className="h-3 w-3" />
//                                                     ID: {t.id}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}

//                             {/* Pagination */}
//                             <div className="flex items-center justify-between pt-2">
//                                 <p className="text-sm text-muted-foreground flex items-center gap-1">
//                                     <Activity className="h-3 w-3" />
//                                     Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length}
//                                 </p>
//                                 <div className="flex items-center gap-2">
//                                     <Button
//                                         variant="outline"
//                                         size="sm"
//                                         disabled={page === 1}
//                                         onClick={() => setPage((p) => Math.max(1, p - 1))}
//                                         className="hover:scale-105 transition-transform duration-200"
//                                     >
//                                         <ArrowDownLeft className="h-3 w-3 mr-1 rotate-90" />
//                                         Prev
//                                     </Button>
//                                     <span className="text-sm font-medium px-2">
//                                         Page {page} / {totalPages}
//                                     </span>
//                                     <Button
//                                         variant="outline"
//                                         size="sm"
//                                         disabled={page === totalPages}
//                                         onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                                         className="hover:scale-105 transition-transform duration-200"
//                                     >
//                                         Next
//                                         <ArrowUpRight className="h-3 w-3 ml-1 rotate-90" />
//                                     </Button>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }



import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Activity,
    Calendar,
    CreditCard,
    DollarSign,
    Eye,
    EyeOff,
    RefreshCw,
    TrendingUp,
    User,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    Send,
    History,
    Building2,
    Banknote,
    Smartphone,
    Search,
    Plus,
    Minus,
    Clock,
    ChevronLeft,
    ChevronRight,
    Filter
} from "lucide-react";

const UserDashboard = () => {
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Replace this with your actual API call: const { data, loading } = useGetUserStatsQuery({});
    const loading = false;

    // Mock data matching your API structure
    const data = {
        statusCode: 200,
        success: true,
        data: {
            user: {
                name: "neymar",
                email: "neymar@gmail.com",
                phoneNumber: "01298756778"
            },
            wallet: {
                balance: 6570.30,
                totalSent: 3900,
                totalReceived: 11
            },
            transaction: [
                {
                    _id: "68adc57e6090582fb67cb984",
                    type: "CASH_IN",
                    amount: 11,
                    status: "COMPLETED",
                    createdAt: "2025-08-26T14:32:30.410Z",
                    fromName: "Luka",
                    toName: "neymar",
                    direction: "RECEIVED",
                    counterpartRole: "AGENT"
                },
                {
                    _id: "68adb36bc69a55e95ab0c844",
                    type: "CASH_OUT",
                    amount: 1000,
                    status: "COMPLETED",
                    createdAt: "2025-08-26T13:15:23.013Z",
                    fromName: "neymar",
                    toName: "tom",
                    direction: "SENT",
                    counterpartRole: "AGENT"
                },
                {
                    _id: "68adb170c69a55e95ab0c7f2",
                    type: "SEND_MONEY",
                    amount: 100,
                    status: "COMPLETED",
                    createdAt: "2025-08-26T13:06:56.251Z",
                    fromName: "neymar",
                    toName: "Cristiano Ronaldo",
                    direction: "SENT",
                    counterpartRole: "USER"
                },
                {
                    _id: "68adb0f2c69a55e95ab0c7d4",
                    type: "SEND_MONEY",
                    amount: 500,
                    status: "COMPLETED",
                    createdAt: "2025-08-26T13:04:50.093Z",
                    fromName: "neymar",
                    toName: "Cristiano Ronaldo",
                    direction: "SENT",
                    counterpartRole: "USER"
                },
                {
                    _id: "68ad985ca0da54d3f8416a58",
                    type: "SEND_MONEY",
                    amount: 500,
                    status: "COMPLETED",
                    createdAt: "2025-08-26T11:19:56.132Z",
                    fromName: "neymar",
                    toName: "Cristiano Ronaldo",
                    direction: "SENT",
                    counterpartRole: "USER"
                },
                {
                    _id: "68adb118c69a55e95ab0c7e3",
                    type: "CASH_OUT",
                    amount: 100,
                    status: "COMPLETED",
                    createdAt: "2025-08-26T13:05:28.786Z",
                    fromName: "neymar",
                    toName: "Mahinur",
                    direction: "SENT",
                    counterpartRole: "AGENT"
                }
            ]
        }
    };

    const user = data?.data?.user;
    const wallet = data?.data?.wallet;
    const transactions = data?.data?.transaction || [];

    // Helper functions for transactions
    const mapTransactionType = (type) => {
        const typeMap = {
            'CASH_IN': 'DEPOSIT',
            'CASH_OUT': 'WITHDRAW',
            'SEND_MONEY': 'SEND'
        };
        return typeMap[type] || type;
    };

    const getTransactionIcon = (type) => {
        const mappedType = mapTransactionType(type);
        const icons = {
            DEPOSIT: ArrowDownLeft,
            WITHDRAW: ArrowUpRight,
            SEND: Send,
            RECEIVE: ArrowDownLeft
        };
        const Icon = icons[mappedType] || Activity;
        return <Icon className="h-4 w-4" />;
    };

    const getTransactionColor = (type) => {
        const mappedType = mapTransactionType(type);
        const colors = {
            DEPOSIT: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
            WITHDRAW: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
            SEND: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
            RECEIVE: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        };
        return colors[mappedType] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    };

    const getStatusBadge = (status) => {
        const variants = {
            COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
            FAILED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        };

        return (
            <Badge className={`text-xs ${variants[status] || variants.PENDING}`}>
                {status}
            </Badge>
        );
    };

    const formatAmount = (amount, direction) => {
        const isDebit = direction === "SENT";
        const prefix = isDebit ? "-" : "+";
        const colorClass = isDebit ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400";

        return (
            <span className={`font-semibold ${colorClass}`}>
                {prefix}৳{amount.toLocaleString()}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter transactions
    const filteredTransactions = transactions.filter(transaction => {
        const transactionId = transaction._id?.toLowerCase() || '';
        const counterpartyName = (transaction.direction === "SENT" ? transaction.toName : transaction.fromName)?.toLowerCase() || '';

        const matchesSearch = transactionId.includes(searchQuery.toLowerCase()) ||
            counterpartyName.includes(searchQuery.toLowerCase());

        const mappedType = mapTransactionType(transaction.type);
        const matchesTab = activeTab === "ALL" || mappedType === activeTab;

        return matchesSearch && matchesTab;
    });

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + pageSize);

    // Action handlers
    const handleDeposit = () => console.log("Deposit clicked");
    const handleWithdraw = () => console.log("Withdraw clicked");
    const handleSendMoney = () => console.log("Send Money clicked");
    const handleViewHistory = () => console.log("View History clicked");

    // Loading skeleton
    const LoadingSkeleton = () => (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        <div>
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* User Stats Overview */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                Welcome back, {user?.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Activity className="h-4 w-4" />
                                Your wallet overview and recent activity
                            </CardDescription>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Wallet Balance */}
                        <div className="p-6 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 hover:shadow-sm transition-shadow duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setBalanceVisible(!balanceVisible)}
                                    className="p-1 h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                </Button>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Wallet Balance
                                </p>
                                <p className={`text-2xl font-semibold text-blue-700 dark:text-blue-300 transition-all duration-300 ${balanceVisible ? '' : 'blur-sm'}`}>
                                    {balanceVisible ? `৳${wallet?.balance?.toLocaleString()}` : '৳••••••'}
                                </p>
                            </div>
                        </div>

                        {/* Account Number */}
                        <div className="p-6 rounded-lg border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-950/20 dark:to-gray-900 hover:shadow-sm transition-shadow duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                                    <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Phone Number
                                </p>
                                <p className="text-xl font-medium font-mono text-gray-900 dark:text-gray-100">
                                    {user?.phoneNumber}
                                </p>
                            </div>
                        </div>

                        {/* Total Transactions */}
                        <div className="p-6 rounded-lg border border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900 hover:shadow-sm transition-shadow duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Transactions
                                </p>
                                <p className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
                                    {transactions?.length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Cards */}
            <div className="grid gap-6 md:grid-cols-4">
                {/* Deposit Card */}
                <Card className="border border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900 hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 group-hover:scale-105 transition-transform duration-200">
                                    <ArrowDownLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-gray-100">Deposit</span>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Add money via agent (cash-in)
                            </p>

                            <Button
                                className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                onClick={handleDeposit}
                            >
                                Continue
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Withdraw Card */}
                <Card className="border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:scale-105 transition-transform duration-200">
                                    <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-gray-100">Withdraw</span>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Get cash from nearby agents
                            </p>

                            <Button
                                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                onClick={handleWithdraw}
                            >
                                Continue
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Send Money Card */}
                <Card className="border border-purple-100 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/20 dark:to-gray-900 hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:scale-105 transition-transform duration-200">
                                    <Send className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-gray-100">Send Money</span>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Transfer to wallet or phone
                            </p>

                            <Button
                                className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                onClick={handleSendMoney}
                            >
                                Continue
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* History Card */}
                <Card className="border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-950/20 dark:to-gray-900 hover:shadow-md transition-all duration-200 group">
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform duration-200">
                                    <History className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-gray-100">History</span>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                View all transactions & filters
                            </p>

                            <Button
                                className="mt-2 w-full bg-slate-600 hover:bg-slate-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                                onClick={handleViewHistory}
                            >
                                View History
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction List */}
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-gray-100">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                            <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        Recent Transactions
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Filter and review your latest activity
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Search and Filters */}
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by ID or name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-5 bg-gray-50 dark:bg-gray-800">
                                <TabsTrigger value="ALL" className="text-xs">All</TabsTrigger>
                                <TabsTrigger value="DEPOSIT" className="text-xs">Deposit</TabsTrigger>
                                <TabsTrigger value="WITHDRAW" className="text-xs">Withdraw</TabsTrigger>
                                <TabsTrigger value="SEND" className="text-xs">Send</TabsTrigger>
                                <TabsTrigger value="RECEIVE" className="text-xs">Receive</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Transaction List */}
                    {loading ? (
                        <LoadingSkeleton />
                    ) : filteredTransactions.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No transactions found</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {paginatedTransactions.map((transaction) => {
                                const counterpartyName = transaction.direction === "SENT" ? transaction.toName : transaction.fromName;
                                const mappedType = mapTransactionType(transaction.type);

                                return (
                                    <div
                                        key={transaction._id}
                                        className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:shadow-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${getTransactionColor(transaction.type)}`}>
                                                {getTransactionIcon(transaction.type)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                                        {mappedType}
                                                    </span>
                                                    {getStatusBadge(transaction.status)}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {counterpartyName && (
                                                        <span className="flex items-center gap-1">
                                                            <User className="h-3 w-3" />
                                                            {counterpartyName}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {formatDate(transaction.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="mb-1">
                                                {formatAmount(transaction.amount, transaction.direction)}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <CreditCard className="h-3 w-3" />
                                                {transaction._id.slice(-6)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredTransactions.length > pageSize && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {startIndex + 1}-{Math.min(startIndex + pageSize, filteredTransactions.length)} of {filteredTransactions.length}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Prev
                                </Button>
                                <span className="text-sm text-gray-600 dark:text-gray-400 px-3">
                                    {currentPage} / {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserDashboard;