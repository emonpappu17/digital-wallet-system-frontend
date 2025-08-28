import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHomeTableSkeleton from "@/components/ui/DashboardHomeTableSkeleton";
import QuickActions from "@/components/ui/QuickActions";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserStatsQuery } from "@/redux/features/userApi";
import { handleFormateDate } from "@/utils/handleFormateDate";
import { Activity, ArrowDownLeft, ArrowUpRight, Clock, CreditCard, DollarSign, Eye, EyeOff, Filter, Send, TrendingUp, User } from "lucide-react";
import { useState } from "react";

type ITnxType = "CASH_IN" | "CASH_OUT" | "SEND_MONEY" | "ADD_MONEY"
export type UserRole = "USER" | "AGENT";
export type TransactionDirection = "SENT" | "RECEIVED";
type MappedType = "CASH_IN" | "CASH_OUT" | "SEND_MONEY";

export interface ITransaction {
  _id: string;
  type: ITnxType;
  amount: number;
  status: "COMPLETED";
  createdAt: string; // ISO date string

  from: string;
  fromName: string;
  fromEmail: string;
  fromRole: UserRole;

  to: string;
  toName: string;
  toEmail: string;
  toRole: UserRole;
  agentCommission?: number,
  counterpartName: string,
  counterpartPhone: string,
  counterpartRole: UserRole;
  direction: TransactionDirection;
}


const UserDashboardPage = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  //API Calls
  const { data, isLoading: loading, } = useGetUserStatsQuery({ limit: 7 });

  const user = data?.data?.user;
  const wallet = data?.data?.wallet;
  const transactions = data?.data?.transaction || [];

  console.log(transactions);

  // Helper functions for transactions
  const mapTransactionType = (type: ITnxType): MappedType => {
    const typeMap: Record<ITnxType, MappedType> = {
      'CASH_IN': 'CASH_IN',
      'CASH_OUT': 'CASH_OUT',
      'SEND_MONEY': 'SEND_MONEY',
      "ADD_MONEY": "CASH_IN"
    };
    return typeMap[type] || type;
  };

  const getTransactionIcon = (type: ITnxType) => {
    const mappedType = mapTransactionType(type);
    const icons = {
      CASH_IN: ArrowDownLeft,
      CASH_OUT: ArrowUpRight,
      SEND_MONEY: Send,
      // CASH_IN: ArrowDownLeft
    };
    const Icon = icons[mappedType] || Activity;
    return <Icon className="h-4 w-4" />;
  };

  const getTransactionColor = (type: ITnxType) => {
    const mappedType = mapTransactionType(type);
    const colors = {
      CASH_IN: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      CASH_OUT: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      SEND_MONEY: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      // RECEIVE: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
    };
    return colors[mappedType] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  };

  const formatAmount = (amount: number, direction: string) => {
    const isDebit = direction === "SENT";
    const prefix = isDebit ? "-" : "+";
    const colorClass = isDebit ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400";

    return (
      <span className={`font-semibold ${colorClass}`}>
        {prefix}৳{amount.toLocaleString()}
      </span>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
      {/* Head Section */}
      <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
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
          </div>
        </CardHeader>

        <CardContent>
          {loading ?
            (<div className="grid gap-4 sm:grid-cols-3">
              <Skeleton className="h-28 rounded-xl" />
              <Skeleton className="h-28 rounded-xl" />
              <Skeleton className="h-28 rounded-xl" />
            </div>) :
            (<div className="grid gap-6 md:grid-cols-3">
              {/* Wallet Balance */}
              <div className="p-6 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
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
              <div className="p-6 rounded-lg border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Account Number
                  </p>
                  <p className="text-xl font-medium font-mono text-gray-900 dark:text-gray-100">
                    {user?.phoneNumber}
                  </p>
                </div>
              </div>

              {/* Total Transactions */}
              <div className="p-6 rounded-lg border border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Transactions
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {data?.data?.transaction?.length || 0}
                  </p>
                </div>
              </div>
            </div>)}


        </CardContent>
      </Card>

      {/* Quick Actions */}
      <QuickActions></QuickActions>


      {/* Transaction List */}
      <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-gray-100">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            Recent some transactions
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Review your latest activity
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Transaction List */}
          {loading ? (
            <DashboardHomeTableSkeleton />
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No transactions found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction: ITransaction) => {
                const counterpartyName = transaction.direction === "SENT" ? transaction.toName : transaction.fromName;
                const mappedType = mapTransactionType(transaction.type);

                return (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:shadow-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getTransactionColor(transaction.type)}`}>
                        {getTransactionIcon(transaction.type as ITnxType)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {mappedType}
                          </span>

                          <Badge className={`text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`}>
                            {transaction.status}
                          </Badge>
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

                            {handleFormateDate(transaction.createdAt)}
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

        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboardPage;