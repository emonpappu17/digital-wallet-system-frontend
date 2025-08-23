import DepositPage from '@/pages/dashboard/user/DepositPage';
import SendMoneyPage from '@/pages/dashboard/user/SendMoneyPage';
import WithdrawPage from '@/pages/dashboard/user/WithdrawPage';

import {
    ArrowUpRight,
    ArrowDownLeft,
    Send,
} from 'lucide-react';

export const userSidebarItems = [
    {
        title: "Deposit",
        url: "/user/deposit",
        icon: ArrowDownLeft,
        component: DepositPage
    },
    {
        title: "Withdraw",
        url: "/user/withdraw",
        icon: ArrowUpRight,
        component: WithdrawPage
    },
    {
        title: "Send Money",
        url: "/user/send-money",
        icon: Send,
        component: SendMoneyPage
    },
]