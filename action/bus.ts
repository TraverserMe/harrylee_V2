"use server";

import { Route, RouteETA, RouteStopInfo, StopETA, StopInfo } from "@/schemas/bus";
import { calculateDistance } from "@/utils/bus";

export const getAllBusStops = async () => {

    const res = await fetch(
        "https://data.etabus.gov.hk/v1/transport/kmb/stop/"
    );
    // console.log(res.json())
    const json = await res.json()
    return json.data as StopInfo[];

    // return json as StopInfo[]
};

//this function is not available on the server side when this is a hobby plan
export const getNearByBusStops = async ({
    userLocation,
    range,
}: {
    userLocation: { lat: number; long: number };
    range: number;
}) => {
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
            if (stopETA.eta_seq === 1
                &&
                //not already in the list and not the same direction
                (nearestBusStopETA.findIndex((x) => x.route === stopETA.route && x.dir === stopETA.dir) === -1
                )
                &&
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
};



export const getRouteETA = async (route: string, dir: string, serviceType: string) => {

    let busStopETA = [] as RouteETA[]
    const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/route-stop/" + route + "/" + dir + "/" + serviceType);
    const json = await res.json()

    const busRouteStops = json.data as RouteStopInfo[]

    for (let i = 0; i < busRouteStops.length; i++) {

        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/" + busRouteStops[i].stop, {
            cache: "no-cache",
        })
        const json = await res.json()

        const stopRes = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop/" + busRouteStops[i].stop,
        )
        const stopJson = await stopRes.json()

        const stopInfo = stopJson.data as StopInfo
        const stopETA = json.data as StopETA[]

        busStopETA.push({
            routeInfo: busRouteStops[i],
            stopETA: stopETA.filter((eta) => (eta.route === route && eta.dir === busRouteStops[i].bound)),
            stopInfo: stopInfo
        })

    }

    return busStopETA
}

export const getNearBusStopETA = async (stops: StopInfo[]) => {
    let nearestBusStopETA = [] as StopETA[]

    for (let i = 0; i < stops.length; i++) {

        const res = await fetch("https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/" + stops[i].stop, {
            cache: "no-cache",
        }
        )
        const json = await res.json()

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
                    stop: stops[i],
                    ...stopETA,
                });
            }
        });
    }

    return nearestBusStopETA
}

export const getAllRoutes = async () => {
    const kmbRes = await fetch(
        "https://data.etabus.gov.hk/v1/transport/kmb/route"
    );
    const json = await kmbRes.json();
    const kmbRoutes = {
        co: "KMB",
        ...json.data,
    } as Route[];

    const ctbRes = await fetch(
        "https://rt.data.gov.hk/v2/transport/citybus/route/ctb"
    );
    const ctbJson = await ctbRes.json();
    const ctbRoutes = ctbJson.data as Route[];

    const mbRes = await fetch("https://data.etagmb.gov.hk/route/")

    return true
};  