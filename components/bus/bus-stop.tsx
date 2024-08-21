"use client";

import { getNearByBusStops } from "@/action/bus";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StopETA, StopInfo } from "@/schemas/bus";
import { useEffect, useRef, useState } from "react";
import BusRow from "@/components/bus/bus-page-row";

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
            getNearByBusStops({
                userLocation: {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                },
                range,
            }).then((res) => {
                if ("error" in res) {
                    // console.log(res.error);
                    return;
                }
                setNearestBusStop(res.busStops);
                setNearestBusStopETA(res.busStopETA);
            });
            setUserLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            });
            if (interval.current) {
                clearInterval(interval.current);
            }
            interval.current = setInterval(() => {
                getNearByBusStops({
                    userLocation: {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    },
                    range,
                }).then((res) => {
                    if ("error" in res) {
                        // console.log(res.error);
                        return;
                    }
                    setNearestBusStop(res.busStops);
                    setNearestBusStopETA(res.busStopETA);
                });
            }, 55000);

            return () => {
                if (interval.current) {
                    clearInterval(interval.current);
                }
            };
        });
    }, []);

    return (
        <ScrollArea className="h-[520px]">
            {/* {userLocation.lat} {userLocation.long} */}
            {/* <br /> */}
            {nearestBusStopETA &&
                nearestBusStopETA
                    .sort(
                        (a, b) => a.route.charCodeAt(0) - b.route.charCodeAt(0)
                    )
                    .map((stop, index) => (
                        <div key={index}>
                            <BusRow
                                busRoute={stop.route}
                                dest={stop.dest_tc}
                                eta={stop.eta}
                                rmk={stop.rmk_tc}
                                busStop={stop.stop}
                            />
                        </div>
                    ))}
        </ScrollArea>
    );
}

export default BusStop;
