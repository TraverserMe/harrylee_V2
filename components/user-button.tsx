"use client";
import { FaUser } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LogoutButton from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";

export const UserButton = ({ session }: { session: Session }) => {
    const user = session.user;
    const permitted = user.role.isAdmin || session.user.role.isOwner;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} loading="eager" />
                    <AvatarFallback className="bg-zinc-500">
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="center">
                {permitted && (
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
