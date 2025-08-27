import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { authApi, useLogoutMutation, useUserProfileQuery } from "@/redux/features/authApi";
import { useAppDispatch } from "@/redux/hook";
import { LogOut, Settings, User } from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";

const DashboardLayout = () => {
    const { data } = useUserProfileQuery(undefined);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout(undefined)
        dispatch(authApi.util.resetApiState())
        navigate("/")
        toast.success("Logout Successful!!")
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 border  justify-between sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50" >
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                    </div>
                    <div className="flex items-center gap-2 ">
                        <ModeToggle></ModeToggle>
                        {
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild className="size-9">
                                    <Avatar>
                                        <AvatarImage src={data?.data?.photo} />
                                        <AvatarFallback>
                                            {/* <User></User> */}
                                            <span className="text-xs select-none">
                                                {data?.data?.name ? data.data.name.slice(0, 2).toUpperCase() : <User></User>}
                                            </span>
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="mt-1">
                                    <DropdownMenuLabel>
                                        {data?.data?.name}
                                        <p className="text-muted-foreground text-sm">{data?.data?.email}</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Settings className="mr-1 h-4 w-4" />
                                        Profile Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-1 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                    </div>

                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet></Outlet>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;