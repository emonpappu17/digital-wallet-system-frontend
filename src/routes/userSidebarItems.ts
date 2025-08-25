import Demo from '@/pages/dashboard/user/Demo';
import DepositPage from '@/pages/dashboard/user/DepositPage';
import SendMoneyPage from '@/pages/dashboard/user/SendMoneyPage';
import WithdrawPage from '@/pages/dashboard/user/WithdrawPage';

import {
    ArrowUpRight,
    ArrowDownLeft,
    Send,
    Plus,
    Minus,
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
        title: "Withdraw",
        url: "/user/withdraw",
        icon: Minus,
        // icon: ArrowDownLeft,
        component: WithdrawPage
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