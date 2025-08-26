import { adminSidebarItems } from "@/routes/adminSIdebarItems";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { commonAdminSidebarItems, commonAgentSidebarItems, commonUserSidebarItems } from "@/routes/commonSidebarItems";
// import { commonUserSidebarItems } from "@/routes/commonUserSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import { IRole } from "@/types";

export const getSidebarItems = (userRole: IRole | "COMMON") => {
    switch (userRole) {
        case IRole.ADMIN:
            return [...adminSidebarItems, ...commonAdminSidebarItems]
        case IRole.AGENT:
            return [...agentSidebarItems, ...commonAgentSidebarItems]
        case IRole.USER:
            return [...userSidebarItems, ...commonUserSidebarItems]
        // case "COMMON":
        //     return [...commonUserSidebarItems]
        default:
            return [];
    }
}