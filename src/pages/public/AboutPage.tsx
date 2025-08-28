import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
    Mail,
    Phone,
    Users,
    Shield,
    Smartphone,
    Globe
} from "lucide-react";

export default function AboutPage() {
    const team = [
        {
            name: "Ayesha Rahman",
            role: "Founder & CEO",
            bio: "Product leader with 10+ years in fintech — focused on inclusive payments.",
        },
        {
            name: "Rafi Ahmed",
            role: "Head of Engineering",
            bio: "Builds reliable, scalable systems and leads our backend & infra teams.",
        },
        {
            name: "Nusrat Karim",
            role: "Head of Growth",
            bio: "Focused on agent partnerships, merchant integrations and user growth.",
        },
    ];

    const values = [
        {
            title: "Trust & Safety",
            desc: "We protect user funds and data with privacy-first design.",
            icon: Shield,
            iconColor: "text-emerald-600 dark:text-emerald-400"
        },
        {
            title: "Accessibility",
            desc: "Simple flows so anyone can use the wallet—no tech headaches.",
            icon: Smartphone,
            iconColor: "text-sky-600 dark:text-sky-400"
        },
        {
            title: "Local-first",
            desc: "Built for local realities: agent networks, low-connectivity, and local currency support.",
            icon: Globe,
            iconColor: "text-violet-600 dark:text-violet-400"
        },
    ];

    const faqs = [
        { q: "How do I become an agent?", a: "Sign up on the agent page and complete KYC — our team will reach out with next steps." },
        { q: "Is my money safe?", a: "Yes. We use bank-grade encryption, optional 2FA, and continuous monitoring to protect funds." },
        { q: "What currencies do you support?", a: "Currently BDT (৳). We plan to add more local currencies based on demand." },
    ];

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto text-center">
                <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-slate-800 dark:text-slate-200">
                    <Users className="w-4 h-4 mr-2" />
                    About Orbit Wallet
                </Badge>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                    Bringing fast, trusted digital payments to everyone
                </h1>

                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Orbit Wallet connects people, agents and businesses with secure, intuitive payment tools designed for
                    local needs. Our mission is to empower financial inclusion with a delightful and dependable product.
                </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
                {/* Story / Mission */}
                <section className="lg:col-span-2">
                    <Card className="rounded-2xl bg-white/95 dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Our Story</h2>
                            <p className="mt-3 text-slate-600 dark:text-slate-300">
                                Orbit Wallet started as a small team solving a common problem: many people in our communities
                                lacked fast, reliable ways to move money without long queues or complicated bank paperwork. We
                                built an agent-first approach that combines mobile convenience with real-world cash-in/out
                                touchpoints so users can transact how they prefer.
                            </p>

                            <Separator className="my-6" />

                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Our Mission</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-300">
                                Make digital financial services accessible, secure, and trusted — especially for underbanked
                                communities. We focus on frictionless UX, transparent fees, and localized support.
                            </p>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {values.map((v, idx) => (
                                    <div key={idx} className="rounded-lg border p-4 text-center">
                                        <v.icon className={cn("mx-auto mb-3 w-6 h-6", v.iconColor)} />
                                        <p className="font-semibold text-slate-800 dark:text-slate-100">{v.title}</p>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{v.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button>Get Started</Button>
                                <Button variant="ghost">Contact Sales</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Team */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Meet the team</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {team.map((member, i) => (
                                <Card key={i} className="rounded-2xl bg-white/95 dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
                                    <CardContent className="p-4 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <Avatar className="h-20 w-20">
                                                <span className={cn("inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100")}>{member.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
                                            </Avatar>

                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">{member.name}</h4>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">{member.role}</p>
                                                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{member.bio}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sidebar: Contact, Quick stats, FAQ */}
                <aside>
                    <div className="sticky top-24 space-y-6">
                        <Card className="rounded-2xl bg-white/95 dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm">
                            <CardContent className="p-6">
                                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Quick Contact</h4>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Have a question? Reach out and we will reply within 24 hours.</p>

                                <div className="mt-4 grid gap-3">
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-slate-500 dark:text-slate-300 mt-1" />
                                        <div>
                                            <p className="text-sm text-slate-700 dark:text-slate-100">support@orbitwallet.example</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-300">Email us anytime</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-slate-500 dark:text-slate-300 mt-1" />
                                        <div>
                                            <p className="text-sm text-slate-700 dark:text-slate-100">+880 1X XXX XXXX</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-300">Mon-Fri, 9am-6pm</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <Button className="w-full">Contact Support</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl bg-white/95 dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm">
                            <CardContent className="p-6">
                                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Platform Snapshot</h4>
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <div className="rounded-md border px-3 py-2">
                                        <p className="text-xs text-slate-600 dark:text-slate-300">Active Users</p>
                                        <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">50K+</p>
                                    </div>

                                    <div className="rounded-md border px-3 py-2">
                                        <p className="text-xs text-slate-600 dark:text-slate-300">Daily Volume</p>
                                        <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">৳ 4M+</p>
                                    </div>

                                    <div className="rounded-md border px-3 py-2">
                                        <p className="text-xs text-slate-600 dark:text-slate-300">Uptime</p>
                                        <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">99.9%</p>
                                    </div>

                                    <div className="rounded-md border px-3 py-2">
                                        <p className="text-xs text-slate-600 dark:text-slate-300">Support</p>
                                        <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">24/7</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl bg-white/95 dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm">
                            <CardContent className="p-6">
                                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">FAQs</h4>
                                <div className="mt-3 space-y-3">
                                    {faqs.map((f, idx) => (
                                        <details key={idx} className="group">
                                            <summary className="cursor-pointer list-none text-slate-800 dark:text-slate-100 font-medium">{f.q}</summary>
                                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{f.a}</p>
                                        </details>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-4">
                            <Card className="rounded-2xl bg-white/95 dark:bg-slate-900 border-gray-200 dark:border-slate-700 shadow-sm">
                                <CardContent className="p-6">
                                    <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Join our newsletter</h4>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Get product updates and agent program invites.</p>

                                    <form className="mt-4 flex gap-2">
                                        <div className="flex-1">
                                            <Label className="sr-only">Email</Label>
                                            <Input placeholder="you@company.com" aria-label="Email" />
                                        </div>
                                        <Button>Subscribe</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </aside>
            </div>
        </main>
    );
}

