import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/spinner";
import { AlertCircle, Search } from "lucide-react";
interface IProps {
    amount: string,
    setSearchTerm: (value: string) => void,
    handleBackStep: () => void,
    handleSearchUser: () => void,
    gettingUserLoading: boolean,
}

const ReceiverSelectionStep = ({ amount, setSearchTerm, handleBackStep, handleSearchUser, gettingUserLoading }: IProps) => {
    return (
        <Card className="w-full max-w-[500px] mx-auto">
            <CardHeader>
                <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Send money amount</p>
                        <p className="text-2xl font-bold text-green-600">৳
                            {amount?.toLocaleString()}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 ">
                {/* Search bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Enter receiver email or phone number"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                        Only send money how has PayWave account
                    </AlertDescription>
                </Alert>

                <div className="flex justify-between items-center">
                    <Button onClick={handleBackStep} variant={"outline"} >Back</Button>

                    <Button onClick={handleSearchUser} disabled={gettingUserLoading} className=" text-white"
                    >
                        {gettingUserLoading ? (
                            <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                Processing...
                            </>
                        ) : (
                            'Continue'
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReceiverSelectionStep;