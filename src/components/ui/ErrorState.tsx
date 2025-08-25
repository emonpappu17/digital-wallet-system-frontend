/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

export const ErrorState = ({ error, onRetry }: { error: any; onRetry: () => void }) => (
    <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10">
        <CardContent className="p-6">
            <div className="flex items-center justify-center text-center">
                <div className="space-y-4">
                    <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
                    <div>
                        <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                            Failed to Load Data
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-200 mt-1">
                            {error?.data?.message || error?.message || "Something went wrong while fetching agents data."}
                        </p>
                    </div>
                    <Button
                        onClick={onRetry}
                        variant="outline"
                        className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
);