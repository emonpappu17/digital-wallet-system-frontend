// import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Shield,
    Zap,
    Globe,
    Users,
    Activity,
    Database,
    Key,
    Smartphone,
    Code,
    Star,
    ArrowRight
} from "lucide-react";

// FeaturesPage.tsx
// Feature listing and visuals for Paywave. Matches hero/about styles (dark-mode tuned).

export default function FeaturesPage() {
    const features = [
        {
            id: "security",
            title: "Bank‑level security",
            desc: "End‑to‑end encryption, optional 2FA, secure key management and continuous monitoring.",
            icon: Shield,
        },
        {
            id: "instant",
            title: "Instant transfers",
            desc: "Peer-to-peer and merchant transfers that settle in seconds for a snappy UX.",
            icon: Zap,
        },
        {
            id: "agents",
            title: "Agent cash‑in / cash‑out",
            desc: "Support for agent networks so users can top up or withdraw cash offline.",
            icon: Smartphone,
        },
        {
            id: "billing",
            title: "Bill payments & recharges",
            desc: "Top-up airtime, pay utilities and accept recurring payments with transparent fees.",
            icon: Globe,
        },
        {
            id: "merchant",
            title: "Merchant checkout",
            desc: "Lightweight SDKs and QR‑based payments for small businesses and merchants.",
            icon: Users,
        },
        {
            id: "analytics",
            title: "Reporting & analytics",
            desc: "Built‑in dashboards for agents and admins to monitor volume and KPIs.",
            icon: Activity,
        },
        {
            id: "compliance",
            title: "Compliance & limits",
            desc: "Configurable KYC tiers, AML rules and transaction limits to stay compliant.",
            icon: Key,
        },
        {
            id: "developer",
            title: "Developer API",
            desc: "REST APIs and webhooks to integrate Paywave into merchants, banks and partners.",
            icon: Code,
        },
    ];

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-slate-800 dark:text-slate-200">
                    <Star className="w-4 h-4 mr-2" />
                    Paywave Features
                </Badge>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                    Everything you need to move money — simple, fast, and secure
                </h1>

                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Paywave combines an easy-to-use wallet with agent support, merchant tools, and developer APIs so
                    you can build and scale payments for users, businesses and communities.
                </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
                {features.map((f) => (
                    <Card
                        key={f.id}
                        className="rounded-2xl bg-white/95 dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200 p-3">
                                    <f.icon className="w-5 h-5" />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{f.title}</h3>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{f.desc}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <Button size="sm" variant="ghost">Learn more</Button>
                                <a href={`#${f.id}`} className="text-sm font-medium text-sky-600 dark:text-sky-400 inline-flex items-center gap-2">Explore<ArrowRight className="w-4 h-4" /></a>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2 items-start">
                <section>
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Built for real users</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-prose">
                        Paywave supports multiple user roles out-of-the-box: Individuals who need a secure everyday wallet, Agents
                        who provide cash on/off ramps in low-connectivity areas, and Admins who manage compliance, fees and limits.
                        The product is intentionally modular so you can turn features on or off depending on your market needs.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="rounded-lg border p-4 text-center">
                            <Users className="mx-auto mb-3 w-6 h-6 text-sky-600 dark:text-sky-400" />
                            <p className="font-semibold text-slate-800 dark:text-slate-100">Individual Users</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Easy transfers, top-ups and bill pay.</p>
                        </div>

                        <div className="rounded-lg border p-4 text-center">
                            <Smartphone className="mx-auto mb-3 w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            <p className="font-semibold text-slate-800 dark:text-slate-100">Agents</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Cash handling and reconciliations made simple.</p>
                        </div>

                        <div className="rounded-lg border p-4 text-center">
                            <Database className="mx-auto mb-3 w-6 h-6 text-violet-600 dark:text-violet-400" />
                            <p className="font-semibold text-slate-800 dark:text-slate-100">Admins</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">System controls, reporting and audits.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Integrations & API</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-prose">
                        Connect Paywave to your stack using our REST APIs, webhooks and SDKs. Quickly onboard merchants and
                        partners and automate reconciliation and payouts.
                    </p>

                    <Card className="mt-6 rounded-lg bg-white/95 dark:bg-slate-900 border-gray-200 dark:border-slate-700">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <Code className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                                <div>
                                    <p className="font-medium text-slate-800 dark:text-slate-100">Developer-friendly</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">API keys, Postman collections and webhook examples included.</p>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <Button size="sm">Get API Key</Button>
                                <Button size="sm" variant="ghost">Docs</Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>

            <Separator className="my-12" />

            <div className="text-center">
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Ready to try Paywave?</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">Sign up and get access to the agent program, developer APIs, and launch guidance.</p>

                <div className="mt-6 flex justify-center gap-3">
                    <Button size="lg">Create an account</Button>
                    <Button size="lg" variant="outline">Contact Sales</Button>
                </div>
            </div>
        </main>
    );
}
