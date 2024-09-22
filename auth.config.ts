
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { auth as GoogleAuth } from "@/firebase/config";
import { LoginSchema } from "@/schemas/login-schema";
import { getUserByEmail } from "./action/firestore";

export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         response_type: "code"
            //     }
            // }
        }),
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    try {
                        const userCredential = await signInWithEmailAndPassword(GoogleAuth, email, password);
                        // console.log("userCredential.user", userCredential.user)
                        return userCredential.user as any

                    } catch (error: any) {
                        console.log("@@@error.code", error.code)
                        if (error.code == "auth/user-not-found") {
                            return false
                        }
                        console.log("error", error)
                        return false
                    }
                }
            }
        })
    ],
    trustHost: true,
} satisfies NextAuthConfig;
