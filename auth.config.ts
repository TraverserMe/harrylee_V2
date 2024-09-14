
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { auth as GoogleAuth } from "@/firebase/config";
import { LoginSchema } from "@/schemas/login-schema";

export default {
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);
            if (validatedFields.success) {
                const { email, password } = validatedFields.data;
                const userCredential = await signInWithEmailAndPassword(GoogleAuth, email, password);
                // console.log("userCredential.user", userCredential.user)
                if (userCredential) {
                    return userCredential.user as any;
                }

                return null;
            }
        }
    })
    ],
    trustHost: true,
} satisfies NextAuthConfig;
