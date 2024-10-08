"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const Paragraph = styled(motion.p)`
    margin-right: 0.25em;
    font-size: 1.25rem;
    @media (max-width: 768px) {
        font-size: 1rem;
    }

    // &:hover {
    //     text-decoration: underline;
    // }
`;
interface AnimatedParagraphProps {
    text: string;
    direction?: "left" | "right" | "top" | "bottom";
    className?: string;
}

export default function AnimatedParagraph({
    text,
    direction = "left",
    className,
}: AnimatedParagraphProps) {
    const ctrls = useAnimation();

    const { ref, inView } = useInView({
        threshold: 0.7,
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

    const paragraphAnimation = {
        hidden: {
            opacity: 0,
            x:
                direction === "left"
                    ? "-5rem"
                    : direction === "right"
                    ? "5rem"
                    : "0",
            y:
                direction === "top"
                    ? "-5rem"
                    : direction === "bottom"
                    ? "5rem"
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
        <Paragraph
            ref={ref}
            animate={ctrls}
            aria-hidden="true"
            initial="hidden"
            variants={paragraphAnimation}
            className={cn("inline", className)}
        >
            {text}
        </Paragraph>
    );
}
