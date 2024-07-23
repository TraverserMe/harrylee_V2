import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export type User = {
    email: string;
    password: string;
};

export const login = (user: User) => {
    signInWithEmailAndPassword(auth, user.email, user.password);
};

export const logout = () => {
    signOut(auth);
};

export const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    if (loading) {
        return (
            <div>
                <p>Initialising User...</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <p>Initialising User...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <p>Error: {error.toString()}</p>
            </div>
        );
    }
    if (user) {
        return (
            <div>
                <p>Current User: {user.email}</p>
                <Button onClick={logout}>Log out</Button>
            </div>
        );
    }
    return (
        <Button
            variant="secondary"
            onClick={() => {
                router.push("/login");
            }}
        >
            Log in
        </Button>
    );
};
