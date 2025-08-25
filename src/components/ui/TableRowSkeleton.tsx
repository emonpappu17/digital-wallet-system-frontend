// import { Skeleton } from "./skeleton";
// import { TableCell, TableRow } from "./table";

// export const TableRowSkeleton = () => (
//     <TableRow>
//         <TableCell>
//             <div className="flex items-center gap-3">
//                 <Skeleton className="h-9 w-9 rounded-full" />
//                 <div className="flex flex-col gap-1">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="h-3 w-20" />
//                 </div>
//             </div>
//         </TableCell>
//         <TableCell><Skeleton className="h-4 w-20" /></TableCell>
//         <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
//         <TableCell><Skeleton className="h-4 w-24" /></TableCell>
//         <TableCell><Skeleton className="h-4 w-8" /></TableCell>
//         <TableCell><Skeleton className="h-4 w-16" /></TableCell>
//         <TableCell><Skeleton className="h-4 w-16" /></TableCell>
//         <TableCell className="text-right">
//             <div className="flex items-center justify-end gap-2">
//                 <Skeleton className="h-8 w-20" />
//                 <Skeleton className="h-8 w-20" />
//                 <Skeleton className="h-8 w-10" />
//             </div>
//         </TableCell>
//     </TableRow>
// );


import { Skeleton } from "./skeleton";
import { TableCell, TableRow } from "./table";

interface TableRowSkeletonProps {
    columns?: number;
}

export const TableRowSkeleton = ({ columns = 8 }: TableRowSkeletonProps) => {
    const renderSkeletonCell = (index: number) => {
        // First column always has avatar + name structure
        if (index === 0) {
            return (
                <TableCell key={index}>
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                </TableCell>
            );
        }

        // Last column always has action buttons
        if (index === columns - 1) {
            return (
                <TableCell key={index} className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-10" />
                    </div>
                </TableCell>
            );
        }

        // Middle columns have different skeleton patterns
        const skeletonPatterns = [
            <Skeleton className="h-4 w-20" />, // Generic text
            <Skeleton className="h-6 w-16 rounded-full" />, // Badge-like
            <Skeleton className="h-4 w-24" />, // Date-like
            <Skeleton className="h-4 w-8" />, // Number
            <Skeleton className="h-4 w-16" />, // Currency
            <Skeleton className="h-4 w-16" />, // Currency
        ];

        return (
            <TableCell key={index}>
                {skeletonPatterns[(index - 1) % skeletonPatterns.length]}
            </TableCell>
        );
    };

    return (
        <TableRow>
            {Array.from({ length: columns }, (_, index) => renderSkeletonCell(index))}
        </TableRow>
    );
};