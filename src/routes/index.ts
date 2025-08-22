import App from "@/App";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import AboutPage from "@/pages/public/AboutPage";
import AgentPendingPage from "@/pages/public/AgentPendingPage";
import ContractPage from "@/pages/public/ContractPage";
import FAQPage from "@/pages/public/FAQPage";
import FeaturesPage from "@/pages/public/FeaturesPage";
import HomePage from "@/pages/public/HomePage";
import PricingPage from "@/pages/public/PricingPage";
import { createBrowserRouter } from "react-router";


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