import { Skeleton } from "./skeleton";

export const StatCardSkeleton = () => (
    <div className="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4">
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-8 w-12" />
    </div>
);