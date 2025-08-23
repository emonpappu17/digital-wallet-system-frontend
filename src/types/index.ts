import { ComponentType } from "react";

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