"use server";

import { MiniBusRouteInfo, Route, RouteETA, KMBRouteStopInfo, StopETA, StopInfo } from "@/schemas/bus";
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

    const busRouteStops = json.data as KMBRouteStopInfo[]

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

export const getMinimumBusRoute = async () => {
    const mbRes = await fetch("https://data.etagmb.gov.hk/route/");

    const mbJson = await mbRes.json();
    const mbAllRoutes = mbJson.data as {
        routes: {
            HKI: string[];
            NT: string[];
            KLN: string[];
        };
    };
    const mbRoutes = mbAllRoutes.routes;
    // let mbRouteInfo = [] as MiniBusRouteInfo[];
    let mbRoute = [] as Route[];

    for (let i = 0; i < mbRoutes.HKI.length; i++) {
        const res = await fetch(
            "https://data.etagmb.gov.hk/route/HKI/" + mbRoutes.HKI[i]
        );
        const routeJson = await res.json();
        const routeInfo = routeJson.data[0] as MiniBusRouteInfo;

        for (let j = 0; j < routeInfo.directions.length; j++) {
            mbRoute.push({
                co: "MB",
                route: routeInfo.route_code,
                orig_tc: routeInfo.directions[j].orig_tc,
                orig_en: routeInfo.directions[j].orig_en,
                dest_tc: routeInfo.directions[j].dest_tc,
                dest_en: routeInfo.directions[j].dest_en,
                route_id: routeInfo.route_id,
            });
        }
    }

    for (let i = 0; i < mbRoutes.NT.length; i++) {
        const res = await fetch(
            "https://data.etagmb.gov.hk/route/NT/" + mbRoutes.NT[i]
        );
        const routeJson = await res.json();
        const routeInfo = routeJson.data[0] as MiniBusRouteInfo;

        for (let j = 0; j < routeInfo.directions.length; j++) {
            mbRoute.push({
                co: "MB",
                route: routeInfo.route_code,
                orig_tc: routeInfo.directions[j].orig_tc,
                orig_en: routeInfo.directions[j].orig_en,
                dest_tc: routeInfo.directions[j].dest_tc,
                dest_en: routeInfo.directions[j].dest_en,
                route_id: routeInfo.route_id,
            });
        }
    }

    for (let i = 0; i < mbRoutes.KLN.length; i++) {
        const res = await fetch(
            "https://data.etagmb.gov.hk/route/KLN/" + mbRoutes.KLN[i]
        );
        const routeJson = await res.json();
        const routeInfo = routeJson.data[0] as MiniBusRouteInfo;

        for (let j = 0; j < routeInfo.directions.length; j++) {
            mbRoute.push({
                co: "MB",
                route: routeInfo.route_code,
                orig_tc: routeInfo.directions[j].orig_tc,
                orig_en: routeInfo.directions[j].orig_en,
                dest_tc: routeInfo.directions[j].dest_tc,
                dest_en: routeInfo.directions[j].dest_en,
                route_id: routeInfo.route_id,
            });
        }
    }
    return mbRoute;
}

export const getAllKMBRoutes = async () => {
    const res = await fetch(
        "https://data.etabus.gov.hk/v1/transport/kmb/route/"
    );
    const json = await res.json()

    const kmbRoutes = json.data as {
        route: string
        orig_tc: string
        orig_en: string
        dest_tc: string
        dest_en: string
        service_type: string
        bound: string
    }[];

    return kmbRoutes.map((route) => {
        return {
            co: "KMB",
            route: route.route,
            orig_tc: route.orig_tc,
            orig_en: route.orig_en,
            dest_tc: route.dest_tc,
            dest_en: route.dest_en,
            service_type: route.service_type,
            bound: route.bound
        } as Route
    }).filter((route) => route.service_type !== "2")
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

    const mbRes = await getMinimumBusRoute();
    return kmbRoutes.concat(ctbRoutes).concat(mbRes);
};  