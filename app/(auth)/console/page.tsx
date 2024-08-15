"use client";

import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { auth, db } from "@/firebase/config";
import { UserSchema } from "@/schemas/user-schema";

import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ConsolePage = () => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth, {
        onUserChanged: async (user) => {
            if (!user) {
                router.push("/login");
            }
        },
    });

    const [users, setUsers] = useState<UserSchema[]>([]);
    const [permitted, setPermitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);
    const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
    const [userIsUser, setUserIsUser] = useState<boolean>(false);
    const [loadingPermissions, setLoadingPermissions] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!selectedUser) return;
        setUserIsAdmin(selectedUser.isAdmin);
        setUserIsUser(selectedUser.isUser);
    }, [selectedUser]);

    // const onSave = async () => {
    //     setSaving(true);
    //     try {
    //         if (!selectedUser || !user) return;
    //         const url = queryString.stringifyUrl({
    //             url: "/api/firebase/admin/setCustomUserClaims",
    //         });
    //         console.log(url);

    //         const res = await axios.patch(url, {
    //             uid: selectedUser.id,
    //             claims: {
    //                 isAdmin: userIsAdmin,
    //                 isUser: userIsUser,
    //             },
    //             adminId: user.uid,
    //         });
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setSaving(false);
    //     }
    // };

    useEffect(() => {
        if (user) {
            setLoadingPermissions(true);
            auth.currentUser
                ?.getIdTokenResult(/* forceRefresh */ true)
                .then((idTokenResult) => {
                    if (
                        (idTokenResult.claims.isAdmin as boolean) ||
                        (idTokenResult.claims.isOwner as boolean)
                    ) {
                        setPermitted(true);
                    }
                })
                .finally(() => {
                    setLoadingPermissions(false);
                });
        }
    }, [user]);
    // Fetch data from Firestore using useCollection
    // useEffect to set up the listener and detach it when unmounting
    useEffect(() => {
        if (permitted) {
            const unsubscribe = onSnapshot(collection(db, "users"), (data) => {
                if (data) {
                    //get the documents id from the query and the data from the query

                    let users = [] as UserSchema[];
                    data.forEach((doc) => {
                        users.push({
                            id: doc.id,
                            ...doc.data(),
                        } as UserSchema);
                    });
                    setUsers(users);
                } else {
                    console.log("Document does not exist.");
                }
            });

            // Clean up the listener when the component unmounts
            return () => {
                unsubscribe();
            };
        }
    }, [permitted]); // Empty dependency array means it runs once on mount

    if (loading) {
        return <main>Loading...</main>;
    }
    if (error) {
        return <main>Error: {error.message}</main>;
    }
    if (!user) {
        return <main>Please sign in</main>;
    }

    if (!permitted && !loadingPermissions) {
        return <main>Unauthorized</main>;
    }

    return (
        <main>
            {permitted && (
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle>User Information</CardTitle>
                        </CardHeader>
                        {selectedUser && (
                            <CardContent className="flex flex-col space-y-4">
                                <Label>UID: {selectedUser?.id}</Label>
                                <br />
                                <Label>Email: {selectedUser?.email}</Label>
                                <br />
                                <Label>Name: {selectedUser?.displayName}</Label>
                                <br />
                                <div className="flex flex-row space-x-4">
                                    <Label htmlFor="isAdmin">Admin: </Label>
                                    <Checkbox
                                        defaultChecked={selectedUser.isAdmin}
                                        id="isAdmin"
                                        onCheckedChange={(e) => {
                                            setUserIsAdmin(
                                                e.valueOf() as boolean
                                            );
                                        }}
                                    />
                                    <br />
                                    <Label htmlFor="isUser">User: </Label>
                                    <Checkbox
                                        defaultChecked={selectedUser.isUser}
                                        id="isUser"
                                        onCheckedChange={(e) => {
                                            setUserIsUser(
                                                e.valueOf() as boolean
                                            );
                                        }}
                                    />
                                    <br />
                                </div>
                                <Button
                                    disabled={
                                        saving ||
                                        !permitted ||
                                        (selectedUser.isAdmin === userIsAdmin &&
                                            selectedUser.isUser === userIsUser)
                                    }
                                    // onClick={onSave}
                                >
                                    Save
                                </Button>
                            </CardContent>
                        )}
                    </Card>
                    <DataTable
                        columns={columns}
                        data={users}
                        selectedRow={selectedUser}
                        setSelectedRow={setSelectedUser}
                    />
                </>
            )}
        </main>
    );
};

export default ConsolePage;
