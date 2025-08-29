import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Hourglass } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion"

const AgentPendingPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center ">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <Card className="rounded-2xl shadow-xl border bg-card/40">
                    <CardHeader className="text-center space-y-2">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                            <Hourglass className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Application Under Review</CardTitle>
                        <CardDescription className="text-base">
                            Your request to become an agent has been submitted successfully.
                            Our team will review your application shortly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Once approved, you’ll gain full access to the agent dashboard and tools.
                            This usually takes time
                        </p>
                        <div className="flex flex-col gap-3">

                            <Link to={'/'}>
                                <Button variant="default" className="w-full text-white">
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    Go Back to Home
                                </Button>
                            </Link>
                            {/* <Button variant="default" className="w-full">
                            Check Application Status
                        </Button> */}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>


        </div>
    );
};

export default AgentPendingPage;