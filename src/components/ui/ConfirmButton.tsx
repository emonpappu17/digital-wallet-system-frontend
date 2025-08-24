// import { useState } from "react";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { type VariantProps } from "class-variance-authority"; // Import if using cva for Button variants, otherwise omit
// import type { ButtonProps } from "@/components/ui/button"; // Adjust based on your Button component type

// interface ActionButtonWithConfirmProps extends Omit<ButtonProps, "onClick"> {
//   icon: React.ReactNode;
//   dialogTitle: string;
//   dialogDescription: string;
//   onConfirm: () => void | Promise<void>;
//   confirmText?: string;
//   cancelText?: string;
// }

// export function ActionButtonWithConfirm({
//   icon,
//   dialogTitle,
//   dialogDescription,
//   onConfirm,
//   confirmText = "Continue",
//   cancelText = "Cancel",
//   ...buttonProps
// }: ActionButtonWithConfirmProps) {
//   const [open, setOpen] = useState(false);

//   const handleConfirm = async () => {
//     await onConfirm();
//     setOpen(false);
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <Button size="sm" {...buttonProps}>
//           {icon}
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
//           <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>{cancelText}</AlertDialogCancel>
//           <AlertDialogAction onClick={handleConfirm} className="text-white">
//             {confirmText}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/features/modalSlice";
// import type { VariantProps } from "class-variance-authority"; // Import if using cva for Button variants, otherwise omit

interface ActionButtonWithConfirmProps extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
    icon: React.ReactNode;
    dialogTitle: string;
    dialogDescription: string;
    onConfirm: () => void | Promise<void>;
    confirmText?: string;
    cancelText?: string;
}

export function ActionButtonWithConfirm({
    icon,
    dialogTitle,
    dialogDescription,
    onConfirm,
    confirmText = "Continue",
    cancelText = "Cancel",
    ...buttonProps
}: ActionButtonWithConfirmProps) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleConfirm = async () => {
        await onConfirm();
        setOpen(false);
        dispatch(closeModal())
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" {...buttonProps}>
                    {icon}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} className="text-white">
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}