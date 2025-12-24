import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import {
    ListChecks,
    Send,
    ShieldCheck,
    Wallet
} from "lucide-react"
import { Link } from "react-router"
// import { Link } from "react-router-dom"

const features = [
    {
        title: "Send Money Instantly",
        description:
            "Transfer money securely to any PayWave user using email or phone number in real time.",
        icon: Send
    },
    {
        title: "Cash-In & Cash-Out",
        description:
            "Deposit or withdraw money easily through authorized PayWave agents nationwide.",
        icon: Wallet
    },
    {
        title: "Secure Digital Wallet",
        description:
            "Your funds are protected with encrypted transactions and JWT-based authentication.",
        icon: ShieldCheck
    },
    {
        title: "Transaction History",
        description:
            "Track all your transactions with advanced filters, pagination, and real-time updates.",
        icon: ListChecks
    },
    // {
    //     title: "Role-Based Dashboard",
    //     description:
    //         "Dedicated dashboards for Users, Agents, and Admins with powerful management tools.",
    //     icon: LayoutDashboard
    // }
]

export default function CoreFeatures() {
    return (
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto mb-14"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Powerful Features for Everyday Payments
                </h2>
                <p className="text-muted-foreground">
                    Everything you need to manage your money securely, quickly,
                    and efficiently — all in one digital wallet.
                </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:shadow-md transition-shadow bg-card/50">
                                <CardHeader>
                                    <div className="mb-4 w-fit rounded-md bg-primary/10 p-3 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-lg">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between h-[120px]">
                                    <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>

                                    <Button
                                        asChild
                                        variant="link"
                                        className="px-0 mt-4 text-primary"
                                    >
                                        <Link to="/features">
                                            Learn more →
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
