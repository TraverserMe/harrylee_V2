import { getAllBusStops } from "@/action/bus";
import BusStop from "@/components/bus/bus-stop";

async function BusPage() {
    // const busStops = await getAllBusStops();

    return (
        <div className="min-h-full p-2">
            <BusStop />
            {/* {busStops.length && <BusStop busStops={busStops} />} */}
        </div>
    );
}

export default BusPage;
