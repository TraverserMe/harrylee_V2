import { getRoom } from "@/action/gameRoom/findRoom";
import { redirect } from "next/navigation";
import Room from "@/app/(playground)/gameRoom/[roomId]/room";

const gameRoomPage = async ({ params }: { params: { roomId: string } }) => {
    const checkRoom = await getRoom(params.roomId);

    if (!checkRoom) {
        return redirect("/gameRoom");
    }

    return <Room roomId={params.roomId} />;
};

export default gameRoomPage;
