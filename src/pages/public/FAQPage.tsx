import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

const faqs = [
    {
        question: "What is PayWave?",
        answer:
            "PayWave is a secure digital wallet platform that allows users to send, receive, deposit, and withdraw money digitally using email or phone number."
    },
    {
        question: "How do I create an account?",
        answer:
            "You can create an account by registering with your email or phone number and selecting a role (User or Agent). After registration, you can log in and start using PayWave services."
    },
    {
        question: "Is PayWave safe to use?",
        answer:
            "Yes. PayWave uses JWT-based authentication, encrypted transactions, and role-based access control to ensure the security of your data and funds."
    },
    {
        question: "How can I add money to my wallet?",
        answer:
            "You can add money to your wallet by visiting an authorized PayWave agent and requesting a cash-in. The agent will deposit funds directly into your wallet."
    },
    {
        question: "Can I withdraw money from my wallet?",
        answer:
            "Yes. Users can withdraw money through authorized agents by requesting a cash-out from their wallet balance."
    },
    {
        question: "Are there any transaction fees?",
        answer:
            "Some transactions may include service fees depending on the transaction type. Fee details are shown clearly before confirming any transaction."
    },
    {
        question: "What should I do if a transaction fails?",
        answer:
            "If a transaction fails, the amount will be automatically reversed. You can also contact PayWave support through the Contact page for assistance."
    },
    {
        question: "Can I use PayWave on mobile devices?",
        answer:
            "Yes. PayWave is fully responsive and optimized for mobile, tablet, and desktop devices."
    }
]

export default function FAQ() {
    return (
        <section className="container mx-auto px-4 py-16 space-y-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
            >
                <h1 className="text-4xl font-bold mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-muted-foreground text-lg">
                    Find answers to common questions about PayWave, account usage,
                    security, and transactions.
                </p>
            </motion.div>

            {/* FAQ Section */}
            <Card className="max-w-3xl mx-auto p-6 bg-card/50">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>
        </section>
    )
}
