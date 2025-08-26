



import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ArrowLeft, CheckCircle, Clock, MapPin, Phone, RefreshCw, Search, Star, User } from 'lucide-react';
import { useState } from 'react';

// Mock data for agents
const mockAgents = [
    {
        id: 'agent1',
        name: 'Rahman Store',
        phone: '+880171234567',
        location: 'Dhanmondi 27',
        distance: '0.5 km',
        rating: 4.8,
        totalTransactions: 1250,
        isOnline: true,
        avatar: '/api/placeholder/40/40'
    },
    {
        id: 'agent2',
        name: 'City Mobile Center',
        phone: '+880181234567',
        location: 'Mirpur 10',
        distance: '1.2 km',
        rating: 4.6,
        totalTransactions: 980,
        isOnline: true,
        avatar: '/api/placeholder/40/40'
    },
    {
        id: 'agent3',
        name: 'Digital Point',
        phone: '+880191234567',
        location: 'Uttara Sector 7',
        distance: '2.1 km',
        rating: 4.9,
        totalTransactions: 2100,
        isOnline: false,
        avatar: '/api/placeholder/40/40'
    }
];

// Mock user data
const mockUser = {
    name: 'John Doe',
    phone: '+880123456789',
    balance: 1250.50
};

const DepositMoneyPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [amount, setAmount] = useState('');
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [depositMethod, setDepositMethod] = useState('cash');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [errors, setErrors] = useState({});

    // Filter agents based on search
    const filteredAgents = mockAgents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Validate amount
    const validateAmount = (value) => {
        const numValue = parseFloat(value);
        if (!value || value === '') return 'Amount is required';
        if (isNaN(numValue)) return 'Please enter a valid number';
        if (numValue <= 0) return 'Amount must be greater than 0';
        if (numValue < 10) return 'Minimum deposit amount is ৳10';
        if (numValue > 50000) return 'Maximum deposit amount is ৳50,000';
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
            if (!selectedAgent) {
                setErrors({ agent: 'Please select an agent' });
                return;
            }
            setErrors({});
            setCurrentStep(3);
        }
    };

    const handleBackStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

    // Simulate transaction processing
    const processDeposit = async () => {
        setIsLoading(true);

        // Generate transaction ID
        const txId = `TXN${Date.now()}`;
        setTransactionId(txId);

        // Simulate API call delay
        setTimeout(() => {
            setIsLoading(false);
            setCurrentStep(4);
        }, 3000);
    };

    const resetFlow = () => {
        setCurrentStep(1);
        setAmount('');
        setSelectedAgent(null);
        setSearchTerm('');
        setErrors({});
        setTransactionId('');
    };

    // Step 1: Enter Amount
    const renderAmountStep = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center">Deposit Money</CardTitle>
                <CardDescription className="text-center">
                    Enter the amount you want to deposit
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
                    <p className="text-2xl font-bold text-green-600">৳{mockUser.balance.toLocaleString()}</p>
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
                            <SelectItem value="cash">Cash via Agent</SelectItem>
                            <SelectItem value="bank">Bank Transfer (Coming Soon)</SelectItem>
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

                <Button onClick={handleNextStep} className="w-full">
                    Continue
                </Button>
            </CardContent>
        </Card>
    );

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
                        value={searchTerm}
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
                <div className="space-y-3 max-h-96 overflow-y-auto">
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
                                            <Badge variant={agent.isOnline ? 'default' : 'secondary'}>
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
                </div>

                {filteredAgents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No agents found matching your search</p>
                    </div>
                )}

                <Button onClick={handleNextStep} className="w-full text-white" disabled={!selectedAgent}>
                    Continue with {selectedAgent?.name}
                </Button>
            </CardContent>
        </Card>
    );

    // Step 3: Confirmation
    const renderConfirmationStep = () => (
        <Card className="w-full max-w-md mx-auto">
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
                    <h4 className="font-semibold mb-2">Selected Agent</h4>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={selectedAgent?.avatar} />
                            <AvatarFallback>
                                <User className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{selectedAgent?.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAgent?.phone}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedAgent?.location}</p>
                        </div>
                    </div>
                </div>

                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                        Please prepare ৳{parseFloat(amount).toLocaleString()} in cash. The agent will process your deposit after receiving the cash.
                    </AlertDescription>
                </Alert>

                <Button onClick={processDeposit} className="w-full" disabled={isLoading}>
                    {isLoading ? (
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

    // Step 4: Success/Processing
    const renderSuccessStep = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="pt-6">
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-green-600">Deposit Request Sent!</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Your deposit request has been sent to the agent
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Transaction ID:</span>
                                <span className="font-mono font-semibold">{transactionId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Amount:</span>
                                <span className="font-semibold">৳{parseFloat(amount).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Agent:</span>
                                <span className="font-semibold">{selectedAgent?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Status:</span>
                                <Badge variant="outline" className="text-orange-600 border-orange-600">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Pending
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                            Please visit the agent with ৳{parseFloat(amount).toLocaleString()} in cash. The agent will complete your deposit once payment is received.
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                        <Button className="w-full" onClick={() => window.history.back()}>
                            Go to Dashboard
                        </Button>
                        <Button variant="outline" className="w-full" onClick={resetFlow}>
                            Make Another Deposit
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-card/50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Progress indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-center space-x-8">
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}
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
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>Amount</span>
                        <span>Agent</span>
                        <span>Confirm</span>
                        <span>Complete</span>
                    </div>
                </div>

                {/* Step content */}
                {currentStep === 1 && renderAmountStep()}
                {currentStep === 2 && renderAgentSelectionStep()}
                {currentStep === 3 && renderConfirmationStep()}
                {currentStep === 4 && renderSuccessStep()}
            </div>
        </div>
    );
};

export default DepositMoneyPage;