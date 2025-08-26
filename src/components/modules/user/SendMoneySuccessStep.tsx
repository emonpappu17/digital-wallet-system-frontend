import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { handleFormateDate } from '@/utils/handleFormateDate';
import { BadgeCheckIcon, CheckCircle } from 'lucide-react';



interface IProps {
    amount: string,
    sendMoneyData: {
        createdAt: string
    },
    receiverData: {
        name: string
    }
    walletBalance: string | number,
    handleSendAgain: () => void,
}

const SendMoneySuccessStep = ({ sendMoneyData, amount, walletBalance, receiverData, handleSendAgain }: IProps) => {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />

                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-green-600">Send money successful</h2>
                        <p className="text-sm text-muted-foreground">Your send money has been completed successfully</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 text-left">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Time</span>
                                <span className="font-mono">{handleFormateDate(sendMoneyData?.createdAt)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Transaction ID</span>
                                <span className="font-mono">SND1756187898469</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Amount</span>
                                <span className="font-semibold">{amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Charge</span>
                                <span className="font-semibold">0</span>
                            </div>
                            <div className="flex justify-between">
                                <span>New amount </span>
                                <span className="font-semibold">{walletBalance}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Receiver</span>
                                <span className="font-semibold">{receiverData?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <Badge
                                    variant="secondary"
                                    className="bg-blue-500 text-white dark:bg-blue-600"
                                >
                                    <BadgeCheckIcon />
                                    Completed
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 w-full">
                        <Button className="w-full text-white" onClick={() => window.history.back()}>Go to Dashboard</Button>
                        <Button
                            onClick={handleSendAgain}
                            variant="outline"
                            className="w-full"
                        >Send Again</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SendMoneySuccessStep;