import CashInPage from '@/pages/dashboard/agent/CashInPage';
// import CashOutPage from '@/pages/dashboard/agent/CashOutPage';
import { ISidebarItem } from '@/types';

import {
    ArrowDownLeft,
    ArrowUpRight,
} from 'lucide-react';

export const agentSidebarItems: ISidebarItem[] = [
    {
        title: "Cash In",
        url: "/agent/cash-in",
        icon: ArrowDownLeft,
        component: CashInPage
    },
    // {
    //     title: "Cash out",
    //     url: "/agent/cash-out",
    //     icon: ArrowUpRight,
    //     component: CashOutPage
    // },
]