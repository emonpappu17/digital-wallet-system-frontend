

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
    const faqs = [
        {
            q: "What is Orbit Wallet?",
            a: "Orbit Wallet is a secure digital payment platform that allows users, agents, and businesses to send, receive, and manage money easily. It's designed for financial inclusion, supporting cash-in/out via agents and seamless mobile transactions."
        },
        {
            q: "How do I create an account?",
            a: "Visit our registration page, select your role (User or Agent), provide your details including phone number and password, and complete the verification process. Admins are managed separately."
        },
        {
            q: "Is my money safe?",
            a: "Yes. We use bank-grade encryption, optional 2FA, and continuous monitoring to protect funds. All transactions are secured with end-to-end encryption."
        },
        {
            q: "How do I deposit money into my wallet?",
            a: "As a user, you can deposit via an agent (cash-in), bank transfer, or other integrated methods. Agents handle cash deposits directly."
        },
        {
            q: "How do I send money to someone?",
            a: "From your dashboard, select 'Send Money', enter the recipient's phone or email, specify the amount, and confirm. Transactions are instant."
        },
        {
            q: "What are the transaction fees?",
            a: "Fees vary by transaction type: free for P2P within limits, small percentages for withdrawals or merchant payments. Check our pricing page for details."
        },
        {
            q: "How do I become an agent?",
            a: "Sign up on the agent page and complete KYC — our team will reach out with next steps for approval."
        },
        {
            q: "What currencies do you support?",
            a: "Currently BDT (৳). We plan to add more local currencies based on demand."
        },
        {
            q: "How can I contact support?",
            a: "Use the contact form on our site, email support@orbitwallet.example, or call +880 1X XXX XXXX during business hours."
        },
        {
            q: "Can I use Orbit Wallet internationally?",
            a: "Currently focused on local markets, but we're expanding. Cross-border features are in development."
        },
    ];

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-slate-800 dark:text-slate-200">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    FAQs
                </Badge>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                    Frequently Asked Questions
                </h1>

                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Find quick answers to common questions about using Orbit Wallet, our features, security, and more. If you need further help, contact our support team.
                </p>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
                <Card className="rounded-2xl bg-card/40 shadow-sm">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">Common Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((f, idx) => (
                                <div key={idx}>
                                    <details className="group">
                                        <summary className="cursor-pointer list-none text-lg font-medium text-slate-800 dark:text-slate-100">{f.q}</summary>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.a}</p>
                                    </details>
                                    {idx < faqs.length - 1 && <Separator className="my-4" />}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}