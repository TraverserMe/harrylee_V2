"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Title = styled.h2`
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Word = styled(motion.span)`
    display: inline-block;
    margin-right: 0.25em;
    white-space: nowrap;
    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const Character = styled(motion.span)`
    display: inline-block;
    margin-right: -0.05em;
`;

export default function AnimatedTitle({ text }: { text: string }) {
    const ctrls = useAnimation();

    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            ctrls.start("visible");
        }
        if (!inView) {
            ctrls.start("hidden");
        }
    }, [ctrls, inView]);

    const wordAnimation = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
    };

    const characterAnimation = {
        hidden: {
            opacity: 0,
            y: `0.25rem`,
        },
        visible: {
            opacity: 1,
            y: `0px`,
            transition: {
                duration: 0.5,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };

    return (
        <Title aria-label={text} role="heading">
            {text.split(" ").map((word, index) => {
                return (
                    <Word
                        ref={ref}
                        aria-hidden="true"
                        key={index}
                        initial="hidden"
                        animate={ctrls}
                        variants={wordAnimation}
                        transition={{
                            delayChildren: index * 0.15,
                            staggerChildren: 0.05,
                        }}
                        whileHover={{ scale: 1.1 }}
                    >
                        {word.split("").map((character, index) => {
                            return (
                                <Character
                                    aria-hidden="true"
                                    key={index}
                                    variants={characterAnimation}
                                >
                                    {character}
                                </Character>
                            );
                        })}
                    </Word>
                );
            })}
        </Title>
    );
}
