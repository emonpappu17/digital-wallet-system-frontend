// import AgentsPage from '@/pages/dashboard/admin/AgentsPage';
// import UsersPage from '@/pages/dashboard/admin/UsersPage';
import { ISidebarItem } from '@/types';

import {
    UserCheck,
    Users,
} from 'lucide-react';
import { lazy } from 'react';

const UsersPage = lazy(() => import("@/pages/dashboard/admin/UsersPage"));
const AgentsPage = lazy(() => import("@/pages/dashboard/admin/AgentsPage"));


export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Users",
        url: "/admin/users",
        icon: Users,
        component: UsersPage
    },
    {
        title: "Agents",
        url: "/admin/agents",
        icon: UserCheck,
        component: AgentsPage
    },
]