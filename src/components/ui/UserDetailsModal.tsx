import { closeModal } from "@/redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Status } from "@/types/user.types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { IRole } from "@/types";

// const formatDateTime = (iso?: string) =>
//     iso ? new Date(iso).toLocaleString() : "-";

export function UserDetailsModal() {
    const dispatch = useAppDispatch();

    const { type, data: user } = useAppSelector((state) => state.modal)

    const isOpen = type !== null;

    if (!user) return

    return (
        <Dialog open={isOpen} onOpenChange={() => dispatch(closeModal())}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle className="text-lg">{user.name}</DialogTitle>
                            <div className="text-sm text-muted-foreground">{user.shopName}</div>
                            <div className="text-xs text-muted-foreground">{user.phoneNumber} • {user.email}</div>
                        </div>
                        <div className="ml-auto">
                            <Badge variant={user.status === Status.ACTIVE ? "secondary" : user.status === Status.PENDING ? "outline" : "destructive"}>
                                {user.status.toUpperCase()}
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
                        </TabsList>

                        <TabsContent value="profile">
                            <Card>
                                <CardContent className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-xs text-muted-foreground">Joined</div>
                                        <div className="font-medium">{new Date(user.createdAt).toLocaleString()}</div>
                                    </div>
                                    {user.role === IRole.AGENT &&
                                        <div>
                                            <div className="text-xs text-muted-foreground">Commission</div>
                                            <div className="font-medium">
                                                ৳ {user.commission}
                                            </div>
                                        </div>}
                                    <div>
                                        <div className="text-xs text-muted-foreground">Transactions</div>
                                        <div className="font-medium">
                                            {user.transactionsCount}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground">Volume</div>
                                        <div className="font-medium">

                                            ৳ {user.transactionVolume}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="wallet">
                            <Card>
                                <CardContent className="grid grid-cols-1 gap-2">
                                    <div className="text-xs text-muted-foreground">Balance</div>
                                    <div className="text-2xl font-semibold">
                                        ৳ {user.balance?.toFixed(2)}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="transactions">
                            <div className="space-y-2">
                                {user?.transactions?.length !== 0 && <p className="font-medium text-sm">Recent some transactions..</p>}
                                {user?.transactions?.length === 0 && <p className="text-center">No transactions</p>}
                                {user?.transactions
                                    ?.slice() // Create a copy to avoid mutating original
                                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by createdAt descending for latest first
                                    .slice(0, 7)
                                    .map((tx, i) => (
                                        <div key={tx._id} className="flex items-center justify-between border-b py-2 ">
                                            <div>
                                                <div className="font-medium">
                                                    Tx #{user.transactionsCount as number - i}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {new Date(tx.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="font-medium">৳ {tx.amount.toFixed(0)}</div>
                                        </div>
                                    )) ?? null}
                            </div>
                        </TabsContent>

                    </Tabs>
                </div>

                <DialogFooter className="mt-4 flex items-center justify-between ">
                    <Button variant="outline" onClick={() => dispatch(closeModal())}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}