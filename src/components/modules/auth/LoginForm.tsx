/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { cn } from "@/lib/utils"
// import { Link } from "react-router"

// export function LoginForm({
//     className,
//     ...props
// }: React.ComponentProps<"div">) {
//     return (
//         <div className={cn("flex flex-col gap-6", className)} {...props}>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Login to your account</CardTitle>
//                     <CardDescription>
//                         Enter your email below to login to your account
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form>
//                         <div className="flex flex-col gap-6">
//                             <div className="grid gap-3">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     required
//                                 />
//                             </div>
//                             <div className="grid gap-3">
//                                 <div className="flex items-center">
//                                     <Label htmlFor="password">Password</Label>
//                                     <a
//                                         href="#"
//                                         className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                                     >
//                                         Forgot your password?
//                                     </a>
//                                 </div>
//                                 <Input id="password" type="password" required />
//                             </div>
//                             <div className="flex flex-col gap-3">
//                                 <Button type="submit" className="w-full text-white">
//                                     Login
//                                 </Button>

//                             </div>
//                         </div>
//                         <div className="mt-4 text-center text-sm">
//                             Don&apos;t have an account?{" "}
//                             {/* <Link className="underline underline-offset-4" replace to={"register"}>Sign Up</Link> */}
//                             <Link to="/register" replace className="underline underline-offset-4">
//                                 Register
//                             </Link>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Password from "@/components/ui/Password"
import { LoadingSpinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { useLoginMutation } from "@/redux/features/authApi"
import { zodResolver } from "@hookform/resolvers/zod"
import { log } from "console"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import z from "zod"


// ✅ Schema for login: accept either email OR phone number
const loginSchema = z.object({
    identifier: z
        .string()
        .nonempty("Email or phone number is required")
        .refine(
            (value) => {
                // Check if it's a valid email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                // Check if it's a valid BD phone number
                const phoneRegex = /^(?:\+8801\d{9}|01\d{9})$/
                return emailRegex.test(value) || phoneRegex.test(value)
            },
            { message: "Must be a valid email or Bangladeshi phone number" }
        ),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
})

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();

    // API Call
    const [login, { isLoading }] = useLoginMutation();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })


    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        console.log('values===>', values);
        try {
            // api call
            const { identifier, password } = values;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmail = emailRegex.test(identifier);

            const payload = isEmail ? { email: identifier, password } : { phoneNumber: identifier, password }

            const res = await login(payload).unwrap();
            console.log('login res:==>', res);
            toast.success("Logged in Successful!!")
            navigate("/")
        } catch (err: any) {
            console.error("Login failed", err);
            toast.error(err?.data.message || "Login failed. Try again.");
        }
    };
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Access your PayWave account with your email or phone number
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Email or Phone field */}
                            <FormField
                                control={form.control}
                                name="identifier"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email or Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email or phone number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password field */}
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
                            {/* 
                            <Button type="submit" className="w-full text-white">
                                Login
                            </Button> */}

                            <Button
                                type="submit"
                                className="w-full text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner size="sm" className="mr-2" />
                                        Logging...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" replace className="underline underline-offset-4 hover:text-primary/90">
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

