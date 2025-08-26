import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProfilePage from '@/pages/dashboard/ProfilePage';
import TransactionsPage from '@/pages/dashboard/TransactionsPage';
// import CashOutPage from '@/pages/dashboard/agent/CashOutPage';
import { ISidebarItem } from '@/types';

import {
    ArrowDownLeft,
    History,
    User
} from 'lucide-react';

export const commonUserSidebarItems: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "/user",
        icon: ArrowDownLeft,
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
        icon: ArrowDownLeft,
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
        icon: ArrowDownLeft,
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