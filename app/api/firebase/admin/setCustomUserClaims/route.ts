import { UserRole } from "@/schemas/user-schema";
import { NextResponse } from "next/server";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserInfo } from "@/firebase/user";

export async function PATCH(req: Request) {

    const { uid, claims }: { uid: string; claims: UserRole } = await req.json();
    // const [user, loading, error] = useAuthState(auth);
    // if (!user) return new NextResponse("Unauthorized", { status: 401 });

    // console.log("test");
    // const userInfo = await getUserInfo(user.uid);
    // console.log("userInfo", userInfo);
    // if (!userInfo) return new NextResponse("Unauthorized", { status: 401 });
    // if (!userInfo)

    // console.log('uid', uid);
    // console.log('claims', claims);
    if (!uid) return new NextResponse("uid is required", { status: 400 });
    if (!claims) return new NextResponse("claims is required", { status: 400 });


    const functions = getFunctions(app, 'asia-northeast1');
    // console.log("functions", functions);
    const setCustomClaims = httpsCallable(functions, 'setCustomClaims')

    return { status: 200, message: "success" }
    // try {
    //     const server = await setCustomClaims({ uid, claims })
    //     console.log("server", server);
    //     return NextResponse.json(server);
    // } catch (error) {
    //     console.log("[SERVER_ID_PATCH]", error);
    //     return new NextResponse("Internal Server Error", { status: 500 });
    // }
}