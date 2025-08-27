import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useDepositMoneyMutation } from '@/redux/features/transactionApi';
import { useGetMyWalletQuery } from '@/redux/features/walletApi';
import { handleFormateDate } from '@/utils/handleFormateDate';
import { AlertCircle, ArrowLeft, BadgeCheckIcon, CheckCircle, RefreshCw, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface IError {
    amount?: string
}
const DepositMoneyPage = () => {
    const [depositMethod, setDepositMethod] = useState('cash');

    const [currentStep, setCurrentStep] = useState(1);
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState<IError>({});

    // API Calls
    const { data, refetch, } = useGetMyWalletQuery(undefined);
    const [depositMoney, { isLoading: depositLoading, data: getDepositData }] = useDepositMoneyMutation();

    // Data
    const walletBalance = data?.data?.balance;
    const depositMoneyData = getDepositData?.data;
    // const remainingBalance = Number(walletBalance) - Number(amount);

    // Validate amount
    const validateAmount = (value: string) => {
        const numValue = parseFloat(value);
        if (!value || value === '') return 'Amount is required';
        if (isNaN(numValue)) return 'Please enter a valid number';
        if (numValue <= 0) return 'Amount must be greater than 0';
        if (numValue < 10) return 'Minimum send money amount is ৳10';
        if (numValue > 50000) return 'Maximum send money amount is ৳50,000';
        if (value > walletBalance) return "You can not your cross current wallet balance"
        return null;
    };

    // Handle step navigation
    const handleNextStep = () => {
        if (currentStep === 1) {
            const amountError = validateAmount(amount);
            if (amountError) {
                setErrors({ amount: amountError });
                return;
            }
            if (depositMethod === "cash") {
                return toast.error("Deposit money from agent is not logical, please deposit money from agent via cash-in")
            }
            setErrors({});
            setCurrentStep(2);
        } else if (currentStep === 2) {
            setCurrentStep(3);
        }
        else if (currentStep === 3) {
            setCurrentStep(4);
        }
    };

    const handleBackStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

    const handleDeposit = async () => {
        if (!amount) return 'Send amount not found';
        try {
            const payload = { amount: Number(amount) }
            const res = await depositMoney(payload).unwrap();
            console.log(res);
            toast.success("Deposit money successfully!")
            handleNextStep();
            // setAmount()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Send money failed", err);
            toast.error(err?.data?.message || "Login failed. Try again.");
        }
    };



    const handleSendAgain = () => {
        refetch()
        setCurrentStep(1)
    }


    // Step 1: Enter Amount
    const renderAmountStep = () => (
        <Card className="w-full max-w-md mx-auto bg-card/70">
            <CardHeader>
                <CardTitle className="text-center">Deposit Money</CardTitle>
                <CardDescription className="text-center">
                    Enter the amount you want to deposit
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
                    <p className="text-2xl font-bold text-green-600">৳{walletBalance?.toLocaleString()}</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="amount">Deposit Amount (৳)</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={errors.amount ? 'border-red-500' : ''}
                    />
                    {errors.amount && (
                        <p className="text-sm text-red-500">{errors.amount}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Deposit Method</Label>
                    <Select value={depositMethod} onValueChange={setDepositMethod}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cash">Agent to PayWave</SelectItem>
                            <SelectItem value="bank">Bank to PayWave</SelectItem>
                            <SelectItem value="card">Card to PayWave</SelectItem>
                        </SelectContent>
                    </Select>
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
                        Deposit limit: ৳10 - ৳50,000 per transaction
                    </AlertDescription>
                </Alert>

                <Button onClick={handleNextStep} className="w-full text-white">
                    Continue
                </Button>
            </CardContent>
        </Card>
    );


    // Step 2: Confirmation
    const renderConfirmationStep = () => (
        <Card className="w-full max-w-md mx-auto bg-card/70">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleBackStep}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <CardTitle>Confirm Deposit</CardTitle>
                        <CardDescription>Review your transaction details</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                        <span className="font-semibold">৳{parseFloat(amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Service Fee:</span>
                        <span className="font-semibold">৳0</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>৳{parseFloat(amount).toLocaleString()}</span>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Selected Method</h4>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={''} />
                            <AvatarFallback>
                                <User className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{depositMethod === "bank" ? 'Agrani Bank PLC' : 'Mastercard'}</p>
                            {/* <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAgent?.phone}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAgent?.location}</p> */}
                        </div>
                    </div>
                </div>

                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                        After confirmation money will be deduct from you bank or card account
                    </AlertDescription>
                </Alert>

                <Button onClick={handleDeposit} className="w-full text-white" disabled={depositLoading}>
                    {depositLoading ? (
                        <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Confirm Deposit'
                    )}
                </Button>
            </CardContent>
        </Card>
    );

    // Step 3: Success/Processing
    const renderSuccessStep = () => (
        <Card className="w-full max-w-md mx-auto bg-card/70">
            <CardContent className="pt-6">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-green-600">Deposit successfully!</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Your deposit  has been successfully completed
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Time</span>
                                <span className="font-mono">{handleFormateDate(depositMoneyData?.createdAt)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Transaction ID:</span>
                                <span className="font-mono font-semibold">{depositMoneyData.transactionId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Amount:</span>
                                <span className="font-semibold">৳{parseFloat(amount).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Method:</span>
                                <span className="font-semibold">{depositMethod}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Status:</span>
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

                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                            Check your wallet, via {depositMethod} money added to user wallet.
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                        <Button className="w-full text-white" onClick={() => window.history.back()}>
                            Go to Dashboard
                        </Button>
                        <Button variant="outline" className="w-full" onClick={handleSendAgain}>
                            Deposit again
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-card/40 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Progress indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-8">
                        {[1, 2, 3].map((step) => (
                            <div
                                key={step}
                                className={`flex items-center  ${step < 4 ? 'flex-1' : ''}`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= step
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-300 text-gray-500'
                                        }`}
                                >
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div
                                        className={`flex-1 h-1 ml-4 ${currentStep > step ? 'bg-green-600' : 'bg-gray-300'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className=" flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>Amount</span>
                        <span>Confirm</span>
                        <span>Complete</span>
                    </div>
                </div>

                {/* Step content */}
                {currentStep === 1 && renderAmountStep()}
                {currentStep === 2 && renderConfirmationStep()}
                {currentStep === 3 && renderSuccessStep()}
            </div>
        </div>
    );
};

export default DepositMoneyPage;