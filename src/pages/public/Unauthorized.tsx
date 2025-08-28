import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

export default function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <Card className="max-w-md w-full shadow-lg bg-card/40">
                <CardContent className="flex flex-col items-center text-center space-y-4 p-8">
                    <div className="p-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-full">
                        <AlertTriangle className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Unauthorized Access
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        You don’t have permission to view this page.
                        Please log in with the correct account or go back to the home page.
                    </p>
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                        <Button className="text-white" onClick={() => navigate("/")}>Home</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
