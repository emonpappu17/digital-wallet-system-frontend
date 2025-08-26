import Demo from '@/pages/dashboard/user/Demo';
import DepositPage from '@/pages/dashboard/user/DepositPage';
import SendMoneyPage from '@/pages/dashboard/user/SendMoneyPage';

import CashOutPage from '@/pages/dashboard/user/CashOutPage';
import {
    ArrowDownLeft,
    Plus,
    Send
} from 'lucide-react';

export const userSidebarItems = [
    {
        title: "Deposit",
        url: "/user/deposit",
        icon: Plus,
        // icon: ArrowUpRight,
        component: DepositPage
    },
    {
        title: "Cash Out",
        url: "/user/cash-out",
        // icon: Minus,
        icon: ArrowDownLeft,
        component: CashOutPage
    },
    {
        title: "Send Money",
        url: "/user/send-money",
        icon: Send,
        component: SendMoneyPage
    },
    {
        title: "demo Send Money",
        url: "/user/demo",
        icon: Send,
        component: Demo
    },
]