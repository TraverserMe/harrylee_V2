"use client";

import { getAllKMBRoutes, getMinimumBusRoute } from "@/action/bus";
import LoadingWithText from "@/components/loading-with-text";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MiniBusRouteInfo, Route } from "@/schemas/bus";
import { useEffect, useState } from "react";
import miniBusRoute from "@/public/miniBusRoute.json";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import BusSearchRow from "@/components/bus/bus-search-row";

const getMiniBusRoutes = async () => {
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
    console.log(mbRoute);
    return mbRoute;
};

const getData = async () => {
    const kmbRoutes = await getAllKMBRoutes();

    const ctbRes = await fetch(
        "https://rt.data.gov.hk/v2/transport/citybus/route/ctb"
    );
    const ctbJson = await ctbRes.json();
    const tempCTBRoutes = ctbJson.data as Route[];
    const ctbRoutes = tempCTBRoutes.map((route) => {
        return {
            co: "CTB",
            route: route.route,
            route_id: route.route_id,
            orig_tc: route.orig_tc,
            orig_en: route.orig_en,
            dest_tc: route.dest_tc,
            dest_en: route.dest_en,
            bound: "I",
        } as Route;
    });

    const revertCtbRoutes = tempCTBRoutes.map((route) => {
        return {
            co: "CTB",
            route: route.route,
            route_id: route.route_id,
            orig_tc: route.dest_tc,
            orig_en: route.dest_en,
            dest_tc: route.orig_tc,
            dest_en: route.orig_en,
            bound: "o",
        };
    }) as Route[];

    // const mbRes = (await getMiniBusRoutes()) as Route[];

    return [...kmbRoutes, ...ctbRoutes, ...revertCtbRoutes];
};

function BusSearchPage() {
    const [routes, setRoutes] = useState<Route[]>([]);

    const [searchRoute, setSearchRoute] = useState<string>("");

    const filteredRoutes = routes.filter(
        (route) => route.route.slice(0, searchRoute.length) === searchRoute
    );

    // check the second letter of the route
    const nextLetter = Array.from(
        new Set(
            filteredRoutes
                .map((route) => {
                    if (route.route.length === searchRoute.length) {
                        return undefined;
                    }
                    return route.route
                        .slice(0, searchRoute.length + 1)
                        .slice(-1);
                })
                .filter((letter) => {
                    return letter !== undefined;
                })
        )
    );

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // get all alphabet letters in the next letter
    const alphabetInNext =
        searchRoute.length > 0
            ? Array.from(
                  new Set(
                      nextLetter.filter((letter) => {
                          return alphabet.includes(letter);
                      })
                  )
              )
            : [];

    useEffect(() => {
        getData().then((routes) => {
            setRoutes(routes);
        });
    }, []);

    return (
        <>
            {routes.length > 0 ? (
                <>
                    <div className="h-[50px] flex justify-center border-2 items-center">
                        {searchRoute}
                    </div>
                    <ScrollArea className="h-[calc(50vh-50px)] md:h-[calc(50vh-200px)] max-h-[500px]">
                        {filteredRoutes.map((route, i) => {
                            return <BusSearchRow key={i} routeInfo={route} />;
                        })}
                    </ScrollArea>
                    <div className="h-[250px] flex flex-row">
                        <div className=" items-center w-3/4 justify-center">
                            {new Array(9).fill(0).map((_, i) => {
                                return (
                                    <Button
                                        onClick={() => {
                                            setSearchRoute(
                                                searchRoute + (i + 1).toString()
                                            );
                                        }}
                                        key={i + 1}
                                        className="w-1/3 h-1/4  text-3xl font-semibold"
                                        variant={"outline"}
                                        disabled={
                                            !nextLetter.includes(
                                                (i + 1).toString()
                                            )
                                        }
                                    >
                                        {i + 1}
                                    </Button>
                                );
                            })}
                            <div className="flex h-1/4">
                                <Button
                                    onClick={() => {
                                        setSearchRoute("");
                                    }}
                                    className="w-1/3 h-full text-2xl font-semibold text-red-600"
                                    variant={"outline"}
                                >
                                    取消
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSearchRoute(searchRoute + "0");
                                    }}
                                    className="w-1/3 h-full text-3xl font-semibold"
                                    variant={"outline"}
                                    disabled={!nextLetter.includes("0")}
                                >
                                    0
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSearchRoute(
                                            searchRoute.slice(0, -1)
                                        );
                                    }}
                                    variant={"outline"}
                                    className="w-1/3 h-full"
                                    disabled={searchRoute.length === 0}
                                >
                                    <X />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 items-center w-1/4 bg-slate-200 ">
                            {alphabetInNext.length > 0 && (
                                <ScrollArea className="h-[250px] ">
                                    {alphabetInNext.map((letter, i) => {
                                        return (
                                            <Button
                                                onClick={() => {
                                                    setSearchRoute(
                                                        searchRoute + letter
                                                    );
                                                }}
                                                key={i}
                                                className="w-full h-1/4 text-3xl font-semibold"
                                                variant={"outline"}
                                            >
                                                {letter}
                                            </Button>
                                        );
                                    })}
                                </ScrollArea>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <LoadingWithText text="Loading..." />
            )}
        </>
    );
}

export default BusSearchPage;
