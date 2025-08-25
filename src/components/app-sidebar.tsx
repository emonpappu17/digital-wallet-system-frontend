import * as React from "react"

import Logo from "@/assets/icons/Logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { User } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useUserProfileQuery } from "@/redux/features/authApi"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { Link, useLocation } from "react-router"
import { Separator } from "./ui/separator"

// This is sample data.
// const data = {
//   navMain: [
//     {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "Installation",
//           url: "#",
//         },
//         {
//           title: "Project Structure",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Building Your Application",
//       url: "#",
//       items: [
//         {
//           title: "Routing",
//           url: "#",
//         },
//         {
//           title: "Data Fetching",
//           url: "#",
//           isActive: true,
//         },
//         {
//           title: "Rendering",
//           url: "#",
//         },
//         {
//           title: "Caching",
//           url: "#",
//         },
//         {
//           title: "Styling",
//           url: "#",
//         },
//         {
//           title: "Optimizing",
//           url: "#",
//         },
//         {
//           title: "Configuring",
//           url: "#",
//         },
//         {
//           title: "Testing",
//           url: "#",
//         },
//         {
//           title: "Authentication",
//           url: "#",
//         },
//         {
//           title: "Deploying",
//           url: "#",
//         },
//         {
//           title: "Upgrading",
//           url: "#",
//         },
//         {
//           title: "Examples",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "API Reference",
//       url: "#",
//       items: [
//         {
//           title: "Components",
//           url: "#",
//         },
//         {
//           title: "File Conventions",
//           url: "#",
//         },
//         {
//           title: "Functions",
//           url: "#",
//         },
//         {
//           title: "next.config.js Options",
//           url: "#",
//         },
//         {
//           title: "CLI",
//           url: "#",
//         },
//         {
//           title: "Edge Runtime",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Architecture",
//       url: "#",
//       items: [
//         {
//           title: "Accessibility",
//           url: "#",
//         },
//         {
//           title: "Fast Refresh",
//           url: "#",
//         },
//         {
//           title: "Next.js Compiler",
//           url: "#",
//         },
//         {
//           title: "Supported Browsers",
//           url: "#",
//         },
//         {
//           title: "Turbopack",
//           url: "#",
//         },
//       ],
//     },
//   ],
// }

// Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "/user",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "/",
//     // icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "",
//     // icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     // icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     // icon: Settings,
//   },
// ]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation().pathname;
  // console.log('location=>', location);
  const { data: profile, isLoading } = useUserProfileQuery(undefined);
  console.log(profile?.data?.role);
  const items = getSidebarItems(profile?.data?.role)

  return (
    // <Sidebar {...props}>
    //   <SidebarHeader>
    //     <Logo></Logo>
    //   </SidebarHeader>
    //   <SidebarContent>
    //     {/* We create a SidebarGroup for each parent. */}
    //     {data.navMain.map((item) => (
    //       <SidebarGroup key={item.title}>
    //         <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
    //         <SidebarGroupContent>
    //           <SidebarMenu>
    //             {item.items.map((item) => (
    //               <SidebarMenuItem key={item.title} className="bg-amber-300">
    //                 <SidebarMenuButton asChild isActive={item.isActive}>
    //                   <a href={item.url}>{item.title}</a>
    //                 </SidebarMenuButton>
    //               </SidebarMenuItem>
    //             ))}
    //           </SidebarMenu>
    //         </SidebarGroupContent>
    //       </SidebarGroup>
    //     ))}
    //   </SidebarContent>
    //   <SidebarRail />
    // </Sidebar>

    // <Sidebar {...props}>
    //   <SidebarHeader>
    //     <Logo></Logo>
    //   </SidebarHeader>
    //   <SidebarContent>
    //     <SidebarGroup>
    //       {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
    //       <SidebarGroupContent>
    //         <SidebarMenu className="space-y-3 ">
    //           {items.map((item) => (
    //             <SidebarMenuItem key={item.title} >
    //               <SidebarMenuButton asChild isActive={location === item.url} className={`relative px-3  text-sm font-medium rounded-lg transition-all duration-200 
    //                      ${location === item.url ?
    //                   "relative px-3 py-4 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-none" :
    //                   "text-muted-foreground hover:text-primary hover:bg-muted/30"}`}>
    //                 {/* <a href={item.url}>
    //                   <Home></Home>
    //                   <span>{item.title}</span>
    //                 </a> */}
    //                 <Link
    //                   to={item.url}
    //                   className="py-5 "
    //                 >
    //                   <Home></Home>
    //                   Dashboard
    //                 </Link>
    //               </SidebarMenuButton>

    //             </SidebarMenuItem>
    //           ))}
    //         </SidebarMenu>
    //       </SidebarGroupContent>
    //     </SidebarGroup>
    //   </SidebarContent>
    //   <SidebarFooter>
    //     {/* <SidebarMenu>
    //       <SidebarMenuItem>
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <SidebarMenuButton
    //               size="lg"
    //               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-amber-200"
    //             >
    //               <Avatar className="h-8 w-8 rounded-lg">
    //                 <AvatarImage src={profile?.data.photo} alt={profile?.data.name} />
    //                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
    //               </Avatar>
    //               <div className="grid flex-1 text-left text-sm leading-tight">
    //                 <span className="truncate font-medium">{profile?.data.name}</span>
    //                 <span className="truncate text-xs">{profile?.data.email}</span>
    //               </div>
    //               <ChevronsUpDown className="ml-auto size-4" />
    //             </SidebarMenuButton>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent
    //             className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
    //             // side={isMobile ? "bottom" : "right"}
    //             align="end"
    //             sideOffset={4}
    //           >
    //             <DropdownMenuLabel className="p-0 font-normal">
    //               <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
    //                 <Avatar className="h-8 w-8 rounded-lg">
    //                   <AvatarImage src={profile?.data?.photo} alt={profile?.data?.name} />
    //                   <AvatarFallback className="rounded-lg"><User></User></AvatarFallback>
    //                 </Avatar>
    //                 <div className="grid flex-1 text-left text-sm leading-tight">
    //                   <span className="truncate font-medium">{profile?.data?.name}</span>
    //                   <span className="truncate text-xs">{profile?.data.email}</span>
    //                 </div>
    //               </div>
    //             </DropdownMenuLabel>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuGroup>
    //               <DropdownMenuItem>
    //                 <Sparkles />
    //                 Upgrade to Pro
    //               </DropdownMenuItem>
    //             </DropdownMenuGroup>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuGroup>
    //               <DropdownMenuItem>
    //                 <BadgeCheck />
    //                 Account
    //               </DropdownMenuItem>
    //               <DropdownMenuItem>
    //                 <CreditCard />
    //                 Billing
    //               </DropdownMenuItem>
    //               <DropdownMenuItem>
    //                 <Bell />
    //                 Notifications
    //               </DropdownMenuItem>
    //             </DropdownMenuGroup>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem>
    //               <LogOut />
    //               Log out
    //             </DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </SidebarMenuItem>
    //     </SidebarMenu> */}
    //     <div>
    //       <SidebarMenuButton
    //         size="lg"
    //         className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
    //       >

    //         <Avatar className="h-8 w-8 rounded-lg">
    //           <AvatarImage src={profile?.data?.photo} />
    //           <AvatarFallback><User></User></AvatarFallback>
    //         </Avatar>
    //         <div className="grid flex-1 text-left text-sm leading-tight">
    //           <span className="truncate font-medium">{profile?.data?.name}</span>
    //           <span className="truncate text-xs">{profile?.data.email}</span>
    //         </div>
    //         {/* <ChevronsUpDown className="ml-auto size-4" /> */}
    //       </SidebarMenuButton>
    //     </div>
    //   </SidebarFooter>
    // </Sidebar>

    <Sidebar {...props} >
      <SidebarHeader>
        <Logo></Logo>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild isActive={location === item.url} className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 
                     ${location === item.url ?
                      "!text-primary bg-primary/10 dark:bg-primary/20" :
                      "text-muted-foreground hover:text-primary hover:bg-muted/30"}`}>
                    <Link
                      to={item.url}
                      className="py-5 "
                    >
                      <item.icon className="size-4"></item.icon>
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator></Separator>
      <SidebarFooter>
        <div>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={profile?.data?.photo} />
              <AvatarFallback>
                <span className="text-xs select-none">
                  {profile?.data?.name ? profile.data.name.slice(0, 2).toUpperCase() : <User></User>}
                </span>
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{profile?.data?.name}</span>
              <span className="truncate text-xs">{profile?.data.email}</span>
            </div>
            {/* <ChevronsUpDown className="ml-auto size-4" /> */}
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
