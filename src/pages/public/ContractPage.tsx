/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";

import { motion } from "framer-motion";

export default function ContactPage() {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        toast.success("Your message has been sent successfully!");
    };

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-slate-800 dark:text-slate-200">
                    <Send className="w-4 h-4 mr-2" />
                    Contact Us
                </Badge>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                    Get in Touch
                </h1>

                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Have questions about Orbit Wallet? Reach out via the form below or use our contact details. Our team responds within 24 hours.
                </p>
            </motion.div>

            <motion.div
                className="mt-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                <Card className="rounded-2xl bg-card/40 shadow-sm">
                    <CardContent className="p-6">
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Contact Details */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Contact Information</h2>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    We're here to help with any inquiries about our services, partnerships, or support.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-slate-500 dark:text-slate-300 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-100">Email</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">support@orbitwallet.example</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-slate-500 dark:text-slate-300 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-100">Phone</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">+880 1X XXX XXXX (Mon-Fri, 9am-6pm)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Send className="w-5 h-5 text-slate-500 dark:text-slate-300 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-100">Address</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Dhaka, Bangladesh</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Inquiry Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-100">
                                            Name
                                        </Label>
                                        <Input id="name" name="name" placeholder="Your name" required className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-100">
                                            Email
                                        </Label>
                                        <Input id="email" name="email" type="email" placeholder="your@email.com" required className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-100">
                                            Subject
                                        </Label>
                                        <Input id="subject" name="subject" placeholder="How can we help?" required className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-100">
                                            Message
                                        </Label>
                                        <Textarea id="message" name="message" placeholder="Your message here..." required className="mt-1 min-h-[120px]" />
                                    </div>
                                    <Button type="submit" className="w-full text-white">
                                        Submit Inquiry
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    );
}
