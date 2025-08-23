import { adminSidebarItems } from "@/routes/adminSIdebarItems";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import { IRole } from "@/types";

export const getSidebarItems = (userRole: IRole) => {
    switch (userRole) {
        case IRole.ADMIN:
            return [...adminSidebarItems]
        case IRole.AGENT:
            return [...agentSidebarItems]
        case IRole.USER:
            return [...userSidebarItems]
        default:
            return [];
    }
}