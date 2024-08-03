import { StringValidation } from "zod";

export type User = {
    email: string;
    password: string;
};

export interface UserRole {
    isOwner: boolean;
    isAdmin: boolean;
    isUser: boolean;
}

