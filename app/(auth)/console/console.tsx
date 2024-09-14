"use client";

import { setCustomClaims } from "@/action/firestore";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { db } from "@/firebase/config";
import { UserSchema } from "@/schemas/user-schema";

import { collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Console = () => {
    const router = useRouter();
    const session = useSession();

    const [users, setUsers] = useState<UserSchema[]>([]);
    const [permitted, setPermitted] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);
    const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false);
    const [userIsUser, setUserIsUser] = useState<boolean>(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!selectedUser) return;
        setUserIsAdmin(selectedUser.isAdmin);
        setUserIsUser(selectedUser.isUser);
    }, [selectedUser]);

    useEffect(() => {
        if (!session.data) return;
        if (session.data.user.role.isAdmin || session.data.user.role.isOwner) {
            setPermitted(true);
            return;
        } else {
            setPermitted(false);
            setTimeout(() => {
                router.push("/");
            }, 1000);
        }
    }, [router, session.data]);

    const onSave = async () => {
        setSaving(true);
        try {
            if (!selectedUser || !session.data) return;

            const res = await setCustomClaims(
                selectedUser.id,
                {
                    isAdmin: userIsAdmin,
                    isUser: userIsUser,
                },
                session.data.user.id
            );
            console.log(res);

            setSelectedUser(null);
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        if (permitted) {
            const unsubscribe = onSnapshot(collection(db, "users"), (data) => {
                if (data) {
                    //get the documents id from the query and the data from the query

                    let users = [] as UserSchema[];
                    data.forEach((doc) => {
                        if (doc.id.length > 20) {
                            users.push({
                                id: doc.id,
                                ...doc.data(),
                            } as UserSchema);
                        }
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

    if (session.status === "loading") {
        return <main>Loading...</main>;
    }

    if (session.status === "unauthenticated") {
        setTimeout(() => {
            router.push("/login");
        }, 3000);
        return <main>Please sign in</main>;
    }

    if (!permitted) {
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
                                    onClick={onSave}
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

export default Console;
