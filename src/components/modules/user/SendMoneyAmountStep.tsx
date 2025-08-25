/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface IProps {
    walletBalance: number | string,
    amount: string,
    setAmount: (value: string) => void,
    errors: any,
    handleNextStep: () => void
}

const SendMoneyAmountStep = ({ walletBalance, amount, setAmount, errors, handleNextStep }: IProps) => {
    return (
        <Card className="w-full max-w-md mx-auto bg-card/70">
            <CardHeader>
                <CardTitle className="text-center">Send Money</CardTitle>
                <CardDescription className="text-center">
                    Enter the amount you want to send
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
                    <p className="text-2xl font-bold text-green-600">৳
                        {walletBalance?.toLocaleString()}
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="amount">Send Money Amount (৳)</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={errors?.amount ? 'border-red-500' : ''}
                    />
                    {errors.amount && (
                        <p className="text-sm text-red-500">{errors.amount}</p>
                    )}
                </div>

                {/* Quick amount buttons */}
                <div className="grid grid-cols-4 gap-2">
                    {[100, 500, 1000, 5000].map((quickAmount) => (
                        <Button
                            key={quickAmount}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(quickAmount.toString())}
                            className="text-xs"
                        >
                            ৳{quickAmount}
                        </Button>
                    ))}
                </div>

                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                        Send Money limit: ৳10 - ৳50,000 per transaction
                    </AlertDescription>
                </Alert>

                <Button onClick={handleNextStep} className="w-full text-white">
                    Continue
                </Button>
            </CardContent>
        </Card>
    );
};

export default SendMoneyAmountStep;