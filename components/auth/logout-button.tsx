"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/action/logout";

function LogoutButton() {
    return (
        <Button
            onClick={async () => {
                await logout();
                window.location.reload();
            }}
            className="flex items-center w-full "
            variant={"outline"}
        >
            <LogOut className="mr-4" />
            <span className="w-full">Log out</span>
        </Button>
    );
}

export default LogoutButton;
