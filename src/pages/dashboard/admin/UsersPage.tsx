/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionButtonWithConfirm } from "@/components/ui/ConfirmButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserDetailsModal } from "@/components/ui/UserDetailsModal";
import { openModal } from "@/redux/features/modalSlice";
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from "@/redux/features/userApi";
import { useAppDispatch } from "@/redux/hook";
import { TUser } from "@/types";
import { Status } from "@/types/user.types";
import { motion } from "framer-motion";
import { CheckCircle, Eye, XCircle } from "lucide-react";
import { toast } from "sonner";

const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString() + " " + new Date(iso).toLocaleTimeString() : "-";

const UsersPage = () => {
    const dispatch = useAppDispatch();

    //API Calls
    const { data, } = useGetAllUsersQuery({});
    const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
    const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();

    // const totalPages = data?.meta?.totalPages || 1;
    const apiUsers = data?.data?.users;
    // const statistics = data?.data?.statistics;

    console.log(apiUsers);

    const handleUnblock = async (userId: string | undefined) => {
        const toastId = toast.loading("Unblocking User...")
        try {
            await unblockUser(userId).unwrap();
            toast.success(`User unblock successfully`, { id: toastId });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to unblock", { id: toastId });
        }
    }

    const handleBlock = async (userId: string | undefined) => {
        const toastId = toast.loading("Blocking User...")
        try {
            await blockUser(userId).unwrap();
            toast.success(`User blocked successfully`, { id: toastId });
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Failed to block", { id: toastId });
        }
    }
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 p-2 md:p-4">
            {/* Agents Table */}
            <Card className="overflow-hidden">
                <CardHeader>
                    <CardTitle>Users List</CardTitle>
                    <CardDescription>Block or Unblock users. Click an user to view details.</CardDescription>
                </CardHeader>

                <CardContent>
                    {/* {!isLoading && !isError && apiAgents && apiAgents.length === 0 ? (
                               <EmptyState />
                           ) : (
                            // Table Here
                           )} */}

                    <Table className="rounded-md border">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Users</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Transactions</TableHead>
                                <TableHead>Volume</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {isLoading ? (
                                // Show skeleton rows while loading
                                Array.from({ length: limit }).map((_, index) => (
                                    <TableRowSkeleton key={index} />
                                ))
                            ) : (
                            // Row Here
                            )} */}

                            {
                                apiUsers?.map((user: TUser) => (
                                    <TableRow key={user._id} className="hover:bg-muted/5">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src="https://github.com/shadcn.png" />
                                                    <AvatarFallback>{user.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{user.phoneNumber}</div>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant={user.status === Status.ACTIVE ? "secondary" : "destructive"}>
                                                {user.status.toUpperCase()}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm">{formatDate(user.createdAt)}</div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm">
                                                {user.transactionsCount}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm">
                                                {`৳ ${user.transactionVolume}`}
                                            </div>
                                        </TableCell>


                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {(user.status === Status.BLOCKED) && (
                                                    <ActionButtonWithConfirm
                                                        icon={<CheckCircle className="h-4 w-4 text-white" />}
                                                        title="Unblock"
                                                        dialogTitle="Are you absolutely sure?"
                                                        dialogDescription={`Are you sure you want to unblock ${user?.name}? They will become an active user and gain access to the user dashboard all activities.`}
                                                        onConfirm={() => handleUnblock(user._id)}
                                                    // disabled={isApproving || isSuspending}
                                                    />
                                                )}
                                                {user.status === Status.ACTIVE && (
                                                    <ActionButtonWithConfirm
                                                        icon={<XCircle className="h-4 w-4 text-white" />}
                                                        title="Block"
                                                        variant="destructive"
                                                        dialogTitle="Are you absolutely sure?"
                                                        dialogDescription={`Are you sure you want to block ${user?.name}? They will become a block user and cannot perform some actions.`}
                                                        onConfirm={() => handleBlock(user._id)}
                                                        disabled={isBlocking || isUnblocking}
                                                    />
                                                )}

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => dispatch(openModal({ type: "user", data: user }))}
                                                    title="View"
                                                    disabled={isBlocking || isUnblocking}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <UserDetailsModal />
        </motion.div>
    );
};

export default UsersPage;