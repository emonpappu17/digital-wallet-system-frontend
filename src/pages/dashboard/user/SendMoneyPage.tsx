import ReceiverSelectionStep from "@/components/modules/user/ReceiverSelectionStep";
import SendMoneyAmountStep from "@/components/modules/user/SendMoneyAmountStep";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useGetUserMutation, useUserProfileQuery } from "@/redux/features/authApi";
import { useGetMyWalletQuery } from "@/redux/features/walletApi";
import { AlertCircle, ArrowLeft, Badge, MapPin, Phone, Search, Star, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
    const { data: getSenderData } = useUserProfileQuery(undefined);
    const [getUser, { isLoading: gettingUserLoading, data: getUserData }] = useGetUserMutation();

    const walletBalance = data?.data?.balance;
    // const receiverData = getUserData?.data;
    const senderData = getSenderData?.data;

    console.log('data==>', senderData);


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
            setErrors({});
        }
    };

    const handleSearchUser = async () => {
        if (!searchTerm || searchTerm === '') return 'Please enter receiver account';
        try {
            if (senderData.phoneNumber === searchTerm || senderData.email === searchTerm) {
                return toast.error("Can not send money to own account")
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            const isEmail = emailRegex.test(searchTerm);

            const payload = isEmail ? { email: searchTerm } : { phoneNumber: searchTerm }

            const res = await getUser(payload).unwrap();
            console.log(res);
            toast.success("Account found successfully!")
            handleNextStep();

        } catch (err) {
            console.error("Get user failed", err);
            toast.error(err?.data?.message || "Login failed. Try again.");
        }
    }

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
    // const renderReceiverSelectionStep = () => (
    //     <Card className="w-full max-w-[500px] mx-auto">
    //         <CardHeader>
    //             <div className="space-y-4">
    //                 <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
    //                     <p className="text-sm text-gray-600 dark:text-gray-400">Send money amount</p>
    //                     <p className="text-2xl font-bold text-green-600">৳
    //                         {amount?.toLocaleString()}
    //                     </p>
    //                 </div>
    //             </div>
    //         </CardHeader>
    //         <CardContent className="space-y-4 ">
    //             {/* Search bar */}
    //             <div className="relative">
    //                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
    //                 <Input
    //                     placeholder="Enter receiver email or phone number"
    //                     onChange={(e) => setSearchTerm(e.target.value)}
    //                     className="pl-10"
    //                 />
    //             </div>

    //             <Alert>
    //                 <AlertCircle className="h-4 w-4" />
    //                 <AlertDescription className="text-sm">
    //                     Only send money how has PayWave account
    //                 </AlertDescription>
    //             </Alert>

    //             <div className="flex justify-between items-center">
    //                 <Button onClick={handleBackStep} variant={"outline"} >Back</Button>

    //                 <Button onClick={handleSearchUser} disabled={gettingUserLoading} className=" text-white"
    //                 >
    //                     {gettingUserLoading ? (
    //                         <>
    //                             <LoadingSpinner size="sm" className="mr-2" />
    //                             Processing...
    //                         </>
    //                     ) : (
    //                         'Continue'
    //                     )}
    //                 </Button>
    //             </div>
    //         </CardContent>
    //     </Card>
    // );



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
                {currentStep === 2 &&
                    <ReceiverSelectionStep
                        amount={amount}
                        gettingUserLoading={gettingUserLoading}
                        handleBackStep={handleBackStep}
                        handleSearchUser={handleSearchUser}
                        setSearchTerm={setSearchTerm}
                    />}
                {/* {currentStep === 2 && renderReceiverSelectionStep()} */}
                {/* {currentStep === 3 && renderConfirmationStep()}
                {currentStep === 4 && renderSuccessStep()} */}
            </div>
        </div>
    );
};

export default SendMoneyPage;