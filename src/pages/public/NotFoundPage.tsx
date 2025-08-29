import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8  text-center">
            <Card className="p-5 bg-card/40">
                <div className="animate-fade-in">
                    <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        404 Error
                    </Badge>

                    <h1 className="text-6xl sm:text-7xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                        Page Not Found
                    </h1>

                    <p className="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                        Oops! The page you are looking for does not exist or has been moved.
                        Let’s get you back on track.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Button
                            size="lg"
                            className="text-white"
                            onClick={() => navigate("/")}
                        >
                            Go to Home
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </Button>
                    </div>


                </div>
            </Card>
        </div>
    );
}
