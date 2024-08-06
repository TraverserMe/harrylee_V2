import { User, UserRole } from "@/schemas/user-schema";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/config";

export const login = (user: User) => {
    return signInWithEmailAndPassword(auth, user.email, user.password);
};

export const logout = () => {
    signOut(auth);
};

export const createUser = async (user: User) => {

    // Create user 
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
    );

    await sendEmailVerification(userCredential.user);
    logout()
    return userCredential;
};

export const getUserInfo = async (uid: string) => {
    const user = await auth.currentUser?.getIdTokenResult();
    return user;
}