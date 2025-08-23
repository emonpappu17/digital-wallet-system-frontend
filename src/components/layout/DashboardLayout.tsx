import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, Outlet, useNavigate } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { authApi, useLogoutMutation, useUserProfileQuery } from "@/redux/features/authApi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { Button } from "../ui/button";
import { toast } from "sonner";

const DashboardLayout = () => {
    const { data, isLoading } = useUserProfileQuery(undefined);
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
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 border  justify-between">
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
                            data?.data?.email ?
                                <DropdownMenu >
                                    <DropdownMenuTrigger asChild className="size-9">
                                        <Avatar>
                                            <AvatarImage src={data?.data?.photo} />
                                            <AvatarFallback><User></User></AvatarFallback>
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
                                : !isLoading && <Button asChild className="text-sm text-white" >
                                    <Link to={"/login"}>Login</Link>
                                </Button>
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