"use client";
import { enterRoom } from "@/action/gameRoom/enterRoom";
import { leaveRoom } from "@/action/gameRoom/leaveRoom";
import { submitChoice } from "@/action/gameRoom/submitChoice";
import { updateRoom } from "@/action/gameRoom/updataRoom";
import LoadingWithText from "@/components/loading-with-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { realtime } from "@/firebase/config";
import { Player } from "@/schemas/game-schema";
import { off, onValue, ref } from "firebase/database";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

interface RoomProps {
    roomId: string;
}

function Room({ roomId }: RoomProps) {
    const router = useRouter();
    const session = useSession();
    const user = session.data?.user;

    const [gameState, setGameState] = useState<"waiting" | "ready">("waiting");

    const [me, setMe] = useState<Player>();
    const [opponent, setOpponent] = useState<Player | null>(null);
    const [result, setResult] = useState<"me" | "opponent" | "draw" | null>(
        null
    );
    const [choice, setChoice] = useState<"rock" | "paper" | "scissors" | null>(
        null
    );

    const handleLeaveRoom = async () => {
        if (!user) return;
        await leaveRoom(user.id, roomId);
        router.push("/gameRoom");
    };

    useEffect(() => {
        if (!user) return;
        enterRoom(user.id, roomId, {
            name: user.name ?? user.email ?? "Unknown",
            image: user.image || "",
            id: user.id,
            status: "waiting",
            score: 0,
        }).then((res) => {
            if (!res) {
                console.log("error");
                return router.push("/gameRoom");
            }
            console.log("updated");
            setGameState("ready");
            return;
        });
    }, [roomId, user]);

    useEffect(() => {
        if (!user) return;
        const roomRef = ref(realtime, `gameRoom/${roomId}`);

        const unsubscribe = onValue(roomRef, (snapshot) => {
            const value = snapshot.val();

            if (!snapshot.exists()) {
                return router.push("/gameRoom");
            }
            const data = Object.entries(value).map(([key, val]) => {
                return {
                    ...(val as Player),
                };
            });
            if (data.length < 2) {
                if (data[0].id === user.id) {
                    setOpponent(null);
                    setMe(data[1]);
                    setGameState("waiting");
                }
            } else {
                console.log(data);
                if (data[0].id !== user.id) {
                    setOpponent(data[0]);
                    setMe(data[1]);
                    setGameState("ready");
                } else {
                    setOpponent(data[1]);
                    setMe(data[0]);
                    setGameState("ready");
                }
            }
        });

        // Clean up the listener when the component unmounts
        return () => {
            off(roomRef);
        };
    }, [roomId, user]);

    useEffect(() => {
        if (!user) return;
        if (!me) return;
        if (!opponent) return;
        console.log(me, opponent);
        if (me.choice && opponent.choice) {
            if (me.choice === opponent.choice) {
                setResult("draw");
            } else if (
                (me.choice === "rock" && opponent.choice === "scissors") ||
                (me.choice === "scissors" && opponent.choice === "paper") ||
                (me.choice === "paper" && opponent.choice === "rock")
            ) {
                setResult("me");
            } else {
                setResult("opponent");
            }
        }
    }, [me, opponent]);

    const handleSubmitChoice = async () => {
        if (!user) return;
        if (!choice) return;
        if (gameState !== "ready") return;
        if (!me) return;
        console.log("submitting choice");
        await updateRoom(user.id, roomId, { ...me, status: "ready", choice });
    };

    return (
        <div className="min-h-[calc(100vh-50px)] flex items-center justify-center">
            <Card className="w-full max-w-md p-4">
                <div className="mb-2">
                    Welcome to Game Room: {roomId}
                    <Button
                        onClick={() => navigator.clipboard.writeText(roomId)}
                        className="ml-2"
                    >
                        Share with friends
                    </Button>
                </div>

                <CardContent className="flex flex-col gap-2 w-full justify-evenly">
                    <Button onClick={handleLeaveRoom}>Leave Room</Button>
                    <div>
                        Opponent:{" "}
                        {gameState !== "waiting" && opponent?.name.length
                            ? opponent?.name
                            : "Player"}
                        {gameState === "waiting" && (
                            <LoadingWithText text={"waiting..."} />
                        )}
                        {gameState !== "waiting" && (
                            <Avatar>
                                <AvatarImage
                                    src={opponent?.image || ""}
                                    loading="eager"
                                />
                                <AvatarFallback className="bg-zinc-500">
                                    <FaUser />
                                </AvatarFallback>
                            </Avatar>
                        )}
                        {opponent?.status === "ready" && "Ready"}
                    </div>
                    <div
                        id="board"
                        className="flex min-h-40 justify-between flex-col items-center"
                    >
                        {gameState === "ready" && (
                            <div className="mt-auto">
                                {me?.status !== "ready" && (
                                    <>
                                        <div id="my_choice">
                                            <Button
                                                onClick={() =>
                                                    setChoice("rock")
                                                }
                                            >
                                                Rock
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setChoice("paper")
                                                }
                                            >
                                                Paper
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    setChoice("scissors")
                                                }
                                            >
                                                Scissors
                                            </Button>
                                        </div>
                                        <Button onClick={handleSubmitChoice}>
                                            Confirm
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        Me: {user?.name} Choice: {choice} Winner: {result}
                        <Avatar>
                            <AvatarImage
                                src={user?.image || ""}
                                loading="eager"
                            />
                            <AvatarFallback className="bg-zinc-500">
                                <FaUser />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Room;
