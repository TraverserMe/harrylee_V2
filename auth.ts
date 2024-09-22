
import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "@/auth.config";
import { UserRole } from "@/schemas/user-schema";
import { getUserByEmail } from "@/action/firestore";
import { setCustomClaims } from "@/action/auth/setCustomClaims";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: ExtendedUser
    }

    type ExtendedUser = DefaultSession["user"] & {
        email: string
        role: UserRole
        id: string
        name?: string
        image?: string
    }

}

// leekinnangharry3@gmail.com
export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("user", user)
            console.log("account", account)
            console.log("profile", profile)
            if (account?.provider !== "google") {
                console.log(1)
                if (!user.email) {
                    return false
                }
                const existingUser = await getUserByEmail(user.email);

                if (!existingUser) {
                    return false
                }

                if (!existingUser.emailVerified) {
                    return false
                }

                if (existingUser.emailVerified && !existingUser.customClaims?.isUser) {
                    await setCustomClaims(existingUser.uid, { isUser: true, isAdmin: false })
                }

            }
            // if (account?.provider === "google") {
            //     if (user.id) {
            //         await setCustomClaims(user.id, { isUser: true, isAdmin: false })
            //     }
            // }

            return true;
        },
        async session({ token, session, user }) {

            console.log("token", token)
            console.log("session", session)
            console.log("user", user)
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
            // console.log("session", session)

            return session;
        },
        async jwt({ account, token, user }) {

            console.log("account", account)
            if (user) {
                token.role = user.role
                token.name = user.name
                token.picture = user.image
            }

            const existingUser = await getUserByEmail(token.email);

            if (!existingUser) {
                return token
            }

            token.id = existingUser.uid
            token.role = existingUser.customClaims as UserRole
            token.name = existingUser.displayName
            token.picture = existingUser.photoURL

            return token;
        },
    },
    session: { strategy: "jwt" },
    ...authConfig,
})