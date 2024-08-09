import { User, UserRole } from "@/schemas/user-schema";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { app, auth } from "@/firebase/config";
import { UserSchema } from "@/schemas/user-schema";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getFunctions, httpsCallable } from "firebase/functions";

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

export const getCurrentUserInfo = async () => {
    const user = await auth.currentUser?.getIdTokenResult();
    return user;
}

export const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const res = [] as UserSchema[]
    querySnapshot.forEach((doc) => {
        res.push({
            id: doc.id,
            ...doc.data(),
        } as UserSchema)
    })
    return res
}

export const setCustomUserClaims = async (uid: string, claims: UserRole) => {
    if (!uid) return {
        error: "uid is required"
    }
    if (!claims) return {
        error: "claims is required"
    }
    try {
        const functions = getFunctions(app, "asia-northeast1");
        // console.log("functions", functions);
        const setCustomClaims = httpsCallable(functions, "setCustomClaims");
        const res = await setCustomClaims({ uid, claims });
        return res;
    } catch (error) {
        console.log(error);
        return {
            error: "Internal Server Error"
        }
    }

}