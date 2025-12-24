import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShieldCheck, Users, Wallet, Target } from "lucide-react"
import { motion } from "framer-motion"

export default function About() {
    return (
        <section className="container mx-auto px-4 py-16 space-y-20">
            {/* Hero / Intro */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
            >
                <h1 className="text-4xl font-bold mb-4">
                    About PayWave
                </h1>
                <p className="text-muted-foreground text-lg">
                    PayWave is a secure digital wallet platform designed to simplify
                    everyday financial transactions through fast, reliable, and
                    user-friendly experiences.
                </p>
            </motion.div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="h-full bg-card/50">
                        <CardHeader>
                            <CardTitle>Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            Our mission is to empower individuals and businesses
                            by providing a trusted digital payment solution that
                            enables instant money transfer, secure wallet
                            management, and financial accessibility for everyone.
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="h-full bg-card/50">
                        <CardHeader>
                            <CardTitle>Our Vision</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            We envision a future where digital payments are
                            seamless, inclusive, and available to people across
                            all regions through a transparent and reliable
                            financial ecosystem.
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Core Values */}
            <div className="space-y-8">
                <div className="text-center max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold mb-3">
                        Our Core Values
                    </h2>
                    <p className="text-muted-foreground">
                        These principles guide every decision we make and every
                        feature we build.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ValueCard
                        icon={ShieldCheck}
                        title="Security First"
                        description="We prioritize the safety of user funds and data with strong authentication and encrypted transactions."
                    />
                    <ValueCard
                        icon={Users}
                        title="User-Centric Design"
                        description="Our platform is designed with simplicity and accessibility to serve users of all experience levels."
                    />
                    <ValueCard
                        icon={Wallet}
                        title="Financial Inclusion"
                        description="We aim to bridge the gap between traditional banking and digital finance for underserved communities."
                    />
                    <ValueCard
                        icon={Target}
                        title="Reliability & Trust"
                        description="Every transaction is built on transparency, accuracy, and system reliability."
                    />
                </div>
            </div>

            <Separator />

            {/* Platform Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto space-y-6 text-center"
            >
                <h2 className="text-3xl font-bold">
                    Why Choose PayWave?
                </h2>
                <p className="text-muted-foreground">
                    PayWave combines modern technology, secure infrastructure,
                    and intuitive design to deliver a reliable digital wallet
                    experience for users, agents, and administrators.
                </p>
                <p className="text-muted-foreground">
                    From instant transfers to role-based dashboards and
                    real-time transaction tracking, PayWave is built to meet
                    modern digital payment needs with confidence.
                </p>
            </motion.div>
        </section>
    )
}

/* ------------------ Value Card Component ------------------ */

function ValueCard({
    icon: Icon,
    title,
    description
}: {
    icon: React.ElementType
    title: string
    description: string
}) {
    return (
        <Card className="h-full text-center bg-card/50">
            <CardHeader>
                <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10 text-primary w-fit">
                    <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                {description}
            </CardContent>
        </Card>
    )
}



