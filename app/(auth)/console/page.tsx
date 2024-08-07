"use client";
import { auth } from "@/firebase/config";
import { getCurrentUserInfo, getUsers } from "@/firebase/user";
import { UserRole, UserSchema } from "@/schemas/user-schema";
import { use, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import queryString from "query-string";
import axios from "axios";

function ConsolePage() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth, {
        onUserChanged: async (user) => {
            if (user) {
                const userInfo = await getCurrentUserInfo();
                setUserClaims({
                    isAdmin: userInfo?.claims.isAdmin as boolean,
                    isOwner: userInfo?.claims.isOwner as boolean,
                    isUser: userInfo?.claims.isUser as boolean,
                });
            } else {
                return router.push("/");
            }
        },
    });

    const [users, setUsers] = useState<UserSchema[]>([]);

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
        if (!user) return;
        getCurrentUserInfo().then((userInfo) => {
            setUserClaims({
                isAdmin: userInfo?.claims.isAdmin as boolean,
                isOwner: userInfo?.claims.isOwner as boolean,
                isUser: userInfo?.claims.isUser as boolean,
            });
            const permitted =
                userInfo?.claims.isOwner || userInfo?.claims.isAdmin;
            if (!permitted) {
                router.push("/");
            }
        });

        getUsers().then((users) => {
            setUsers(users);
        });
    }, [user, router]);

    const [userClaims, setUserClaims] = useState<UserRole>({
        isAdmin: false,
        isOwner: false,
        isUser: false,
    });

    if (loading) {
        return <main>Loading...</main>;
    }

    const permitted = userClaims.isOwner || userClaims.isAdmin;

    if (!userClaims.isOwner && !userClaims.isAdmin) {
        return <main>Permission Denied</main>;
    }

    const onSave = async () => {
        setSaving(true);
        try {
            //check the user is admin or not
            const userInfo = await getCurrentUserInfo();
            if (!userInfo?.claims.isAdmin) {
                console.log("Permission Denied");
                return router.push("/");
            }

            const url = queryString.stringifyUrl({
                url: "/api/firebase/admin/setCustomUserClaims",
            });

            if (!selectedUser) return console.log("user not found");

            const res = await axios.patch(url, {
                uid: selectedUser?.id,
                claims: {
                    isAdmin: userIsAdmin,
                    isUser: userIsUser,
                },
                adminId: user?.uid,
            });
            console.log(res);
            setSelectedUser(null);

            getUsers().then((users) => {
                setUsers(users);
            });
        } catch (error) {
            console.log(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <main>
            {permitted && (
                <>
                    <DataTable
                        columns={columns}
                        data={users}
                        selectedRow={selectedUser}
                        setSelectedRow={setSelectedUser}
                    />
                    {/* <div>selected: {JSON.stringify(selectedUser, null, 2)}</div> */}
                    <div>
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
                                    <Label>
                                        Name: {selectedUser?.displayName}
                                    </Label>
                                    <br />
                                    <div className="flex flex-row space-x-4">
                                        <Label htmlFor="isAdmin">Admin: </Label>
                                        <Checkbox
                                            defaultChecked={
                                                selectedUser.isAdmin
                                            }
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
                                            (!userClaims.isOwner &&
                                                !userClaims.isAdmin) ||
                                            (selectedUser.isAdmin ===
                                                userIsAdmin &&
                                                selectedUser.isUser ===
                                                    userIsUser)
                                        }
                                        onClick={onSave}
                                    >
                                        Save
                                    </Button>
                                </CardContent>
                            )}
                        </Card>
                    </div>
                </>
            )}
        </main>
    );
}

export default ConsolePage;
