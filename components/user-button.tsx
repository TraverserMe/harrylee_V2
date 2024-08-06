"use client";
import { FaUser } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
// import { Settings } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "firebase/auth";
import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/schemas/user-schema";
import { Ghost } from "lucide-react";
import Link from "next/link";

interface LogoutButtonProps {
    user: User;
    userClaims?: UserRole;
}

export const UserButton = (props: LogoutButtonProps) => {
    const user = props.user;
    const isAdminOrOwner =
        props.userClaims?.isAdmin || props.userClaims?.isOwner;

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
                {isAdminOrOwner && (
                    <DropdownMenuItem className="p-0">
                        <Button
                            asChild
                            variant="outline"
                            className="w-full items-center"
                        >
                            <Link href="/console">
                                <Ghost className="mr-4" />
                                <span className="w-full text-center">
                                    Console
                                </span>
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem className="p-0">
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
