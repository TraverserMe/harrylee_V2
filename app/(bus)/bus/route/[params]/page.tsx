"use client";

import { getRouteETA } from "@/action/bus";
import moment from "moment";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    RouteETA,
    KMBRouteStopInfo,
    StopETA,
    StopInfo,
    CTBRouteStopInfo,
} from "@/schemas/bus";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { calculateDistance } from "@/utils/bus";

async function getKMBData(route: string, dir: string, serviceType: string) {
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
    return busStopETA;
}

async function getCTBData(route: string, dir: string) {
    let busStopETA = [] as RouteETA[];
    const res = await fetch(
        "https://rt.data.gov.hk/v2/transport/citybus/route-stop/CTB/" +
            route +
            "/" +
            dir
    );
    const json = await res.json();
    const busRouteStops = json.data as CTBRouteStopInfo[];

    for (let i = 0; i < busRouteStops.length; i++) {
        const stopRes = await fetch(
            "https://rt.data.gov.hk/v2/transport/citybus/stop/" +
                busRouteStops[i].stop
        );
        const stopJson = await stopRes.json();
        const stopInfo = stopJson.data as StopInfo;
        const res = await fetch(
            "https://rt.data.gov.hk/v2/transport/citybus/eta/CTB/" +
                busRouteStops[i].stop +
                "/" +
                busRouteStops[i].route,
            {
                cache: "no-cache",
            }
        );

        const json = await res.json();
        const stopETA = json.data as StopETA[];

        busStopETA.push({
            routeInfo: busRouteStops[i],
            stopETA: stopETA.filter(
                (eta) => eta.route === route && eta.dir === busRouteStops[i].dir
            ),
            stopInfo: stopInfo,
        });
    }

    return busStopETA;
}

function getClosestStop(
    busStopETA: RouteETA[],
    userLocation: { lat: number; long: number }
) {
    return busStopETA
        .map((stop) => {
            return {
                distance: calculateDistance(
                    stop.stopInfo.lat,
                    stop.stopInfo.long,
                    userLocation.lat,
                    userLocation.long
                ),
                stop: stop,
            };
        })
        .sort((a, b) => a.distance - b.distance)[0].stop.routeInfo.seq;
}

function BusRoutePage() {
    const [userLocation, setUserLocation] = useState({
        lat: 22.302711,
        long: 114.177216,
    });

    const [counterForOneTime, setCounterForOneTime] = useState(0);
    const pathname = usePathname().split("/")[3];
    const type = pathname?.split("&")[0];
    const route = pathname?.split("&")[1];
    const dir = pathname?.split("&")[2] === "I" ? "inbound" : "outbound";
    const serviceType = pathname?.split("&")[3];

    const [locationPermission, setLocationPermission] = useState(true);
    const interval = useRef<NodeJS.Timeout | null>(null);
    const [openedStop, setOpenedStop] = useState(0);
    const [routeInfo, setRouteInfo] = useState<RouteETA[]>();

    function _onGetCurrentLocation() {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setUserLocation({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
                setLocationPermission(true);
                const index = routeInfo
                    ? getClosestStop(routeInfo, {
                          lat: position.coords.latitude,
                          long: position.coords.longitude,
                      })
                    : 0;
                if (index !== 0 && counterForOneTime === 0) {
                    setOpenedStop(Number(index) - 1);
                    const element = document.getElementById("stop-" + index);
                    element?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                        inline: "nearest",
                    });
                    setCounterForOneTime(counterForOneTime + 1);
                }
            },
            function (error) {
                //error handler here
            },
            options
        );
    }

    useEffect(() => {
        if (type === "kmb") {
            getKMBData(route, dir, serviceType).then((routeInfo) => {
                setRouteInfo(routeInfo);
            });
        } else if (type === "ctb") {
            getCTBData(route, dir).then((routeInfo) => {
                setRouteInfo(routeInfo);
            });
        }
    }, [route, dir, serviceType]);

    useEffect(() => {
        if (interval.current) {
            clearInterval(interval.current);
        }
        interval.current = setInterval(() => {
            if (type === "kmb") {
                getKMBData(route, dir, serviceType).then((routeInfo) => {
                    setRouteInfo(routeInfo);
                });
            }

            if (type === "ctb") {
                getCTBData(route, dir).then((routeInfo) => {
                    setRouteInfo(routeInfo);
                });
            }
        }, 55000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, []);

    useEffect(() => {
        if (navigator.permissions && navigator.permissions.query) {
            //try permissions APIs first
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    // Will return ['granted', 'prompt', 'denied']
                    const permission = result.state;
                    if (permission === "granted" || permission === "prompt") {
                        _onGetCurrentLocation();
                    } else {
                        setLocationPermission(false);
                    }
                });
        } else if (navigator.geolocation) {
            //then Navigation APIs
            _onGetCurrentLocation();
        }
    }, [locationPermission, routeInfo]);

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
                            id={`stop-${index + 1}`}
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
