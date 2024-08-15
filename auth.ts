import { FirestoreAdapter } from "@auth/firebase-adapter"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import NextAuth, { type DefaultSession } from "next-auth"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as GoogleAuth } from "@/firebase/config";
import { cert } from "firebase-admin/app";
import { UserRole } from "@/schemas/user-schema";
import { getUserByEmail } from "@/action/firestore";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            role: UserRole
            email: string
            id: string
            name?: string
            image?: string
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"]
    }
}

// leekinnangharry3@gmail.com
export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
    },
    providers: [Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
        name: "credentials",
        credentials: {
            email: {},
            password: {},
        },
        async authorize(credentials): Promise<any> {
            const { email, password } = credentials as { email: string, password: string };
            const userCredential = await signInWithEmailAndPassword(GoogleAuth, email, password);
            // console.log("userCredential.user", userCredential.user)
            if (userCredential) {
                return userCredential.user
            } else {
                return null;
            }
        }
    })
    ],
    adapter: FirestoreAdapter(
        {
            credential: cert({
                projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
                clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY ? process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
                    : undefined,
            }),
        }
    ),
    callbacks: {
        async signIn({ user, account }) {
            // if (account?.provider === "credentials") {
            //     // console.log("user", user)
            // }
            return true
        },
        async session({ token, session, user }) {
            // console.log("token", token)
            if (!token) {
                session.user.id = user.id
            }
            if (!session.user.id) {
                session.user.id = token.id
            }


            // if (token.sub && session.user) {
            //     session.user.id = user.id
            // }

            if (token.email && session.user) {
                session.user.email = token.email;
            }

            session.user.role = token.role;
            if (token.picture && token.name) {
                session.user.image = token.picture;
                session.user.name = token.name;
            }
            console.log("session", session)

            return session;
        },
        async jwt({ token }) {
            if (!token.email) return token;
            // console.log("token111", token.email)

            const existingUser = await getUserByEmail(token.email);

            // console.log("existingUser", existingUser)

            if (!existingUser.customClaims) return token;


            token.id = existingUser.uid
            token.role = existingUser.customClaims as UserRole
            token.name = existingUser.displayName
            token.picture = existingUser.photoURL

            return token;
        },
    },
    session: { strategy: "jwt" },
})