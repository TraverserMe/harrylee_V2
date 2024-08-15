"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "@/firebase/config";
// import { useRouter } from "next/navigation";
// import { FirebaseError } from "firebase/app";
// import { useState } from "react";
// import LoadingWithText from "@/components/loading-with-text";
import { loginWithGoogle } from "@/action/sign-in";

function LoginProvider() {
    return (
        <div className="w-full flex flex-col gap-2">
            <Button onClick={async () => await loginWithGoogle()}>
                <FcGoogle className="h-5 w-5" />
                <span className="ml-2">Sign In with Google</span>
                {/* {isLoading ? (
                    <LoadingWithText text={"Signing in..."} />
                ) : (
                )} */}
            </Button>
        </div>
    );
}

export default LoginProvider;
