"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import LoadingWithText from "../loading-with-text";

function LoginProvider() {
    const provider = new GoogleAuthProvider();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const signInWithGoogle = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, provider);
            // console.log(res);

            router.push("/");
        } catch (error) {
            if (
                error instanceof FirebaseError &&
                error.code == "auth/popup-closed-by-user"
            ) {
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-2">
            <Button onClick={signInWithGoogle} disabled={isLoading}>
                <FcGoogle className="h-5 w-5" />
                {isLoading ? (
                    <LoadingWithText text={"Signing in..."} />
                ) : (
                    <span className="ml-2">Sign In with Google</span>
                )}
            </Button>
        </div>
    );
}

export default LoginProvider;
