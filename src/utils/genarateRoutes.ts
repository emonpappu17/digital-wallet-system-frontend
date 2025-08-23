import { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
    return sidebarItems.map((item) => ({
        path: item.url,
        Component: item.component
    }))
}