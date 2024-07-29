"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Div = styled(motion.div)`
    margin-right: 0.25em;
    font-size: 1.25rem;
    @media (max-width: 768px) {
        font-size: 1rem;
    }

    // &:hover {
    //     text-decoration: underline;
    // }
`;
interface AnimatedDivProps {
    children: React.ReactNode;
    direction?: "left" | "right" | "top" | "bottom";
}

export default function AnimatedDiv({
    children,
    direction = "left",
}: AnimatedDivProps) {
    const ctrls = useAnimation();

    const { ref, inView } = useInView({
        threshold: 0.3,
    });

    useEffect(() => {
        if (inView) {
            ctrls.start("visible");
        }
        if (!inView) {
            ctrls.start("hidden");
        }
    }, [ctrls, inView]);

    //whole paragraph is move from

    const divAnimation = {
        hidden: {
            opacity: 0,
            x:
                direction === "left"
                    ? "-5rem"
                    : direction === "right"
                    ? "10rem"
                    : "0",
            y:
                direction === "top"
                    ? "-5rem"
                    : direction === "bottom"
                    ? "10rem"
                    : "0",
        },
        visible: {
            opacity: 1,
            x: "0",
            y: "0",
            transition: {
                duration: 1,
            },
        },
    };

    return (
        <Div
            ref={ref}
            animate={ctrls}
            aria-hidden="true"
            initial="hidden"
            variants={divAnimation}
        >
            {children}
        </Div>
    );
}
