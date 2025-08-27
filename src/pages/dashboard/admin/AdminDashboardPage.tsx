import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllUsersStatsQuery } from '@/redux/features/userApi';
import { handleFormateDate } from "@/utils/handleFormateDate";
import { Activity, Clock, CreditCard, DollarSign, Filter, User, UserCheck, UserIcon, Users } from 'lucide-react';
import { Link } from "react-router";

export interface ITransaction {
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
    fromRole: "USER" | "AGENT" | string;
    to: string;
    toName: string;
    toEmail: string;
    toPhone: string;
    toRole: "USER" | "AGENT" | string;
    counterpart: {
        from: string;
        to: string;
    };
}


const AdminDashboardPage = () => {
    //API Calls
    const { data, isLoading: loading, } = useGetAllUsersStatsQuery({ limit: 7 });

    const totals = data?.data?.totals;

    const transactions = data?.data?.transactions?.list || [];

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