import AgentsPage from '@/pages/dashboard/admin/AgentsPage';
import UsersPage from '@/pages/dashboard/admin/UsersPage';
import { ISidebarItem } from '@/types';

import {
    UserCheck,
    Users,
} from 'lucide-react';

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