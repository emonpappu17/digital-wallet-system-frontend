/* eslint-disable @typescript-eslint/no-explicit-any */
import ReceiverSelectionStep from "@/components/modules/user/ReceiverSelectionStep";
import SendMoneyAmountStep from "@/components/modules/user/SendMoneyAmountStep";
import SendMoneyConfirmStep from "@/components/modules/user/SendMoneyConfirmStep";
import SendMoneySuccessStep from "@/components/modules/user/SendMoneySuccessStep";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import { useGetUserMutation, useUserProfileQuery } from "@/redux/features/authApi";
import { useSendMoneyMutation } from "@/redux/features/transactionApi";
import { useGetMyWalletQuery } from "@/redux/features/walletApi";
import { useState } from "react";
import { toast } from "sonner";

interface IError {
    amount?: string
}

const SendMoneyPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState<IError>({});
    const [searchTerm, setSearchTerm] = useState('');

    // API Calls
    const { data, refetch, isLoading: isWalletLoading } = useGetMyWalletQuery(undefined);
    const { data: getSenderData } = useUserProfileQuery(undefined);
    const [getUser, { isLoading: gettingUserLoading, data: getUserData }] = useGetUserMutation();
    const [sendMoney, { isLoading: sendMoneyLoading, data: getSendMoneyData }] = useSendMoneyMutation();

    // Data
    const walletBalance = data?.data?.balance;
    const receiverData = getUserData?.data;
    const senderData = getSenderData?.data;
    const sendMoneyData = getSendMoneyData?.data;
    const remainingBalance = Number(walletBalance) - Number(amount);

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

    const handleSendMoney = async () => {
        if (!amount) return 'Send amount not found';
        try {
            const payload = { receiverPhoneNumber: receiverData.phoneNumber, amount: Number(amount) }
            await sendMoney(payload).unwrap();
            // console.log(res);
            toast.success("Send money successfully!")
            handleNextStep();
            // setAmount()
        } catch (err: any) {
            console.error("Send money failed", err);
            toast.error(err?.data?.message || "Login failed. Try again.");
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

            await getUser(payload).unwrap();

            handleNextStep();
        } catch (err: any) {
            console.error("Get user failed", err);
            toast.error(err?.data?.message || "Login failed. Try again.");
        }
    }

    const handleSendAgain = () => {
        refetch()
        setCurrentStep(1)
    }

    return (
        <div className="min-h-screen bg-card/40 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Progress indicator (Can be reusable)*/}
                <ProgressIndicator currentStep={currentStep} />

                {/* Step content */}
                {currentStep === 1 &&
                    <SendMoneyAmountStep
                        isWalletLoading={isWalletLoading}
                        amount={amount}
                        errors={errors}
                        handleNextStep={handleNextStep}
                        setAmount={setAmount}
                        walletBalance={walletBalance}
                    />}

                {currentStep === 2 &&
                    <ReceiverSelectionStep
                        amount={amount}
                        gettingUserLoading={gettingUserLoading}
                        handleBackStep={handleBackStep}
                        handleSearchUser={handleSearchUser}
                        setSearchTerm={setSearchTerm}
                    />}

                {currentStep === 3 &&
                    <SendMoneyConfirmStep
                        amount={amount}
                        handleBackStep={handleBackStep}
                        handleSendMoney={handleSendMoney}
                        receiverData={receiverData}
                        remainingBalance={remainingBalance}
                        sendMoneyLoading={sendMoneyLoading}
                    />}

                {currentStep === 4 && <SendMoneySuccessStep

                    amount={amount}
                    handleSendAgain={handleSendAgain}
                    receiverData={receiverData}
                    sendMoneyData={sendMoneyData}
                    walletBalance={walletBalance}
                />}
            </div>
        </div>
    );
};

export default SendMoneyPage;