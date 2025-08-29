// import DashboardPage from '@/pages/dashboard/DashboardPage';
// import ProfilePage from '@/pages/dashboard/ProfilePage';
// import TransactionsPage from '@/pages/dashboard/TransactionsPage';
// import CashOutPage from '@/pages/dashboard/agent/CashOutPage';
import { ISidebarItem } from '@/types';

import {
    History,
    Home,
    User
} from 'lucide-react';
import { lazy } from 'react';

const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const TransactionsPage = lazy(() => import("@/pages/dashboard/TransactionsPage"));
const ProfilePage = lazy(() => import("@/pages/dashboard/ProfilePage"));

export const commonUserSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "/user",
        icon: Home,
        component: DashboardPage
    },
    {
        title: "Transactions",
        url: "/user/transaction",
        icon: History,
        component: TransactionsPage
    },
    {
        title: "Profile",
        url: "/user/profile",
        icon: User,
        component: ProfilePage
    },
]
export const commonAgentSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "/agent",
        icon: Home,
        component: DashboardPage
    },
    {
        title: "Transactions",
        url: "/agent/transaction",
        icon: History,
        component: TransactionsPage
    },
    {
        title: "Profile",
        url: "/agent/profile",
        icon: User,
        component: ProfilePage
    },
]
export const commonAdminSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
        component: DashboardPage
    },
    {
        title: "Transactions",
        url: "/admin/transaction",
        icon: History,
        component: TransactionsPage
    },
    {
        title: "Profile",
        url: "/admin/profile",
        icon: User,
        component: ProfilePage
    },
]