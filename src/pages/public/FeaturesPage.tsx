import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    ShieldCheck,
    Send,
    Wallet,
    Users,
    LineChart,
    Smartphone
} from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router"
import { useUserProfileQuery } from "@/redux/features/authApi"


const features = [
    {
        title: "Instant Money Transfer",
        description:
            "Send money instantly to any PayWave user using email or phone number with real-time confirmation.",
        icon: Send,
        meta: "24/7 • Real-time"
    },
    {
        title: "Secure Digital Wallet",
        description:
            "Your wallet is protected with JWT authentication, encrypted transactions, and role-based access control.",
        icon: Wallet,
        meta: "Bank-grade security"
    },
    {
        title: "Agent Cash-In & Cash-Out",
        description:
            "Deposit or withdraw money through authorized agents across the country seamlessly.",
        icon: Users,
        meta: "Nationwide agents"
    },
    {
        title: "Advanced Transaction Tracking",
        description:
            "View detailed transaction history with filters, pagination, and export-ready data.",
        icon: LineChart,
        meta: "Smart analytics"
    },
    {
        title: "Role-Based Dashboard",
        description:
            "Separate dashboards for Users, Agents, and Admins with powerful management tools.",
        icon: ShieldCheck,
        meta: "Multi-role system"
    },
    {
        title: "Mobile-Friendly Experience",
        description:
            "Fully responsive design optimized for mobile, tablet, and desktop devices.",
        icon: Smartphone,
        meta: "Responsive UI"
    }
]

export default function FeaturesPage() {
    const { data } = useUserProfileQuery(undefined);
    const currentRole = data?.data?.role
    const route = currentRole?.toLowerCase() || 'login';
    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto mb-14"
            >
                <h1 className="text-4xl font-bold mb-4">
                    Powerful Features Built for Modern Digital Payments
                </h1>
                <p className="text-muted-foreground">
                    PayWave provides secure, fast, and user-friendly wallet services
                    designed for individuals, agents, and businesses.
                </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                            <Card className="h-full hover:shadow-lg transition-shadow bg-card/50">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-md bg-primary/10 text-primary">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">
                                                {feature.title}
                                            </CardTitle>
                                            <CardDescription className="text-xs">
                                                {feature.meta}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col justify-between h-[140px]">
                                    <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>

                                    <Button
                                        asChild
                                        variant="link"
                                        className="px-0 mt-3 text-primary"
                                    >
                                        <Link to={`/${route}`}>Explore Feature →</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}

