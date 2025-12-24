import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useUserProfileQuery } from '@/redux/features/authApi';
import {
    ArrowRight,
    CheckCircle,
    Globe,
    Shield,
    Star,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { Link } from 'react-router';
import { motion } from "framer-motion";
import CoreFeatures from './CoreFeatures';
import HowItWorks from './HowItWorks';

const HeroSection = () => {
    const { data } = useUserProfileQuery(undefined);
    const currentRole = data?.data?.role
    const route = currentRole?.toLowerCase() || 'login';

    const features = [
        { icon: Shield, text: "Bank-level Security" },
        { icon: Zap, text: "Instant Transfers" },
        { icon: Globe, text: "24/7 Available" },
        { icon: Users, text: "Multi-role Support" }
    ];

    const stats = [
        { value: "50K+", label: "Active Users" },
        { value: "₹10M+", label: "Transactions" },
        { value: "99.9%", label: "Uptime" },
        { value: "24/7", label: "Support" }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden ">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-3" />
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-10 dark:bg-slate-800 bg-blue-200" />
            <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-10 dark:bg-slate-800 bg-purple-200" />

            {/* Main Hero Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <Badge
                            variant="secondary"
                            className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 border-blue-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                        >
                            <Star className="w-4 h-4 mr-2" />
                            #1 Digital Wallet Platform
                        </Badge>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-slate-100 mb-6 leading-tight"
                    >
                        Your Digital
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-sky-400 dark:to-indigo-400 ml-4">
                            Wallet
                        </span>
                        <br />
                        <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-700 dark:text-slate-300 font-semibold">
                            Reimagined
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="text-xl sm:text-2xl text-gray-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        Experience seamless financial transactions with our secure, fast, and reliable digital wallet platform.
                        Perfect for users, agents, and businesses alike.
                    </motion.p>

                    {/* Feature Pills */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.15 }
                            }
                        }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex items-center gap-2 bg-white/90 dark:bg-slate-800/95 rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-slate-700"
                            >
                                <feature.icon className="w-4 h-4 text-blue-600 dark:text-sky-300" />
                                <span className="text-sm font-medium text-gray-700 dark:text-slate-200">{feature.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Link to={`/${route}`}>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Get Started Today
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link to={"/about"}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-4 text-lg font-semibold border-2 border-gray-300 dark:border-slate-700 dark:hover:bg-slate-800 transition-all duration-300"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.15 } }
                        }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="bg-card/40 shadow-sm transition-all duration-300 transform hover:scale-102">
                                    <CardContent className="p-6 text-center">
                                        <div className="text-3xl font-bold text-primary mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-600 dark:text-slate-300 font-medium">
                                            {stat.label}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="bg-card/40 rounded-2xl p-8 shadow-lg "
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">
                            Trusted by Everyone
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">Individual Users</h4>
                                <p className="text-gray-600 dark:text-slate-300">Personal wallet management with ease</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">Business Agents</h4>
                                <p className="text-gray-600 dark:text-slate-300">Streamlined cash-in/out operations</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">Administrators</h4>
                                <p className="text-gray-600 dark:text-slate-300">Complete system oversight and control</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Security Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-12 flex justify-center"
                    >
                        <div className="flex items-center gap-2 bg-green-800/10 dark:bg-green-900/20 text-green-500 dark:text-green-300 px-4 py-2 rounded-full border border-green-200 dark:border-green-700">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">SSL Encrypted & Fully Secured</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <CoreFeatures></CoreFeatures>

            <HowItWorks></HowItWorks>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg className="w-full h-24 fill-current text-white dark:text-slate-900" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
                </svg>
            </div>
        </div>
    );
};

export default HeroSection;


