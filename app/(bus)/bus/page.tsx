import { getAllBusStops } from "@/action/bus";
import BusStop from "@/components/bus/bus-stop";

async function BusPage() {
    return (
        <div className="min-h-full p-2">
            <BusStop />
        </div>
    );
}

export default BusPage;
