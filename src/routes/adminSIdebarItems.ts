import CashInPage from '@/pages/dashboard/agent/CashInPage';
import CashOutPage from '@/pages/dashboard/agent/CashOutPage';
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
        component: CashInPage
    },
    {
        title: "Agents",
        url: "/admin/agents",
        icon: UserCheck,
        component: CashOutPage
    },
]