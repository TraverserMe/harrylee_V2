"use client";

import { StopInfo } from "@/schemas/bus";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
} from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

//Map's styling
//K2's coordinates
const defaultMapCenter = { lat: 22.3193, lng: 114.1694 };

//Default zoom level, can be adjusted
const defaultMapZoom = 13;

//Map options
const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: "auto",
    mapTypeId: "roadmap",
};

const MapComponent = ({
    stopInfo,
    openedStop,
    setOpenedStop,
}: {
    stopInfo: StopInfo[];
    openedStop: number;
    setOpenedStop: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const mapRef = useRef<google.maps.Map | null>();

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.panTo({
                lat: parseFloat(stopInfo[1].lat.toString()),
                lng: parseFloat(stopInfo[1].long.toString()),
            });
        }
    }, [stopInfo]);

    return (
        <div className="w-full h-[230px]">
            {stopInfo.length > 0 && (
                <APIProvider
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API!}
                    onLoad={() => console.log("Maps API has loaded.")}
                    version="weekly"
                    libraries={["marker", "places"]}
                >
                    <Map
                        id="map"
                        defaultZoom={defaultMapZoom}
                        defaultCenter={defaultMapCenter}
                        gestureHandling={"greedy"}
                        disableDefaultUI={true}
                    >
                        <AdvancedMarker
                            position={{ lat: 22.3193, lng: 114.1694 }}
                        />
                        {/* {stopInfo.length > 0 &&
                        stopInfo.map((stop, index) => (
                            <AdvancedMarker
                                key={stop.stop}
                                position={{
                                    lat: parseFloat(stop.lat.toString()),
                                    lng: parseFloat(stop.long.toString()),
                                }}
                                onClick={() => setOpenedStop(index)}
                            />
                        ))} */}
                    </Map>
                </APIProvider>
            )}
        </div>
    );
};

export { MapComponent };
