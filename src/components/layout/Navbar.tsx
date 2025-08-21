// // import Logo from "@/components/navbar-components/logo"
// import { Button } from "@/components/ui/button"
// import {
//     NavigationMenu,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
// } from "@/components/ui/navigation-menu"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import { Wallet } from "lucide-react"
// import { Link } from "react-router"

// // Navigation links array to be used in both desktop and mobile menus
// const navigationLinks = [
//     { href: "#", label: "Home", active: true },
//     { href: "#", label: "Features" },
//     { href: "#", label: "Pricing" },
//     { href: "#", label: "About" },
// ]

// export default function Navbar() {
//     return (
//         <header className="border-b px-4 md:px-6">
//             <div className="flex h-16 items-center justify-between gap-4 container mx-auto">
//                 {/* Left side */}
//                 <div className="flex items-center gap-2">
//                     {/* Mobile menu trigger */}
//                     <Popover>
//                         <PopoverTrigger asChild>
//                             <Button
//                                 className="group size-8 md:hidden"
//                                 variant="ghost"
//                                 size="icon"
//                             >
//                                 <svg
//                                     className="pointer-events-none"
//                                     width={16}
//                                     height={16}
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M4 12L20 12"
//                                         className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
//                                     />
//                                     <path
//                                         d="M4 12H20"
//                                         className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
//                                     />
//                                     <path
//                                         d="M4 12H20"
//                                         className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
//                                     />
//                                 </svg>
//                             </Button>
//                         </PopoverTrigger>
//                         <PopoverContent align="start" className="w-36 p-1 md:hidden">
//                             <NavigationMenu className="max-w-none *:w-full">
//                                 <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
//                                     {navigationLinks.map((link, index) => (
//                                         <NavigationMenuItem key={index} className="w-full">
//                                             <NavigationMenuLink
//                                                 href={link.href}
//                                                 className="py-1.5"
//                                                 active={link.active}
//                                             >
//                                                 {link.label}
//                                             </NavigationMenuLink>
//                                         </NavigationMenuItem>
//                                     ))}
//                                 </NavigationMenuList>
//                             </NavigationMenu>
//                         </PopoverContent>
//                     </Popover>
//                     {/* Main nav */}
//                     <div className="flex items-center gap-6">
//                         <a href="#" className="text-primary hover:text-primary/90">
//                             {/* <Logo /> */}
//                             <Link to="/" className="flex items-center">
//                                 <div className="p-2 bg-gradient-primary rounded-xl">
//                                     <Wallet className="h-6 w-6 text-white" />
//                                 </div>
//                                 <span className="text-xl font-bold ">PayWave</span>
//                             </Link>

//                         </a>
//                         {/* Navigation menu */}
//                         <NavigationMenu className="max-md:hidden">
//                             <NavigationMenuList className="gap-2">
//                                 {navigationLinks.map((link, index) => (
//                                     <NavigationMenuItem key={index}>
//                                         <NavigationMenuLink
//                                             active={link.active}
//                                             href={link.href}
//                                             className="text-muted-foreground hover:text-primary py-1.5 font-medium "
//                                         >
//                                             {link.label}
//                                         </NavigationMenuLink>
//                                     </NavigationMenuItem>
//                                 ))}
//                             </NavigationMenuList>
//                         </NavigationMenu>
//                     </div>
//                 </div>
//                 {/* Right side */}
//                 <div className="flex items-center gap-2">
//                     <Button asChild variant="ghost" size="sm" className="text-sm">
//                         <a href="#">Sign In</a>
//                     </Button>
//                     <Button asChild size="sm" className="text-sm btn-gradient">
//                         <a href="#">Get Started</a>
//                     </Button>
//                 </div>
//             </div>
//         </header>
//     )
// }


//////////////////////////


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
import { Wallet } from "lucide-react"
import { Link, NavLink } from "react-router"
// import { Link, NavLink } from "react-router-dom"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
]

export default function Navbar() {
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
                        <Link to="/" className="flex items-center">
                            <div className="p-2 rounded-xl bg-gradient-primary">
                                <Wallet className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold">PayWave</span>
                        </Link>

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
                    <Button asChild variant="ghost" size="sm" className="text-sm">
                        <Link to="/signin">Sign In</Link>
                    </Button>
                    <Button asChild size="sm" className="text-sm btn-gradient">
                        <Link to="/get-started">Get Started</Link>
                    </Button>
                </div>
            </div>
        </header>

        // <header className="border-b px-4 md:px-6">
        //     <div className="flex h-16 items-center justify-between gap-4">
        //         {/* Left side */}
        //         <div className="flex items-center gap-2">
        //             {/* Mobile menu trigger */}
        //             <Popover>
        //                 <PopoverTrigger asChild>
        //                     <Button
        //                         className="group size-8 md:hidden"
        //                         variant="ghost"
        //                         size="icon"
        //                     >
        //                         <svg
        //                             className="pointer-events-none"
        //                             width={16}
        //                             height={16}
        //                             viewBox="0 0 24 24"
        //                             fill="none"
        //                             stroke="currentColor"
        //                             strokeWidth="2"
        //                             strokeLinecap="round"
        //                             strokeLinejoin="round"
        //                             xmlns="http://www.w3.org/2000/svg"
        //                         >
        //                             <path
        //                                 d="M4 12L20 12"
        //                                 className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        //                             />
        //                             <path
        //                                 d="M4 12H20"
        //                                 className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        //                             />
        //                             <path
        //                                 d="M4 12H20"
        //                                 className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        //                             />
        //                         </svg>
        //                     </Button>
        //                 </PopoverTrigger>
        //                 <PopoverContent align="start" className="w-36 p-1 md:hidden">
        //                     <NavigationMenu className="max-w-none *:w-full">
        //                         <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
        //                             {navigationLinks.map((link, index) => (
        //                                 <NavigationMenuItem key={index} className="w-full">
        //                                     <NavigationMenuLink
        //                                         // href={link.href}
        //                                         className="py-1.5"
        //                                         // active={link.active}
        //                                     >
        //                                         {link.label}
        //                                     </NavigationMenuLink>




        //                                 </NavigationMenuItem>
        //                             ))}
        //                         </NavigationMenuList>
        //                     </NavigationMenu>
        //                 </PopoverContent>
        //             </Popover>
        //             {/* Main nav */}
        //             <div className="flex items-center gap-6">
        //                 {/* <a href="#" className="text-primary hover:text-primary/90">
        //                     <Logo />
        //                 </a> */}
        //                 <Link to="/" className="flex items-center">
        //                     <div className="p-2 rounded-xl bg-gradient-primary">
        //                         <Wallet className="h-6 w-6 text-white" />
        //                     </div>
        //                     <span className="text-xl font-bold">PayWave</span>
        //                 </Link>
        //                 {/* Navigation menu */}
        //                 <NavigationMenu className="max-md:hidden">
        //                     <NavigationMenuList className="gap-2">
        //                         {navigationLinks.map((link, index) => (
        //                             <NavigationMenuItem key={index}>
        //                                 {/* <NavigationMenuLink
        //                                     active={link.active}
        //                                     href={link.href}
        //                                     className="text-muted-foreground hover:text-primary py-1.5 font-medium"
        //                                 >
        //                                     {link.label}
        //                                 </NavigationMenuLink> */}


        //                                 <NavigationMenuItem key={index}>
        //                                     <NavLink
        //                                         to={link.to}
        //                                         className={({ isActive }) =>
        //                                             `relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 
        //                                         ${isActive
        //                                                 ? "text-primary bg-primary/10 dark:bg-primary/20"
        //                                                 : "text-muted-foreground hover:text-primary hover:bg-muted/30"}`
        //                                         }
        //                                     >
        //                                         {link.label}
        //                                     </NavLink>
        //                                 </NavigationMenuItem>
        //                             </NavigationMenuItem>
        //                         ))}
        //                     </NavigationMenuList>
        //                 </NavigationMenu>
        //             </div>
        //         </div>
        //         {/* Right side */}
        //         <div className="flex items-center gap-2">
        //             <Button asChild variant="ghost" size="sm" className="text-sm">
        //                 <a href="#">Sign In</a>
        //             </Button>
        //             <Button asChild size="sm" className="text-sm">
        //                 <a href="#">Get Started</a>
        //             </Button>
        //         </div>
        //     </div>
        // </header>
    )
}
