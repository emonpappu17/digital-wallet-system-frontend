import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { toast } from "sonner"
import * as z from "zod"

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    subject: z.string().min(3, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function Contact() {
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    const onSubmit = async () => {
        // Simulated submission
        toast.success("Your message has been sent successfully!")
        form.reset()
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-16 space-y-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
            >
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-muted-foreground text-lg">
                    Have questions, feedback, or need support?
                    Our team is here to help you with any PayWave-related inquiry.
                </p>
            </motion.div>

            {/* Content */}
            <div className="grid lg:grid-cols-2 gap-10">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Get in Touch</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary" />
                                <span>emonbafsd@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary" />
                                <span>+880 1648383606</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Support Hours</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            <p>Sunday – Thursday: 9:00 AM – 8:00 PM</p>
                            <p>Friday – Saturday: Limited Support</p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="bg-card/50">
                        <CardHeader>
                            <CardTitle>Send Us a Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-5"
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="you@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="How can we help you?" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        rows={5}
                                                        placeholder="Write your message here..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full text-white">
                                        Send Message
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}

