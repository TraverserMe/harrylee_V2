"use client";

import {
    getAllBusStops,
    getNearBusStopETA,
    getNearByBusStops,
} from "@/action/bus";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StopETA, StopInfo } from "@/schemas/bus";
import { useEffect, useRef, useState } from "react";
import BusRow from "@/components/bus/bus-page-row";
import { calculateDistance } from "@/utils/bus";
import LoadingWithText from "../loading-with-text";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
        nearByBusStops = allBusStops.slice(0, 50);
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

    const [locationPermission, setLocationPermission] = useState(true);

    const interval = useRef<NodeJS.Timeout | null>(null);

    const [nearestBusStop, setNearestBusStop] = useState<StopInfo[]>([]);
    const [nearestBusStopETA, setNearestBusStopETA] = useState<StopETA[]>([]);

    const range = 500; //meters

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
                getData({
                    userLocation: {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    },
                    range,
                }).then((res) => {
                    setNearestBusStop(res.busStops);
                    setNearestBusStopETA(res.busStopETA);
                });
            },
            function (error) {
                //error handler here
            },
            options
        );
    }

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
                        getData({
                            userLocation: {
                                lat: userLocation.lat,
                                long: userLocation.long,
                            },
                            range,
                        }).then((res) => {
                            setNearestBusStop(res.busStops);
                            setNearestBusStopETA(res.busStopETA);
                        });
                    }
                });
        } else if (navigator.geolocation) {
            //then Navigation APIs
            _onGetCurrentLocation();
        }
    }, [locationPermission]);

    useEffect(() => {
        if (interval.current) {
            clearInterval(interval.current);
        }
        interval.current = setInterval(() => {
            getNearBusStopETA(nearestBusStop).then((res) => {
                setNearestBusStopETA(res);
            });
        }, 55000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, [nearestBusStop]);

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
                                    "/bus/route/kmb&" +
                                    stop.route +
                                    "&" +
                                    stop.dir +
                                    "&" +
                                    stop.service_type
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
            {!locationPermission && (
                <Button
                    className="absolute bottom-2 right-10 w-[120px]"
                    onClick={_onGetCurrentLocation}
                >
                    Get my location
                </Button>
            )}
        </ScrollArea>
    );
}

export default BusStop;
