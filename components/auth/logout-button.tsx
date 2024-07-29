import { logout } from "@/firebase/user";
import { LogOut } from "lucide-react";

function LogoutButton() {
    return (
        <span
            onClick={logout}
            className="flex items-center w-full"
            role="button"
        >
            <LogOut className="mr-4" />
            Log out
        </span>
    );
}

export default LogoutButton;
