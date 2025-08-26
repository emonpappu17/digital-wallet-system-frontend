/* eslint-disable @typescript-eslint/no-explicit-any */

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/ui/spinner";
import { FEE_CONFIG } from "@/config/feeCofig";
import { useGetAgentMutation, useUserProfileQuery } from "@/redux/features/authApi";
import { useCashOutMutation } from "@/redux/features/transactionApi";
import { useGetMyWalletQuery } from "@/redux/features/walletApi";
import { handleFormateDate } from "@/utils/handleFormateDate";
import { AlertCircle, BadgeCheckIcon, CheckCircle, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IError {
  amount?: string
}

const CashOutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<IError>({});
  const [searchTerm, setSearchTerm] = useState('');

  // API Calls
  const { data, refetch, isLoading: isWalletLoading } = useGetMyWalletQuery(undefined);
  const { data: getSenderData } = useUserProfileQuery(undefined);
  // const [getUser, { isLoading: gettingUserLoading, data: getUserData }] = useGetUserMutation();
  const [getAgent, { isLoading: gettingUserLoading, data: getAgentData }] = useGetAgentMutation();
  const [cashOut, { isLoading: cashOutLoading, data: getCashOutData }] = useCashOutMutation();

  console.log(getAgentData);
  // Data
  const walletBalance = data?.data?.balance;
  const agentData = getAgentData?.data;
  const senderData = getSenderData?.data;
  const cashOutData = getCashOutData?.data;

  // Validate amount
  const validateAmount = (value: string) => {
    const numValue = parseFloat(value);
    if (!value || value === '') return 'Amount is required';
    if (isNaN(numValue)) return 'Please enter a valid number';
    if (numValue <= 0) return 'Amount must be greater than 0';
    if (numValue < 10) return 'Minimum cash out amount is ৳10';
    if (numValue > 50000) return 'Maximum cash out amount is ৳50,000';
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
      setCurrentStep(3);
    }
    else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSearchTerm("")
      setAmount('')
      setErrors({});
    }
  };

  const handleCashOut = async () => {
    if (!amount) return 'Send amount not found';
    try {
      console.log(getAgentData.phoneNumber);
      const payload = { agentPhoneNumber: agentData.phoneNumber, amount: Number(amount) }
      const res = await cashOut(payload).unwrap();
      console.log(res);
      toast.success("Cash out successfully!")
      handleNextStep();
      // setAmount()
    } catch (err: any) {
      console.error("cash out failed", err);
      toast.error(err?.data?.message || "Login failed. Try again.");
    }
  };

  const handleSearchUser = async () => {
    if (!searchTerm || searchTerm === '') return toast.error('Please enter agent account number');
    try {
      if (senderData.phoneNumber === searchTerm) {
        return toast.error("Can not cash out to own account")
      }

      const phoneNumberRegex = /^01\d{9}$/;

      const isPhoneNumberValid = phoneNumberRegex.test(searchTerm);
      if (!isPhoneNumberValid) return toast.error("Please provide valid phone number")

      const payload = { phoneNumber: searchTerm }

      const res = await getAgent(payload).unwrap();
      console.log(res);
      handleNextStep();
    } catch (err: any) {
      console.error("Get agent failed", err);
      toast.error(err?.data?.message || "Login failed. Try again.");
    }
  }

  const handleSendAgain = () => {
    refetch()
    setCurrentStep(1)
    setSearchTerm('')
    setAmount('')
  }
  console.log(amount);
  const fee = (Number(amount) * FEE_CONFIG.cashOutFeePercent) / 100;
  const totalDeduction = Number(amount) + fee;

  const remainingBalance = Number(walletBalance) - Number(totalDeduction);

  // console.log(totalDeduction);

  // Step-1
  const moneyAmountStep = () => {
    return <Card className="w-full max-w-md mx-auto bg-card/70">
      <CardHeader>
        <CardTitle className="text-center">Cash Out</CardTitle>
        <CardDescription className="text-center">
          Enter the amount you want to cash out
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isWalletLoading ?
          (<div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            {/* Label skeleton */}
            <Skeleton className="h-4 w-28 mx-auto mb-2" />

            {/* Balance skeleton */}
            <Skeleton className="h-7 w-20 mx-auto rounded-md" />
          </div>) :
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
            <p className="text-2xl font-bold text-green-600">৳
              {walletBalance?.toLocaleString()}
            </p>
          </div>}

        <div className="space-y-2">
          <Label htmlFor="amount">Cash Out Amount (৳)</Label>
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
            Cash out limit: ৳10 - ৳50,000 per transaction
          </AlertDescription>
        </Alert>

        <Button onClick={handleNextStep} className="w-full text-white">
          Continue
        </Button>
      </CardContent>
    </Card>
  }

  // Step-2
  const agentSearchStep = () => {
    return <Card className="w-full max-w-[500px] mx-auto">
      <CardHeader>
        <div className="space-y-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Cash out amount</p>
            <p className="text-2xl font-bold text-green-600">৳
              {amount?.toLocaleString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 ">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-[14px] h-4 w-4 text-gray-400" />
          <Input
            placeholder="Enter agent phone number"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-5"
          />
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Only cash out from who has PayWave agent account
          </AlertDescription>
        </Alert>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBackStep} className="flex-1">Back</Button>

          <Button onClick={handleSearchUser} disabled={gettingUserLoading} className=" text-white flex-1"
          >
            {gettingUserLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2 " />
                Processing...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  }

  //step-3
  const moneyConfirmStep = () => {
    return <Card className="w-full max-w-[500px] mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Confirm cash out</CardTitle>
        <CardDescription className="text-center">
          Verify details before cash out
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>Amount</div>
            <div className="font-medium">{amount}</div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>Charge</div>
            <div className="font-medium">{fee}</div>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <div>Total</div>
            <div>৳{totalDeduction}</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Remaining balance: <span className="font-medium">{remainingBalance.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{agentData?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{agentData?.name}</div>
            <div className="text-sm text-muted-foreground">{agentData?.phoneNumber} • {agentData?.email}</div>
          </div>
        </div>


        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            After confirm money will be added to agent account
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBackStep} className="flex-1">Back</Button>

          <Button onClick={handleCashOut} disabled={cashOutLoading} className=" text-white flex-1"
          >
            {cashOutLoading ? (
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
  }

  //step-4
  const successStep = () => {
    return <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />

          </div>

          <div>
            <h2 className="text-xl font-bold text-green-600">Cash out successful</h2>
            <p className="text-sm text-muted-foreground">Your Cash out has been completed successfully</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Time</span>
                <span className="font-mono">{handleFormateDate(cashOutData?.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span>Transaction ID</span>
                <span className="font-mono">{cashOutData?.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount</span>
                <span className="font-semibold">{amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Charge</span>
                <span className="font-semibold">{fee}</span>
              </div>
              <div className="flex justify-between">
                <span>New amount </span>
                <span className="font-semibold">{walletBalance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Receiver</span>
                <span className="font-semibold">{getAgentData?.name}</span>
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

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Please collect your money from agent
            </AlertDescription>
          </Alert>

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
  }

  return (
    <div className="min-h-screen bg-card/40 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress indicator (Can be reusable)*/}
        <ProgressIndicator currentStep={currentStep} />

        {/* Step content */}
        {currentStep === 1 &&
          // <SendMoneyAmountStep
          //   isWalletLoading={isWalletLoading}
          //   amount={amount}
          //   errors={errors}
          //   handleNextStep={handleNextStep}
          //   setAmount={setAmount}
          //   walletBalance={walletBalance}
          // />
          moneyAmountStep()
        }

        {currentStep === 2 &&
          agentSearchStep()
          // <ReceiverSelectionStep
          //   amount={amount}
          //   gettingUserLoading={gettingUserLoading}
          //   handleBackStep={handleBackStep}
          //   handleSearchUser={handleSearchUser}
          //   setSearchTerm={setSearchTerm}
          // />
        }

        {currentStep === 3 &&
          // <SendMoneyConfirmStep
          //   amount={amount}
          //   handleBackStep={handleBackStep}
          //   handleSendMoney={handleSendMoney}
          //   receiverData={receiverData}
          //   remainingBalance={remainingBalance}
          //   sendMoneyLoading={sendMoneyLoading}
          // />
          moneyConfirmStep()
        }

        {currentStep === 4 &&
          successStep()
          // <SendMoneySuccessStep

          //   amount={amount}
          //   handleSendAgain={handleSendAgain}
          //   receiverData={receiverData}
          //   sendMoneyData={sendMoneyData}
          //   walletBalance={walletBalance}
          // />
        }
      </div>
    </div>
  );
};

export default CashOutPage;