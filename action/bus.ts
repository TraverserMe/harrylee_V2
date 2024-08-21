"use server";

import { RouteStopInfo, StopETA, StopInfo } from "@/schemas/bus";
import { calculateDistance } from "@/utils/bus";
import { promises as fs } from "fs";

// export const getAllBusStops = async () => {

//     const res = await fetch(
//         "https://data.etabus.gov.hk/v1/transport/kmb/stop"
//     );
//     // console.log(res.json())
//     const json = await Promise.resolve(await res.json());
//     return json.data as StopInfo[];

//     // return json as StopInfo[]
// };

export const getAllBusStops = async () => {
    const path = process.cwd() + "/public/busStop.json"
    const file = await fs.readFile(path, "utf8");
    const json = JSON.parse(file);
    return json.data as StopInfo[]
};


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
                    stop: nearByBusStops[i].name_tc,
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

export const getAllRoutes = async () => {
    const res = await fetch(
        "https://data.etabus.gov.hk/v1/transport/kmb/route"
    );
    const json = await res.json();
    return json.data as RouteStopInfo[];
};
