/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { authApi, useLoginMutation } from "@/redux/features/authApi"
import { useAppDispatch } from "@/redux/hook"
import { IRole } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import z from "zod"


const loginSchema = z.object({
    identifier: z
        .string()
        .nonempty("Email or phone number is required")
        .refine(
            (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                const phoneRegex = /^(?:\+8801\d{9}|01\d{9})$/
                return emailRegex.test(value) || phoneRegex.test(value)
            },
            { message: "Must be a valid email or Bangladeshi phone number" }
        ),
    password: z
        .string()

})

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    // const { data, isLoading: userLoading } = useUserProfileQuery(undefined);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    // API Call
    const [login, { isLoading }] = useLoginMutation();
    // const []=authApi.endpoints.useUserProfileQuery()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            // api call
            const { identifier, password } = values;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmail = emailRegex.test(identifier);

            const payload = isEmail
                ? { email: identifier, password }
                : { phoneNumber: identifier, password };

            const res = await login(payload).unwrap();
            const role = res?.data?.user?.role;

            dispatch(authApi.util.resetApiState())

            // console.log('role==>', role);

            if (role === IRole.AGENT) {
                navigate("/agent");
                toast.success("Welcome to Agent Dashboard");
            } else if (role === IRole.USER) {
                navigate("/user");
                toast.success("Welcome to User Dashboard");

            } else if (role === IRole.ADMIN) {
                navigate("/admin");
                toast.success("Welcome to Admin Dashboard");
            } else {
                navigate("/unauthorized");
                toast.error("Unauthorized access");
            }

            // console.log("res login==>", res);
        } catch (err: any) {
            console.error("Login failed", err);
            toast.error(err?.data?.message || "Login failed. Try again.");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <Card className="bg-card/45">
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

                        {/* Demo Credentials */}
                        <div className="border-t mt-3 pt-3 text-center">
                            <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                            <div className="space-y-1 text-xs text-muted-foreground">
                                <p><strong>User:</strong> neymar@gmail.com | 12345678</p>
                                <p><strong>Agent:</strong> luka@gmail.com | 12345678</p>
                                <p><strong>Admin:</strong> jhankarmahbub@gmail.com | 12345678</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

