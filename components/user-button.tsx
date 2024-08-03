"use client";
import { FaUser } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import { Settings } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "firebase/auth";
import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/schemas/user-schema";

interface LogoutButtonProps {
    user: User;
    userClaims?: UserRole;
}

export const UserButton = (props: LogoutButtonProps) => {
    const user = props.user;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.photoURL || ""} loading="eager" />
                    <AvatarFallback className="bg-zinc-500">
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="center">
                {/* {props.userClaims?.isOwner && <div>hi</div>} */}
                <DropdownMenuItem>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
