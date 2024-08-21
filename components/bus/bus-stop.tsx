"use client";

import { getAllBusStops, getNearByBusStops } from "@/action/bus";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StopETA, StopInfo } from "@/schemas/bus";
import { useEffect, useRef, useState } from "react";
import BusRow from "@/components/bus/bus-page-row";
import { calculateDistance } from "@/utils/bus";
import LoadingWithText from "../loading-with-text";
import Link from "next/link";

async function getData({
    userLocation,
    range,
}: {
    userLocation: { lat: number; long: number };
    range: number;
}) {
    const allBusStops = await getAllBusStops();
    var nearByBusStops = [] as StopInfo[];
    //fetch the nearby bus stops ETA
    var nearestBusStopETA = [] as StopETA[];

    //calculate distance between user and bus stops in range
    for (let i = 0; i < allBusStops.length; i++) {
        const d = calculateDistance(
            userLocation.lat,
            userLocation.long,
            allBusStops[i].lat,
            allBusStops[i].long
        );
        if (d > 500) {
            continue;
        }
        if (d <= range) {
            nearByBusStops.push(allBusStops[i]);
        }
    }

    if (!nearByBusStops.length) {
        nearByBusStops = allBusStops.slice(0, 30);
    }

    for (let i = 0; i < nearByBusStops.length; i++) {
        const res = await fetch(
            "https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/" +
                nearByBusStops[i].stop,
            {
                cache: "no-cache",
            }
        );
        const json = await res.json();

        const busStopETA = json.data as {
            co: "KMB";
            route: string;
            dir: string;
            service_type: string;
            seq: number;
            dest_tc: string;
            dest_en: string;
            eta_seq: number;
            eta: string;
            rmk_tc: string;
            rmk_en: string;
        }[];
        // just take the first one of each route

        busStopETA.map((stopETA) => {
            if (
                stopETA.eta_seq === 1 &&
                //not already in the list and not the same direction
                nearestBusStopETA.findIndex(
                    (x) => x.route === stopETA.route && x.dir === stopETA.dir
                ) === -1 &&
                stopETA.eta
            ) {
                nearestBusStopETA.push({
                    stop: nearByBusStops[i],
                    ...stopETA,
                });
            }
        });
    }

    return {
        busStops: nearByBusStops,
        busStopETA: nearestBusStopETA,
    };
}

function BusStop() {
    const [userLocation, setUserLocation] = useState({
        lat: 22.302711,
        long: 114.177216,
    });

    const interval = useRef<NodeJS.Timeout | null>(null);

    const [nearestBusStop, setNearestBusStop] = useState<StopInfo[]>([]);
    const [nearestBusStopETA, setNearestBusStopETA] = useState<StopETA[]>([]);

    const range = 500; //meters

    useEffect(() => {
        if (!navigator.geolocation) {
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            getData({
                userLocation: {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                },
                range,
            }).then((res) => {
                // setNearestBusStop(res.busStops);
                setNearestBusStopETA(res.busStopETA);
            });
            setUserLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            });
        });
    }, []);

    useEffect(() => {
        if (interval.current) {
            clearInterval(interval.current);
        }
        interval.current = setInterval(() => {
            getNearByBusStops({
                userLocation: {
                    lat: userLocation.lat,
                    long: userLocation.long,
                },
                range,
            }).then((res) => {
                // setNearestBusStop(res.busStops);
                setNearestBusStopETA(res.busStopETA);
            });
        }, 55000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, [userLocation]);

    return (
        <ScrollArea className="h-[calc(100vh-200px)] max-h-[700px]">
            {/* {userLocation.lat} {userLocation.long} */}
            {/* <br /> */}
            {nearestBusStopETA.length === 0 && (
                <LoadingWithText text="Loading nearest bus stop..." />
            )}

            {nearestBusStopETA.length > 0 &&
                nearestBusStopETA
                    .sort(
                        (a, b) => a.route.charCodeAt(0) - b.route.charCodeAt(0)
                    )
                    .map((stop, index) => (
                        <div key={index}>
                            <Link
                                href={
                                    "/bus/id/" +
                                    stop.route +
                                    "&" +
                                    stop.dir +
                                    "&" +
                                    stop.service_type +
                                    "&" +
                                    stop.seq
                                }
                            >
                                <BusRow
                                    busRoute={stop.route}
                                    dest={stop.dest_tc}
                                    eta={stop.eta}
                                    rmk={stop.rmk_tc}
                                    busStop={stop.stop.name_tc}
                                />
                            </Link>
                        </div>
                    ))}
        </ScrollArea>
    );
}

export default BusStop;
