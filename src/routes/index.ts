import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import AboutPage from "@/pages/public/AboutPage";
import AgentPendingPage from "@/pages/public/AgentPendingPage";
import ContractPage from "@/pages/public/ContractPage";
import FAQPage from "@/pages/public/FAQPage";
import FeaturesPage from "@/pages/public/FeaturesPage";
import HomePage from "@/pages/public/HomePage";
import { generateRoutes } from "@/utils/genarateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSIdebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { commonAdminSidebarItems, commonAgentSidebarItems, commonUserSidebarItems } from "./commonSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import UnauthorizedPage from "@/pages/public/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { IRole } from "@/types";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "about",
                Component: AboutPage
            },
            {
                path: "features",
                Component: FeaturesPage
            },
            // {
            //     path: "pricing",
            //     Component: PricingPage
            // },
            {
                path: "contact",
                Component: ContractPage
            },
            {
                path: "faq",
                Component: FAQPage
            },
        ]
    },
    {
        path: "/user",
        Component: withAuth(DashboardLayout, IRole.USER),
        children: [
            {
                index: true,
                Component: DashboardPage
            },
            ...generateRoutes(userSidebarItems),
            ...generateRoutes(commonUserSidebarItems)
        ]
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, IRole.ADMIN),
        children: [
            {
                index: true,
                Component: DashboardPage
            },
            ...generateRoutes(adminSidebarItems),
            ...generateRoutes(commonAdminSidebarItems)
        ]
    },
    {
        path: "/agent",
        Component: withAuth(DashboardLayout, IRole.AGENT),
        children: [
            {
                index: true,
                Component: DashboardPage
            },
            ...generateRoutes(agentSidebarItems),
            ...generateRoutes(commonAgentSidebarItems),
        ]
    },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/agent/pending",
        Component: AgentPendingPage,
    },
    {
        path: "/register",
        Component: RegisterPage,
    },
    {
        Component: UnauthorizedPage,
        path: "/unauthorized"
    },
]);