import { ComponentType } from "react";
export type { TUser } from "./user.types"

export interface IResponse<T> {
    statusCode: number
    success: boolean
    message: string
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: T
}

export interface ISidebarItem {
    title: string,
    url: string,
    icon: ComponentType,
    component: ComponentType
}

export enum IRole {
    ADMIN = "ADMIN",
    USER = "USER",
    AGENT = "AGENT"
}