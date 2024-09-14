"use client";
import { createRoom } from "@/action/gameRoom/createRoom";
import { enterRoom } from "@/action/gameRoom/enterRoom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateRandomString } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GameRoom() {
    const session = useSession();
    const user = session.data?.user;
    const router = useRouter();
    const [showInput, setShowInput] = useState(false);
    const [roomId, setRoomId] = useState("");

    const handleCreateRoom = async () => {
        if (!user) return;
        const roomId = await createRoom(user.id, user.image, user.name);

        return router.push(`/gameRoom/${roomId}`);
    };

    const handleJoinRoom = async () => {
        if (!user) return;
        await enterRoom(user.id, roomId, {
            name: user.name || user.email,
            image: user.image || "",
            id: user.id,
            status: "waiting",
            score: 0,
        });
        router.push(`/gameRoom/${roomId}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md p-4">
                <h1>Game Room</h1>
                {!showInput ? (
                    <div className="flex gap-2 w-full justify-evenly">
                        <Button onClick={handleCreateRoom}>
                            Create a room
                        </Button>
                        <Button onClick={() => setShowInput(true)}>
                            Join a room
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter room id"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <Button onClick={handleJoinRoom}>Join</Button>
                        <Button onClick={() => setShowInput(false)}>
                            Cancel
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
