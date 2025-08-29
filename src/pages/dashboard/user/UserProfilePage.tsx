/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Password from '@/components/ui/Password';
import { Separator } from '@/components/ui/separator';
import { useUserProfileQuery } from '@/redux/features/authApi';
import { useUpdateProfileMutation } from '@/redux/features/userApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
    Calendar,
    HelpCircle,
    Key,
    Mail,
    Phone,
    Settings,
    User
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    phone: z.string()
        // .nonempty("Phone number is required")
        .regex(/^01\d{9}$/, {
            message: "Phone must be Bangladeshi format: 01XXXXXXXXX",
        }).optional()
});

const passwordSchema = z.object({
    currentPassword: z.string().min(6, 'Current password is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export const UserProfilePage = () => {

    // API Calls
    const { data } = useUserProfileQuery(undefined);
    const [updateProfile] = useUpdateProfileMutation();
    const user = data?.data;
    
    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name ?? '',
            phone: user?.phoneNumber ?? '',
        },
    });

    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onProfileSubmit = async (data: ProfileFormData) => {
        try {
            if (user?.phoneNumber === data.phone && user?.name === data.name) return

            const payload = { name: data.name, phoneNumber: user?.phoneNumber === data.phone ? "" : data.phone }
            await updateProfile(payload).unwrap();
            toast.success('Profile updated successfully!');
        } catch (error: any) {
            console.log("profile update error:", error);
            toast.error(error?.data.message || 'Failed to update profile. Please try again.');
        }
    };

    const onPasswordSubmit = async (data: PasswordFormData) => {
        try {
            const payload = { oldPassword: data.currentPassword, newPassword: data.newPassword }
            await updateProfile(payload).unwrap();
            toast.success('Password changed successfully!');
            passwordForm.reset();
        } catch (error: any) {
            console.log("pass update error:", error);
            toast.error(error?.data.message || 'Failed to change password. Please try again.');
        }
    };

    const handleRestartTour = () => {
        toast.success('Tour reset! The guide will start on your next dashboard visit.');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center md:text-left"
            >
                <div className="flex items-center gap-2 justify-center  mb-2">
                    <User className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                </div>
                <p className="text-muted-foreground text-center">Manage your account information and preferences</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Info Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card className='bg-card/45'>
                        <CardContent className="p-6">
                            <div className="text-center">
                                <Avatar className="w-24 h-24 mx-auto mb-4">
                                    <AvatarFallback className="text-2xl">
                                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-semibold mb-2">{user?.name}</h3>
                                <Badge className="mb-4 capitalize text-white">{user?.role}</Badge>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        <span>{user?.phoneNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                    {/* {user?.role === 'USER' && user?.balance !== undefined && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Shield className="h-4 w-4" />
                                            <span>Balance: ${user.balance.toFixed(2)}</span>
                                        </div>
                                    )} */}


                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Forms */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="lg:col-span-2 space-y-8"
                >
                    {/* Profile Information */}
                    <Card className='bg-card/45'>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Profile Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...profileForm}>
                                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                                    <FormField
                                        control={profileForm.control}
                                        name="name"
                                        defaultValue={user?.name}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input

                                                        placeholder="Enter your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={profileForm.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input

                                                        placeholder="Enter your phone number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div>
                                        <FormLabel>Email Address</FormLabel>
                                        <Input value={user?.email || ''} disabled className="bg-muted" />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Email address cannot be changed. Contact support if needed.
                                        </p>
                                    </div>

                                    <Button type="submit" className='text-white' disabled={profileForm.formState.isSubmitting}>
                                        {profileForm.formState.isSubmitting ? 'Updating...' : 'Update Profile'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    {/* Change Password */}
                    <Card className='bg-card/45'>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Key className="h-5 w-5" />
                                Change Password
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                                    <FormField
                                        control={passwordForm.control}
                                        name="currentPassword"
                                        render={({ field }) => (

                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Password {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={passwordForm.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Password {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={passwordForm.control}
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

                                    <Button type="submit" className='text-white' disabled={passwordForm.formState.isSubmitting}>
                                        {passwordForm.formState.isSubmitting ? 'Changing...' : 'Change Password'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    {/* App Preferences */}
                    <Card className='bg-card/45'>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5" />
                                App Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="font-medium mb-2">Guided Tour</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {/* {tourCompleted
                                        ? 'You have completed the guided tour. Restart it to see the walkthrough again.'
                                        : 'The guided tour will help you navigate the dashboard features.'
                                    } */}
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={handleRestartTour}
                                    className="flex items-center gap-2"
                                >
                                    <HelpCircle className="h-4 w-4" />
                                    {/* {tourCompleted ? 'Restart Tour' : 'Reset Tour Progress'} */}
                                </Button>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-medium mb-2">Account Status</h4>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                        Verified Account
                                    </Badge>
                                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                                        Security Enabled
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};