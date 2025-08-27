

const DashboardHomeTableSkeleton = () => {
    return (
        <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-lg animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        <div>
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardHomeTableSkeleton;