import { Search } from "lucide-react";
import { Card, CardContent } from "./card";

export const EmptyState = () => (
    <Card className="border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/10">
        <CardContent className="p-12">
            <div className="flex items-center justify-center text-center">
                <div className="space-y-4">
                    <div className="h-12 w-12 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Search className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            No Result Found
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Try adjusting your search criteria or filters.
                        </p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);