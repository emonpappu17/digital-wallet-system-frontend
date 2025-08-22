/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle
// } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import Password from "@/components/ui/Password"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { cn } from "@/lib/utils"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { Link } from "react-router"
// import { z } from "zod"

// const formSchema = z.object({
//     name: z
//         .string()
//         .min(2, { message: "Name must be at least 2 characters long." })
//         .max(50, { message: "Name cannot exceed 50 characters." }),
//     email: z
//         .email()
//         .min(5, { message: "Email must be at least 5 characters long." })
//         .max(100, { message: "Email cannot exceed 100 characters." }),
//     phone: z
//         .string()
//         .nonempty('Phone number is required')
//         .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
//             message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
//         }),
//     password: z
//         .string()
//         .min(8, { message: "Password must be at least 8 characters long." })
//         .regex(/^(?=.*[A-Z])/, {
//             message: "Password must contain at least 1 uppercase letter.",
//         })
//         .regex(/^(?=.*[!@#$%^&*])/, {
//             message: "Password must contain at least 1 special character.",
//         })
//         .regex(/^(?=.*\d)/, {
//             message: "Password must contain at least 1 number.",
//         }),
//     confirmPassword: z.string(),
//     role: z.enum(["user", "agent"], {
//         error: (issue) => issue.input === undefined
//             ? "Please select a role"
//             : "Invalid role value"
//     })
// }).refine((data) => data.password === data.confirmPassword, {
//     message: "Password do not match",
//     path: ["confirmPassword"]
// })
// const RegisterForm = ({
//     className,
//     ...props
// }: React.HTMLAttributes<HTMLDivElement>) => {

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             name: '',
//             email: '',
//             phone: '',
//             password: '',
//             confirmPassword: ''
//         },
//     })

//     const onSubmit = (values: z.infer<typeof formSchema>) => {
//         console.log(values, 'asdfasdf');
//     }

//     return (
//         <div className={cn("flex flex-col gap-6", className)} {...props}>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Create Account</CardTitle>
//                     <CardDescription>
//                         Join PayWave and start managing your money
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                             <FormField
//                                 control={form.control}
//                                 name="name"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Full Name</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="Enter your full name" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="email"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Email</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 type="email"
//                                                 placeholder="Enter your email" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="phone"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Phone Number</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 type="tel"
//                                                 placeholder="Enter your phone number" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="role"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Account Type</FormLabel>
//                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                                             <FormControl>
//                                                 <SelectTrigger className="w-full">
//                                                     <SelectValue placeholder="Select account type" />
//                                                 </SelectTrigger>
//                                             </FormControl>
//                                             <SelectContent>
//                                                 <SelectItem value="user">Personal User</SelectItem>
//                                                 <SelectItem value="agent">Service Agent</SelectItem>
//                                             </SelectContent>
//                                         </Select>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="password"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Password</FormLabel>
//                                         <FormControl>
//                                             <Password {...field}></Password>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <FormField
//                                 control={form.control}
//                                 name="confirmPassword"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Confirm Password</FormLabel>
//                                         <FormControl>
//                                             <Password {...field}></Password>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button type="submit" className="w-full text-white">Submit</Button>
//                         </form>
//                     </Form>
//                     <div className="mt-4 text-center text-sm">
//                         Already have an account?{" "}
//                         <Link to="/login" replace className="underline underline-offset-4 hover:text-primary/90">
//                             Login
//                         </Link>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default RegisterForm;



// src/components/auth/RegisterForm.tsx
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useRegisterAgentMutation, useRegisterUserMutation } from "@/redux/features/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type RoleType = "user" | "agent";

const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Name must be at least 2 characters long." })
            .max(100, { message: "Name cannot exceed 100 characters." }),
        email: z.email("Invalid email"),
        phone: z
            .string()
            .nonempty("Phone number is required")
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
                message:
                    "Phone must be Bangladeshi format: +8801XXXXXXXXX or 01XXXXXXXXX",
            }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long." })
            .regex(/(?=.*[A-Z])/, {
                message: "Password must contain at least 1 uppercase letter.",
            })
            .regex(/(?=.*[!@#$%^&*])/, {
                message: "Password must contain at least 1 special character.",
            })
            .regex(/(?=.*\d)/, { message: "Password must contain at least 1 number." }),
        confirmPassword: z.string(),
        role: z.enum(["user", "agent"], {
            error: (issue) =>
                issue.input === undefined ? "Please select a role" : "Invalid role value",
        }),
        shopName: z.string(),
        nidNumber: z.string().optional().or(z.literal("")),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;


const RegisterForm = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const navigate = useNavigate();

    // API Calls
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const [registerAgent, { isLoading: agentRegisterLoading }] = useRegisterAgentMutation();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "user",
            shopName: "",
            nidNumber: "",
        },
    });

    const onSubmit = async (values: RegisterFormValues) => {
        console.log('values===>', values);
        try {
            if (values.role === "user") {
                const userInfo = {
                    name: values.name,
                    email: values.email,
                    phoneNumber: values.phone,
                    password: values.password
                }
                await registerUser(userInfo).unwrap();
                form.reset();
                toast.success("Registration successful! please Login!")
                navigate("/");
            } else {
                const agentInfo = {
                    name: values.name,
                    email: values.email,
                    phoneNumber: values.phone,
                    password: values.password,
                    nidNumber: values.nidNumber,
                    shopName: values.shopName,
                }
                await registerAgent(agentInfo).unwrap();
                toast.success("Registration successful! wait for Admin approval!")
                form.reset();
                navigate("/agent/pending");
            }
        } catch (err: any) {
            console.error("Registration failed", err);
            toast.error(err?.data.message || "Registration failed. Try again.");
        }
    };

    // Helper to show/hide agent-only fields
    const selectedRole = form.watch("role") as RoleType;

    return (
        <div className={cn("flex flex-col gap-6 max-w-lg mx-auto", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>Join PayWave — fast and secure wallet.</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select account type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="user">Personal User</SelectItem>
                                                <SelectItem value="agent">Service Agent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your full name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+8801XXXXXXXXX or 01XXXXXXXXX" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {selectedRole === "agent" && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="shopName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Shop / Business Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Shop name (for agent listing)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="nidNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>NID / Passport Number </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Optional: NID or passport no." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full text-white"
                                disabled={isLoading || agentRegisterLoading}
                            >
                                {isLoading || agentRegisterLoading ? (
                                    <>
                                        <LoadingSpinner size="sm" className="mr-2" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create account'
                                )}
                            </Button>

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="underline  hover:text-primary/90">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterForm;
