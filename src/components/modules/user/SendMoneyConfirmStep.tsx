import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner } from '@/components/ui/spinner';
import { AlertCircle } from 'lucide-react';

interface IProps {
    amount: string,
    remainingBalance: string | number,
    receiverData: {
        name: string,
        phoneNumber: string,
        email: string
    },
    handleBackStep: () => void,
    handleSendMoney: () => void,
    sendMoneyLoading: boolean,
}

const SendMoneyConfirmStep = ({ amount, remainingBalance, receiverData, handleBackStep, handleSendMoney, sendMoneyLoading }: IProps) => {
    return (
        <Card className="w-full max-w-[500px] mx-auto bg-card/40">
            <CardHeader>
                <CardTitle className="text-center">Confirm Transfer</CardTitle>
                <CardDescription className="text-center">
                    Verify details before sending
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 ">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <div>Amount</div>
                        <div className="font-medium">৳{amount}</div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <div>Charge</div>
                        <div className="font-medium">৳0</div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                        <div>Total</div>
                        <div>৳{amount}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Remaining balance: <span className="font-medium">৳{remainingBalance}</span>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{receiverData?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">{receiverData?.name}</div>
                        <div className="text-sm text-muted-foreground">{receiverData?.phoneNumber} • {receiverData?.email}</div>
                    </div>
                </div>


                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                        After confirm you can not retrieve money
                    </AlertDescription>
                </Alert>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleBackStep} className="flex-1">Back</Button>

                    <Button onClick={handleSendMoney} disabled={sendMoneyLoading} className=" text-white flex-1"
                    >
                        {sendMoneyLoading ? (
                            <>
                                <LoadingSpinner size="sm" className="mr-2 " />
                                Processing...
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
};

export default SendMoneyConfirmStep;