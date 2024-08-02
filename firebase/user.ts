import { User, UserRole } from "@/schemas/user-schema";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, auth } from "@/firebase/config";

export const login = (user: User) => {
    return signInWithEmailAndPassword(auth, user.email, user.password);
};

export const logout = () => {
    signOut(auth);
};

export const createUser = async (user: User) => {
    return await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
    );
};

export const getUserInfo = async (uid: string) => {
    const user = await auth.currentUser?.getIdTokenResult();
    return user;
}