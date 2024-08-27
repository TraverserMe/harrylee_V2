import { Route } from "@/schemas/bus";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function BusSearchRow({ routeInfo }: { routeInfo: Route }) {
    return (
        <Link
            href={
                routeInfo.co === "KMB"
                    ? `/bus/id/${routeInfo.route}&${routeInfo.bound}&${routeInfo.service_type}&0`
                    : routeInfo.co === "MB"
                    ? `/bus/${routeInfo.co}/${routeInfo.route}`
                    : `/bus/${routeInfo.co}/${routeInfo.route}`
            }
        >
            <div className="flex items-center flex-row text-center border-b-2">
                <div className="w-1/6 font-extrabold text-2xl mr-1">
                    {routeInfo.route}
                </div>
                <div className="flex-1 flex flex-col h-16 text-start justify-center">
                    <span>
                        <span className="text-sm">往</span>
                        <span className="font-bold text-lg">
                            {routeInfo.dest_tc}
                            {routeInfo.co === "MB"
                                ? " - 小巴"
                                : routeInfo.co === "CTB"
                                ? " - 城巴"
                                : ""}
                        </span>
                    </span>
                    {/* <span className="text-sm">{routeInfo}</span> */}
                </div>
                <div className="flex flex-col mr-3">
                    <ChevronRight />
                </div>
            </div>
        </Link>
    );
}

export default BusSearchRow;
