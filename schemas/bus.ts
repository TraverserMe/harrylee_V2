export type StopInfo = {
    stop: string;
    name_tc: string;
    name_en: string;
    lat: number;
    long: number;
}

export type KMBRouteStopInfo = {
    route: string;
    bound: string;
    service_type: string;
    seq: number;
    stop: string;
}

export type StopETA = {
    stop: StopInfo,
    co: "KMB",
    route: string,
    dir: string,
    service_type: string,
    seq: number,
    dest_tc: string,
    dest_en: string,
    eta_seq: number,
    eta: string,
    rmk_tc: string,
    rmk_en: string
}

export type RouteETA = {
    stopETA: StopETA[],
    routeInfo: KMBRouteStopInfo
    stopInfo: StopInfo
}

export type Route = {
    co: "KMB" | "CTB" | "MB"
    route: string
    orig_tc: string
    orig_en: string
    dest_tc: string
    dest_en: string
    bound?: string
    service_type?: string
    route_id?: number
}

export type MiniBusRouteInfo = {
    route_id: number,
    region: string,
    route_code: string,
    description_tc: string,
    description_en: string,
    directions: {
        route_seq: number,
        orig_tc: string,
        orig_en: string,
        dest_tc: string,
        dest_en: string,
        remarks_tc: string,
        remarks_en: string
    }[]
}