import Logo from "@/assets/icons/Logo"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Link, NavLink } from "react-router"
import { ModeToggle } from "./ModeToggle"
import { authApi, useLogoutMutation, useUserProfileQuery } from "@/redux/features/authApi"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { useAppDispatch } from "@/redux/hook"

const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
    { to: "/user", label: "Dashboard" },
]

export default function Navbar() {
    const { data, isLoading } = useUserProfileQuery(undefined);
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
    console.log('user profile==>', data);

    const handleLogout = async () => {
        await logout(undefined)
        dispatch(authApi.util.resetApiState())
    }
    return (
        <header className="border-b px-4 md:px-6">
            <div className="flex h-16 items-center justify-between gap-4 container mx-auto">
                {/* Left side */}
                <div className="flex items-center ">
                    {/* Mobile menu trigger */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="group size-8 md:hidden"
                                variant="ghost"
                                size="icon"
                            >
                                {/* hamburger icon */}
                                <svg
                                    className="pointer-events-none"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path
                                        d="M4 12L20 12"
                                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                                    />
                                    <path
                                        d="M4 12H20"
                                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                                    />
                                </svg>
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent align="start" className="w-36 p-1 md:hidden">
                            <div className="flex flex-col gap-1">
                                {navigationLinks.map((link, index) => (
                                    <NavLink
                                        key={index}
                                        to={link.to}
                                        className={({ isActive }) =>
                                            `block w-full px-3 py-2 rounded-md text-sm font-medium transition-colors 
             ${isActive
                                                ? "text-primary bg-primary/10 dark:bg-primary/20"
                                                : "text-muted-foreground hover:text-primary hover:bg-muted/30"}`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Main nav */}
                    <div className="flex items-center gap-6">
                        {/* <Link to="/" className="flex items-center">
                            <div className="p-2 rounded-xl ">
                                <Wallet className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold ">PayWave</span>
                        </Link> */}
                        <Logo></Logo>

                        {/* Navigation menu */}
                        <NavigationMenu className="max-md:hidden">
                            <NavigationMenuList className="gap-1">
                                {navigationLinks.map((link, index) => (
                                    <NavigationMenuItem key={index}>
                                        <NavLink
                                            to={link.to}
                                            className={({ isActive }) =>
                                                `relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 
                                               ${isActive
                                                    ? "text-primary bg-primary/10 dark:bg-primary/20"
                                                    : "text-muted-foreground hover:text-primary hover:bg-muted/30"}`
                                            }
                                        >
                                            {link.label}
                                        </NavLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    <ModeToggle></ModeToggle>
                    {
                        data?.data?.email ?
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
                            : !isLoading && <Button asChild className="text-sm text-white" >
                                <Link to={"/login"}>Login</Link>
                            </Button>
                    }
                </div>
            </div>
        </header>
    )
}
