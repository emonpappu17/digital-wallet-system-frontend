// src/pages/user/SendMoneyPage.tsx
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    CheckCircle,
    RefreshCw,
    Search as SearchIcon,
    Send as SendIcon
} from "lucide-react";
import React, { useMemo, useState } from "react";

/**
 * SendMoneyPage
 * Single-file send-money UI (mocked)
 *
 * Inspired by provided Deposit/Withdraw pages.
 */

/* ----------------------------- Types ----------------------------- */
type Role = "USER" | "AGENT" | "ADMIN";
type Status = "ACTIVE" | "PENDING" | "SUSPEND" | "BLOCKED";

type UserT = {
  _id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  role: Role;
  status: Status;
  createdAt: string;
};

type WalletT = {
  user: string; // user _id
  balance: number;
  status?: Status;
  createdAt: string;
};

type TransactionT = {
  _id: string;
  from?: string | null;
  to?: string | null;
  type: "SEND" | "CASH_IN" | "CASH_OUT" | "REFUND";
  amount: number;
  fee: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: string;
  note?: string;
};

/* --------------------------- Mock Data --------------------------- */

// Mock users (sender + recipients)
const mockSender: UserT = {
  _id: "U-SELF",
  name: "John Doe",
  phoneNumber: "+8801712345678",
  email: "john@example.com",
  role: "USER",
  status: "ACTIVE",
  createdAt: new Date().toISOString(),
};

const mockUsers: UserT[] = [
  mockSender,
  {
    _id: "U-1001",
    name: "Luka",
    phoneNumber: "01765487698",
    email: "luka@gmail.com",
    role: "USER",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "U-1002",
    name: "Solemon",
    phoneNumber: "01276598309",
    email: "solemon@gmail.com",
    role: "USER",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "U-1003",
    name: "Blocked Bob",
    phoneNumber: "01700001111",
    email: "blocked@x.com",
    role: "USER",
    status: "BLOCKED",
    createdAt: new Date().toISOString(),
  },
];

// Mock wallets
const initialWallets: WalletT[] = [
  { user: mockSender._id, balance: 5000.0, status: "ACTIVE", createdAt: new Date().toISOString() },
  { user: "U-1001", balance: 410.9, status: "ACTIVE", createdAt: new Date().toISOString() },
  { user: "U-1002", balance: 50.0, status: "ACTIVE", createdAt: new Date().toISOString() },
  { user: "U-1003", balance: 20.0, status: "BLOCKED", createdAt: new Date().toISOString() },
];

// Mock transactions (history)
const initialTransactions: TransactionT[] = [
  {
    _id: "TX-001",
    from: mockSender._id,
    to: "U-1001",
    type: "SEND",
    amount: 250,
    fee: 5,
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    note: "Dinner",
  },
  {
    _id: "TX-002",
    from: "U-1001",
    to: mockSender._id,
    type: "SEND",
    amount: 100,
    fee: 2,
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    note: "Repay",
  },
];

/* ------------------------- Helpers & Utils ------------------------ */
const uid = (prefix = "") => `${prefix}${Math.random().toString(36).slice(2, 9)}`;
const nowISO = () => new Date().toISOString();
const fmtBDT = (n: number) => `৳ ${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* Fee calculation:
   - For demo: small flat fees earlier, percentage for large amounts
   - You can change to system rules (config)
*/
const calculateSendFee = (amount: number) => {
  if (amount <= 100) return 2;
  if (amount <= 1000) return 5;
  // 0.8% fee for large amounts, min 5
  return Math.max(5, +(amount * 0.008).toFixed(2));
};

/* ------------------------- Main Component ------------------------- */
const Demo: React.FC = () => {
  // data (simulate server)
  const [users] = useState<UserT[]>(mockUsers);
  const [wallets, setWallets] = useState<WalletT[]>(initialWallets);
  const [transactions, setTransactions] = useState<TransactionT[]>(initialTransactions);

  // flow state
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selectedReceiverId, setSelectedReceiverId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [txId, setTxId] = useState<string>("");

  // derived
  const sender = users.find((u) => u._id === mockSender._id)!;
  const senderWallet = wallets.find((w) => w.user === sender._id)!;
  const receiverCandidates = useMemo(
    () =>
      users.filter(
        (u) =>
          u._id !== sender._id &&
          (u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.phoneNumber.includes(search) ||
            (u.email || "").toLowerCase().includes(search.toLowerCase()))
      ),
    [users, search]
  );
  const receiver = users.find((u) => u._id === selectedReceiverId) ?? null;
  const receiverWallet = wallets.find((w) => w.user === selectedReceiverId) ?? null;

  // validations
  const validateAmount = (value: string) => {
    if (!value || value.trim() === "") return "Amount is required";
    const num = Number(value);
    if (Number.isNaN(num)) return "Enter a valid number";
    if (num <= 0) return "Amount must be greater than 0";
    if (num < 1) return "Minimum transfer is ৳1";
    if (num > 1000000) return "Maximum transfer is ৳1,000,000";
    const fee = calculateSendFee(num);
    if (senderWallet.balance < num + fee) return "Insufficient balance (including fees)";
    return null;
  };

  const validationErrors = useMemo(() => {
    const errs: { amount?: string; receiver?: string } = {};
    const amtErr = validateAmount(amount);
    if (amtErr) errs.amount = amtErr;
    if (!receiver) errs.receiver = "Select a receiver";
    if (receiver?.status === "BLOCKED") errs.receiver = "Receiver's wallet is blocked";
    return errs;
  }, [amount, receiver, senderWallet]);

  // process the send (simulate backend)
  const processSend = async () => {
    const amtNum = Number(amount);
    const fee = calculateSendFee(amtNum);
    const amountError = validateAmount(amount);
    if (amountError) {
      // show simple alert — replace with toast lib if you like
      alert(amountError);
      return;
    }
    if (!receiver) {
      alert("Choose a receiver");
      return;
    }
    if (receiver._id === sender._id) {
      alert("Cannot send money to yourself");
      return;
    }

    setIsProcessing(true);
    // create tx id
    const newTxId = `SND${Date.now()}`;
    setTxId(newTxId);

    // simulate network delay
    setTimeout(() => {
      // update wallets atomically (simulated)
      setWallets((prev) =>
        prev.map((w) => {
          if (w.user === sender._id) {
            return { ...w, balance: +(w.balance - amtNum - fee).toFixed(2) };
          }
          if (w.user === receiver._id) {
            return { ...w, balance: +(w.balance + amtNum).toFixed(2) };
          }
          return w;
        })
      );

      // store transaction
      const tx: TransactionT = {
        _id: newTxId,
        from: sender._id,
        to: receiver._id,
        type: "SEND",
        amount: amtNum,
        fee,
        status: "COMPLETED",
        createdAt: nowISO(),
        note: note || undefined,
      };
      setTransactions((prev) => [tx, ...prev]);

      setIsProcessing(false);
      setStep(4);
    }, 1000);
  };

  const resetFlow = () => {
    setStep(1);
    setAmount("");
    setNote("");
    setSearch("");
    setSelectedReceiverId(null);
    setTxId("");
  };

  /* Quick UI pieces for steps */
  const StepIndicator: React.FC = () => (
    <div className="mb-6">
      <div className="flex items-center justify-center space-x-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`flex items-center ${s < 4 ? "flex-1" : ""}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {s}
            </div>
            {s < 4 && <div className={`flex-1 h-1 ml-4 ${step > s ? "bg-blue-600" : "bg-gray-300"}`} />}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Amount</span>
        <span>Receiver</span>
        <span>Confirm</span>
        <span>Complete</span>
      </div>
    </div>
  );

  /* Renderers for each step (keeps UI consistent with your other pages) */
  const renderAmountStep = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SendIcon className="h-5 w-5 text-blue-600" /> Send Money
        </CardTitle>
        <CardDescription>Enter amount and optional note</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3">
          <div className="text-xs text-muted-foreground">Your balance</div>
          <div className="text-2xl font-semibold">{fmtBDT(senderWallet.balance)}</div>
        </div>

        <div>
          <Label htmlFor="amount">Amount (BDT)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="e.g. 150"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={validationErrors.amount ? "border-red-500" : ""}
          />
          {validationErrors.amount && <p className="text-sm text-red-600 mt-1">{validationErrors.amount}</p>}
        </div>

        <div>
          <Label htmlFor="note">Note (optional)</Label>
          <Input id="note" placeholder="e.g. dinner, rent" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <div className="flex gap-2">
          {[50, 100, 250, 500].map((q) => (
            <Button key={q} variant="outline" size="sm" onClick={() => setAmount(String(q))}>
              ৳{q}
            </Button>
          ))}
        </div>

        <Alert>
          <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <AlertDescription className="text-sm">Fee is applied on each transfer. Fee preview shown at confirmation.</AlertDescription>
        </Alert>

        <Button
          onClick={() => {
            const err = validateAmount(amount);
            if (err) {
              alert(err);
              return;
            }
            setStep(2);
          }}
          className="w-full"
          disabled={!amount}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );

  const renderReceiverStep = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>Select Receiver</CardTitle>
            <CardDescription>Search by name / phone / email</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Search receiver..." className="pl-10" value={search} onChange={(e) => { setSearch(e.target.value); setSelectedReceiverId(null); }} />
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto">
          {receiverCandidates.length ? (
            receiverCandidates.map((r) => (
              <div
                key={r._id}
                onClick={() => setSelectedReceiverId(r._id)}
                className={`p-3 rounded-md cursor-pointer hover:shadow-md flex items-center justify-between ${
                  selectedReceiverId === r._id ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{r.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-sm text-gray-600">{r.phoneNumber} • {r.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{fmtBDT(wallets.find((w) => w.user === r._id)?.balance ?? 0)}</div>
                  <div className="text-xs text-muted-foreground">{r.status}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <SearchIcon className="mx-auto mb-2 opacity-50" />
              <div>No matching users</div>
            </div>
          )}
        </div>

        {validationErrors.receiver && <p className="text-sm text-red-600">{validationErrors.receiver}</p>}

        <div className="flex gap-2">
          <Button onClick={() => setStep(1)} variant="outline" className="flex-1">Back</Button>
          <Button
            onClick={() => {
              if (!selectedReceiverId) {
                alert("Please pick a receiver");
                return;
              }
              setStep(3);
            }}
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderConfirmStep = () => {
    const amt = Number(amount);
    const fee = calculateSendFee(amt);
    const total = +(amt + fee).toFixed(2);
    const wouldRemain = +(senderWallet.balance - total).toFixed(2);

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>Confirm Transfer</CardTitle>
              <CardDescription>Verify details before sending</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>Amount</div>
              <div className="font-medium">{fmtBDT(amt)}</div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div>Fee</div>
              <div className="font-medium">{fmtBDT(fee)}</div>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <div>Total</div>
              <div>{fmtBDT(total)}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Remaining balance: <span className="font-medium">{fmtBDT(wouldRemain)}</span>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{receiver?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{receiver?.name}</div>
              <div className="text-sm text-muted-foreground">{receiver?.phoneNumber} • {receiver?.email}</div>
            </div>
            <div className="ml-auto">
              <Badge>{receiver?.status}</Badge>
            </div>
          </div>

          <div>
            <Label>Note (optional)</Label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. payment for groceries" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
            <Button
              onClick={async () => {
                // final validations
                const amtErr = validateAmount(amount);
                if (amtErr) {
                  alert(amtErr);
                  return;
                }
                if (!receiver) {
                  alert("Receiver missing");
                  return;
                }
                setIsProcessing(true);
                // process
                await processSend();
                // isProcessing toggled in processSend via setTimeout
              }}
              className="flex-1"
              disabled={isProcessing}
            >
              {isProcessing ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Processing...</> : "Confirm & Send"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSuccessStep = () => {
    const latestTx = transactions[0];
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-green-600">Transfer Sent</h2>
              <p className="text-sm text-muted-foreground">Your transfer has been completed successfully</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Transaction ID</span>
                  <span className="font-mono">{latestTx?._id ?? txId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span className="font-semibold">{fmtBDT(latestTx?.amount ?? Number(amount))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee</span>
                  <span className="font-semibold">{fmtBDT(latestTx?.fee ?? calculateSendFee(Number(amount)))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Receiver</span>
                  <span className="font-semibold">{receiver?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <Badge variant="default" className="text-green-600 border-green-600"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 w-full">
              <Button className="w-full" onClick={() => window.history.back()}>Go to Dashboard</Button>
              <Button variant="outline" className="w-full" onClick={resetFlow}>Send Again</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  /* Right-hand column: recent transactions preview */
  const TransactionsSidebar = () => (
    <div className="w-full max-w-sm">
      <div className="mb-2 text-sm text-muted-foreground">Recent activity</div>
      <ScrollArea className="h-72 border rounded-md p-2">
        <div className="space-y-2">
          {transactions.map((t) => (
            <div key={t._id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/10">
              <div>
                <div className="text-sm font-medium">{t.type} • {t._id.slice(-6)}</div>
                <div className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{fmtBDT(t.amount)}</div>
                <div className="text-xs text-muted-foreground">Fee {fmtBDT(t.fee)}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-screen p-4 bg-card/50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StepIndicator />

          {step === 1 && renderAmountStep()}
          {step === 2 && renderReceiverStep()}
          {step === 3 && renderConfirmStep()}
          {step === 4 && renderSuccessStep()}
        </div>

        <div className="hidden lg:block">
          <TransactionsSidebar />
        </div>
      </div>
    </div>
  );
};

export default Demo;
