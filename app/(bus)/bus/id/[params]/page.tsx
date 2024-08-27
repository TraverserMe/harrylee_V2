"use client";

import { getRouteETA } from "@/action/bus";
import moment from "moment";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RouteETA, KMBRouteStopInfo, StopETA, StopInfo } from "@/schemas/bus";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

async function getData(route: string, dir: string, serviceType: string) {
    let busStopETA = [] as RouteETA[];
    const res = await fetch(
        "https://data.etabus.gov.hk/v1/transport/kmb/route-stop/" +
            route +
            "/" +
            dir +
            "/" +
            serviceType
    );
    const json = await res.json();

    const busRouteStops = json.data as KMBRouteStopInfo[];

    for (let i = 0; i < busRouteStops.length; i++) {
        const res = await fetch(
            "https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/" +
                busRouteStops[i].stop,
            {
                cache: "no-cache",
            }
        );
        const json = await res.json();

        const stopRes = await fetch(
            "https://data.etabus.gov.hk/v1/transport/kmb/stop/" +
                busRouteStops[i].stop
        );
        const stopJson = await stopRes.json();

        const stopInfo = stopJson.data as StopInfo;
        const stopETA = json.data as StopETA[];

        busStopETA.push({
            routeInfo: busRouteStops[i],
            stopETA: stopETA.filter(
                (eta) =>
                    eta.route === route &&
                    eta.dir === busRouteStops[i].bound &&
                    eta.service_type == busRouteStops[i].service_type
            ),
            stopInfo: stopInfo,
        });
    }

    console.log(busStopETA);

    return busStopETA;
}

function BusRoutePage() {
    const [userLocation, setUserLocation] = useState({
        lat: 22.302711,
        long: 114.177216,
    });
    const pathname = usePathname().split("/")[3];
    const route = pathname?.split("&")[0];
    const dir = pathname?.split("&")[1] === "I" ? "inbound" : "outbound";
    const serviceType = pathname?.split("&")[2];
    const closestStop =
        parseInt(pathname?.split("&")[3]) - 1 > 0
            ? parseInt(pathname?.split("&")[3]) - 1
            : 0;

    const interval = useRef<NodeJS.Timeout | null>(null);
    const [openedStop, setOpenedStop] = useState<Number>(Number(closestStop));

    const [routeInfo, setRouteInfo] = useState<RouteETA[]>();

    useEffect(() => {
        getData(route, dir, serviceType).then((routeInfo) => {
            setRouteInfo(routeInfo);
        });
    }, [route, dir, serviceType]);

    useEffect(() => {
        if (interval.current) {
            clearInterval(interval.current);
        }
        interval.current = setInterval(() => {
            getData(route, dir, serviceType).then((routeInfo) => {
                setRouteInfo(routeInfo);
            });
        }, 55000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, []);

    return (
        <>
            <div className="min-h-[230px] border-2">
                {/* To do: Google Map here */} Work IN PROGRESS
            </div>
            <ScrollArea className="h-[calc(100vh-400px)] max-h-[500px]">
                {routeInfo &&
                    routeInfo.map((stop, index) => (
                        <Collapsible
                            key={stop.routeInfo.seq}
                            className="border-b border-slate-400 "
                            open={index === openedStop}
                        >
                            <CollapsibleTrigger
                                className="relative flex flex-row w-full items-center p-2"
                                onClick={() => setOpenedStop(index)}
                            >
                                <p className=" ml-8">
                                    {index + 1}. {stop.stopInfo.name_tc}
                                </p>
                                {openedStop === index ? (
                                    <ArrowUp className="h-7 w-6 absolute top-2 right-5 p-0 border-2 border-slate-800 dark:border-slate-50" />
                                ) : (
                                    <ArrowDown className="h-7 w-6 absolute top-2 right-5 p-0 border-2 border-slate-800 dark:border-slate-50" />
                                )}
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="p-2">
                                    {stop.stopETA.map((eta) => (
                                        <div
                                            key={eta.eta_seq}
                                            className=" flex items-center ml-20 "
                                        >
                                            {moment(
                                                eta.eta,
                                                "YYYY-MM-DD HH:mm:ss"
                                            ).diff(moment(), "minutes") > 0 ? (
                                                <span>
                                                    <span className="text-blue-600 font-extrabold w-[80px]">
                                                        {moment(
                                                            eta.eta,
                                                            "YYYY-MM-DD HH:mm:ss"
                                                        ).diff(
                                                            moment(),
                                                            "minutes"
                                                        )}
                                                    </span>{" "}
                                                    <span>分鐘</span>
                                                    <span className="text-sm text-slate-500 ml-4">
                                                        {eta.rmk_tc}
                                                    </span>
                                                </span>
                                            ) : (
                                                "即將到達"
                                            )}{" "}
                                        </div>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
            </ScrollArea>
        </>
    );
}

export default BusRoutePage;
