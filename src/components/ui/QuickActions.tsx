import { Activity, ArrowDownLeft, ArrowUpRight, Banknote, Building2, History, Send, Smartphone } from "lucide-react";
import { Card, CardContent } from "./card";
import { Link } from "react-router";
import { Button } from "./button";

const QuickActions = () => {
    return (
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

                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Add money via agent (cash-in)
                        </p>

                        <Link to='/user/deposit'>
                            <Button className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md transition-all duration-200">
                                Continue
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Cash out Card */}
            <Card className="border border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 hover:shadow-md transition-all duration-200 group">
                <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:scale-105 transition-transform duration-200">
                                <ArrowUpRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">Cash Out</span>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Banknote className="h-4 w-4" />
                            Get cash from nearby agents
                        </p>

                        <Link to={"/user/cash-out"}>
                            <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200">
                                Continue
                            </Button>
                        </Link>
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

                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            Transfer to wallet or phone
                        </p>


                        <Link to={"/user/send-money"}>
                            <Button className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md transition-all duration-200">
                                Continue
                            </Button>
                        </Link>
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

                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            View all transactions & filters
                        </p>

                        <Link to={"/user/transaction"}>
                            <Button className="mt-2 w-full bg-slate-600 hover:bg-slate-700 text-white shadow-sm hover:shadow-md transition-all duration-200">
                                View History
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuickActions;