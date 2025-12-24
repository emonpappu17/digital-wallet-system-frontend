import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    UserPlus,
    Wallet,
    Send,
    ListChecks
} from "lucide-react"
import { motion } from "framer-motion"

const steps = [
    {
        title: "Create an Account",
        description:
            "Register with your email or phone number and get instant access to your PayWave wallet.",
        icon: UserPlus
    },
    {
        title: "Add Money via Agent",
        description:
            "Visit a nearby authorized agent to deposit money securely into your wallet.",
        icon: Wallet
    },
    {
        title: "Send or Withdraw Instantly",
        description:
            "Transfer money to other users or withdraw cash anytime with real-time confirmation.",
        icon: Send
    },
    {
        title: "Track Transactions",
        description:
            "Monitor all your activities with detailed transaction history and smart filters.",
        icon: ListChecks
    }
]

export default function HowItWorks() {
    return (
        <section className="max-w-5xl mx-auto px-4 py-20">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    How PayWave Works
                </h2>
                <p className="text-muted-foreground">
                    Get started with PayWave in just a few simple steps
                    and manage your money effortlessly.
                </p>
            </motion.div>

            {/* Steps */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <Card className="h-full text-center hover:shadow-md transition-shadow bg-card/50">
                                <CardHeader>
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                                        {index + 1}
                                    </div>
                                    <div className="mx-auto mb-3 w-fit rounded-md bg-primary/10 p-3 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-lg">
                                        {step.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    {step.description}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
