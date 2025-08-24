import { IRole } from ".";

export enum Status {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED",
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    SUSPEND = "SUSPEND"
}

export interface TUser {
    _id?: string;
    name: string;
    photo?: string,
    phoneNumber: string;
    email: string;
    nidNumber?: string;
    shopName?: string;
    role: IRole;
    status: Status;
    transactionVolume?: number
    transactionsCount?: number,
    commission?: number,
    transactions?: {
        agentCommission: number,
        amount: number,
        createdAt: string,
        _id: string
    }[],
    balance?: number,
    createdAt: string;
    updatedAt: string;
}