/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TableRowSkeleton } from "@/components/ui/TableRowSkeleton";
import { ITransaction } from "@/pages/dashboard/user/UserDashboardPage";
import { handleFormateDate } from "@/utils/handleFormateDate";
// import { ITransaction } from "./UserDashboardPage";

const TransactionTable = ({ transactions, isLoading, isError }: any) => {
    return (
        <Card className="overflow-hidden bg-card/40">
            <CardHeader>
                <CardTitle>Transactions List</CardTitle>
                <CardDescription>
                    View transaction details. Click a row to view more if implemented.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {!isLoading && !isError && transactions && transactions.length === 0 ? (
                    <EmptyState />
                ) : (
                    <Table className="rounded-md border">
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Type</TableHead>
                                {/* <TableHead>Fee</TableHead> */}
                                <TableHead>Amount</TableHead>
                                <TableHead>Direction</TableHead>
                                <TableHead>Commission</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                // Show skeleton rows while loading
                                Array.from({ length: 5 }).map((_, index) => (
                                    <TableRowSkeleton key={index} />
                                ))
                            ) : (
                                transactions?.map((transaction: ITransaction) => {
                                    const initials = transaction.counterpartName
                                        ? transaction.counterpartName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .slice(0, 2)
                                            .join("")
                                        : "B";

                                    return (
                                        <TableRow
                                            key={transaction._id}
                                            className="hover:bg-muted/50 transition-colors"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {/* Initials Avatar */}
                                                    <div className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-white font-semibold">
                                                        {initials.toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="font-medium">{transaction.counterpartName || "Bank"}</div>
                                                        <div className="text-xs text-muted-foreground">{transaction.counterpartPhone || "N/A"}</div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">{transaction.counterpartRole || "Unknown"}</div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm capitalize">{transaction.type}</div>
                                            </TableCell>


                                            <TableCell>
                                                <div className="text-sm">৳ {(transaction.amount as number)}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">{transaction.direction}</div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">৳ {(transaction.agentCommission as number) || 0}</div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="text-sm">{handleFormateDate(transaction.createdAt)}</div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};

export default TransactionTable;