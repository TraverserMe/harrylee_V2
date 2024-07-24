"use client";

import { useEffect, useState } from "react";

const useMediaQuery = (mediaQuery: string, defaultState = false) => {
    const [state, setState] = useState(defaultState);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(mediaQuery);
        const documentChangeHandler = () => setState(mediaQueryList.matches);

        mediaQueryList.addEventListener("change", documentChangeHandler);
        documentChangeHandler();

        return () => {
            mediaQueryList.removeEventListener("change", documentChangeHandler);
        };
    }, [mediaQuery]);

    return state;
};

export { useMediaQuery };
