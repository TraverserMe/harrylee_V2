export type StopInfo = {
    stop: string;
    name_tc: string;
    name_en: string;
    lat: number;
    long: number;
}

export type RouteStopInfo = {
    route: string;
    bound: string;
    service_type: string;
    seq: number;
    stop: string;
}

export type StopETA = {
    stop: string,
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