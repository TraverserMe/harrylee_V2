import { User, UserRole } from "@/schemas/user-schema";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { UserSchema } from "@/schemas/user-schema";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

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