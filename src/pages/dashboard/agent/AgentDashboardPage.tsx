import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAgentStatsQuery } from "@/redux/features/userApi";
import { Activity, ArrowDownLeft, ArrowUpRight, DollarSign } from "lucide-react";



const AgentDashboardPage = () => {

    const { data, isLoading: loading } = useGetAgentStatsQuery({});
    const agent = data?.data?.agent;
    const summary = data?.data?.summary;
    //   const transactions = data?.data?.transaction || [];

    console.log(summary);

    return (
        <div className="p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
            {/* Head Section */}
            <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                Welcome back, {agent?.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <Activity className="h-4 w-4" />
                                Your agent overview and recent activity
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div className="grid gap-4 sm:grid-cols-3">
                            <Skeleton className="h-28 rounded-xl" />
                            <Skeleton className="h-28 rounded-xl" />
                            <Skeleton className="h-28 rounded-xl" />
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-3">
                            {/* Total Cash In */}
                            <div className="p-6 rounded-lg border border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                        <ArrowDownLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Cash In
                                    </p>
                                    <p className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
                                        ৳{summary.totalCashInHandled.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Total Cash Out */}
                            <div className="p-6 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Cash Out
                                    </p>
                                    <p className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
                                        ৳{summary.totalCashOutHandled.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Total Commission */}
                            <div className="p-6 rounded-lg border border-purple-100 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                        <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Commission
                                    </p>
                                    <p className="text-2xl font-semibold text-purple-700 dark:text-purple-300">
                                        ৳{summary.totalCommissionEarned.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AgentDashboardPage;


// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Activity, ArrowDownLeft, ArrowUpRight, DollarSign, TrendingUp } from "lucide-react";
// import { useState } from "react";

// // Dummy data
// const dummyData = {
//     agent: {
//         name: "Agent Smith",
//     },
//     summaries: {
//         cashInTotal: 15000,
//         cashOutTotal: 8000,
//         totalCommission: 230,
//     },
// };

// const AgentOverviewComponent = () => {
//     const [loading] = useState(false); // Dummy loading state

//     const user = dummyData.user;
//     const summaries = dummyData.summaries;

//     return (
//         <div className="p-4 md:p-6 space-y-6 animate-in fade-in duration-500">
//             {/* Head Section */}
//             <Card className="bg-card/40 shadow-sm hover:shadow-md transition-shadow duration-200">
//                 <CardHeader className="pb-6">
//                     <div className="flex items-center justify-between">
//                         <div className="space-y-2">
//                             <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
//                                 Welcome back, {user?.name}
//                             </CardTitle>
//                             <CardDescription className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                                 <Activity className="h-4 w-4" />
//                                 Your agent overview and recent activity
//                             </CardDescription>
//                         </div>
//                         {/* <Button
//               variant="outline"
//               size="sm"
//               onClick={refetch}
//               className="gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//             >
//               <RefreshCw className="h-4 w-4" />
//               Refresh
//             </Button> */}
//                     </div>
//                 </CardHeader>

//                 <CardContent>
//                     {loading ? (
//                         <div className="grid gap-4 sm:grid-cols-3">
//                             <Skeleton className="h-28 rounded-xl" />
//                             <Skeleton className="h-28 rounded-xl" />
//                             <Skeleton className="h-28 rounded-xl" />
//                         </div>
//                     ) : (
//                         <div className="grid gap-6 md:grid-cols-3">
//                             {/* Total Cash In */}
//                             <div className="p-6 rounded-lg border border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
//                                         <ArrowDownLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
//                                     </div>
//                                 </div>
//                                 <div className="space-y-1">
//                                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                                         Total Cash In
//                                     </p>
//                                     <p className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300">
//                                         ৳{summaries.cashInTotal.toLocaleString()}
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Total Cash Out */}
//                             <div className="p-6 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
//                                         <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
//                                     </div>
//                                 </div>
//                                 <div className="space-y-1">
//                                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                                         Total Cash Out
//                                     </p>
//                                     <p className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
//                                         ৳{summaries.cashOutTotal.toLocaleString()}
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Total Commission */}
//                             <div className="p-6 rounded-lg border border-purple-100 dark:border-purple-900/30 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/20 dark:to-gray-900 hover:shadow-sm transition-all duration-200">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
//                                         <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
//                                     </div>
//                                 </div>
//                                 <div className="space-y-1">
//                                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                                         Total Commission
//                                     </p>
//                                     <p className="text-2xl font-semibold text-purple-700 dark:text-purple-300">
//                                         ৳{summaries.totalCommission.toLocaleString()}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default AgentOverviewComponent;
