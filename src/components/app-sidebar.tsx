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
import { Skeleton } from "./ui/skeleton"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation().pathname;
  // console.log('location=>', location);
  const { data: profile } = useUserProfileQuery(undefined);
  const items = getSidebarItems(profile?.data?.role)
  // const commonItems = getSidebarItems("COMMON")

  const sortedItems = [
    ...items.filter((item) => item.title === "Dashboard"),
    ...items.filter((item) => item.title !== "Dashboard")
  ]

  return (
    <Sidebar {...props} >
      <SidebarHeader>
        <Logo></Logo>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* <SidebarMenu className="space-y-2">
              {sortedItems.map((item) => (
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

            </SidebarMenu> */}

            <SidebarMenu className="space-y-2">
              {!items || items.length === 0 ? (
                // Skeleton state
                Array.from({ length: 5 }).map((_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton disabled className="px-3 py-2 text-sm font-medium rounded-lg flex gap-2">
                      <Skeleton className="size-4 rounded-md" />
                      <Skeleton className="h-4 w-24 rounded-md" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                // Normal menu render
                sortedItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location === item.url}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 
          ${location === item.url
                          ? "!text-primary bg-primary/10 dark:bg-primary/20"
                          : "text-muted-foreground hover:text-primary hover:bg-muted/30"
                        }`}
                    >
                      <Link to={item.url} className="py-5">
                        <item.icon className="size-4" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator></Separator>
      <SidebarFooter>
        <div>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={profile?.data?.photo} />
              <AvatarFallback>
                <span className="text-xs select-none">
                  {profile?.data?.name
                    ? profile.data.name.slice(0, 2).toUpperCase()
                    : <User />}
                </span>
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-left text-sm leading-tight">
              {/* Name + Role inline */}
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">
                  {profile?.data?.name}
                </span>
                {profile?.data?.role && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {profile.data.role}
                  </span>
                )}
              </div>

              {/* Email below */}
              <span className="truncate text-xs text-muted-foreground">
                {profile?.data?.email}
              </span>
            </div>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
