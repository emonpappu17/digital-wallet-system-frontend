import SendMoneyAmountStep from "@/components/modules/user/SendMoneyAmountStep";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import { useGetMyWalletQuery } from "@/redux/features/walletApi";
import { AlertCircle, ArrowLeft, Badge, MapPin, Phone, Search, Star, User } from "lucide-react";
import { useState } from "react";
interface IError {
    amount?: string
}

const SendMoneyPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [depositMethod, setDepositMethod] = useState('cash');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState<IError>({});
    const [searchTerm, setSearchTerm] = useState('');


    console.log(amount);

    // API Call
    const { data } = useGetMyWalletQuery(undefined);
    const walletBalance = data?.data?.balance;


    // Validate amount
    const validateAmount = (value: string) => {
        const numValue = parseFloat(value);
        if (!value || value === '') return 'Amount is required';
        if (isNaN(numValue)) return 'Please enter a valid number';
        if (numValue <= 0) return 'Amount must be greater than 0';
        if (numValue < 10) return 'Minimum send money amount is ৳10';
        if (numValue > 50000) return 'Maximum send money amount is ৳50,000';
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
            setErrors({});
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // if (!selectedAgent) {
            //     setErrors({ agent: 'Please select an agent' });
            //     return;
            // }
            // setErrors({});
            setCurrentStep(3);
        }
    };

    const handleBackStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            // setErrors({});
        }
    };

    // Step 1: Enter Amount
    // const amountStep = () => (
    //     <Card className="w-full max-w-md mx-auto bg-card/70">
    //         <CardHeader>
    //             <CardTitle className="text-center">Send Money</CardTitle>
    //             <CardDescription className="text-center">
    //                 Enter the amount you want to send
    //             </CardDescription>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //             <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
    //                 <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
    //                 <p className="text-2xl font-bold text-green-600">৳
    //                     {walletBalance?.toLocaleString()}
    //                 </p>
    //             </div>

    //             <div className="space-y-2">
    //                 <Label htmlFor="amount">Send Money Amount (৳)</Label>
    //                 <Input
    //                     id="amount"
    //                     type="number"
    //                     placeholder="Enter amount"
    //                     value={amount}
    //                     onChange={(e) => setAmount(e.target.value)}
    //                     className={errors?.amount ? 'border-red-500' : ''}
    //                 />
    //                 {errors.amount && (
    //                     <p className="text-sm text-red-500">{errors.amount}</p>
    //                 )}
    //             </div>

    //             {/* Quick amount buttons */}
    //             <div className="grid grid-cols-4 gap-2">
    //                 {[100, 500, 1000, 5000].map((quickAmount) => (
    //                     <Button
    //                         key={quickAmount}
    //                         variant="outline"
    //                         size="sm"
    //                         onClick={() => setAmount(quickAmount.toString())}
    //                         className="text-xs"
    //                     >
    //                         ৳{quickAmount}
    //                     </Button>
    //                 ))}
    //             </div>

    //             <Alert>
    //                 <AlertCircle className="h-4 w-4" />
    //                 <AlertDescription className="text-sm">
    //                     Send Money limit: ৳10 - ৳50,000 per transaction
    //                 </AlertDescription>
    //             </Alert>

    //             <Button onClick={handleNextStep} className="w-full text-white">
    //                 Continue
    //             </Button>
    //         </CardContent>
    //     </Card>
    // );

    // Step 2: Select Agent
    const renderAgentSelectionStep = () => (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleBackStep}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <CardTitle>Select Agent</CardTitle>
                        <CardDescription>
                            Choose an agent to deposit ৳{amount}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Search bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search by agent name or location..."
                        // value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {errors.agent && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.agent}</AlertDescription>
                    </Alert>
                )}

                {/* Agent list */}
                {/* <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredAgents.map((agent) => (
                        <Card
                            key={agent.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${selectedAgent?.id === agent.id
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : ''
                                }`}
                            onClick={() => setSelectedAgent(agent)}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={agent.avatar} />
                                            <AvatarFallback>
                                                <User className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">{agent.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Phone className="h-3 w-3" />
                                                {agent.phone}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <MapPin className="h-3 w-3" />
                                                {agent.location} • {agent.distance}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1">
                                            <Badge
                                            // variant={agent.isOnline ? 'default' : 'secondary'}
                                            >
                                                {agent.isOnline ? 'Online' : 'Offline'}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm">{agent.rating}</span>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {agent.totalTransactions.toLocaleString()} transactions
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div> */}

                {/* {filteredAgents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No agents found matching your search</p>
                    </div>
                )} */}

                <Button onClick={handleNextStep} className="w-full text-white"

                // disabled={!selectedAgent}
                >
                    Continue with

                    {/* {selectedAgent?.name} */}
                </Button>
            </CardContent>
        </Card>
    );



    return (
        <div className="min-h-screen bg-card/40 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Progress indicator (Can be reusable)*/}
                <ProgressIndicator currentStep={currentStep} />

                {/* Step content */}
                {currentStep === 1 &&
                    <SendMoneyAmountStep
                        amount={amount}
                        errors={errors}
                        handleNextStep={handleNextStep}
                        setAmount={setAmount}
                        walletBalance={walletBalance}
                    />}
                {/* {currentStep === 1 && amountStep()} */}
                {currentStep === 2 && renderAgentSelectionStep()}
                {/* {currentStep === 3 && renderConfirmationStep()}
                {currentStep === 4 && renderSuccessStep()} */}
            </div>
        </div>
    );
};

export default SendMoneyPage;