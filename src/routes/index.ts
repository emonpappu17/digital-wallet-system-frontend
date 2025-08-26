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
import PricingPage from "@/pages/public/PricingPage";
import { generateRoutes } from "@/utils/genarateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { adminSidebarItems } from "./adminSIdebarItems";
import { commonAdminSidebarItems, commonAgentSidebarItems, commonUserSidebarItems } from "./commonSidebarItems";
// import { commonUserSidebarItems } from "./commonUserSidebarItems";


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
            {
                path: "pricing",
                Component: PricingPage
            },
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
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardPage
            },
            ...generateRoutes(userSidebarItems),
            ...generateRoutes(commonUserSidebarItems)

            //         { index: true, element: <Navigate to={ "/user/dashboard"} /> },
            // ...generateRoutes(userSidebarItems)
        ]

        //         path: "/admin",
        //         Component: DashboardLayout,
        //         children: [
        //             { index: true, element: <Navigate to={ "/admin/analytics"} /> },
        //     ...generateRoutes(adminSidebarItems)
        // ]
    },
    {
        path: "/admin",
        Component: DashboardLayout,
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
        Component: DashboardLayout,
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
]);