"use client";
import AnimatedParagraph from "@/components/effect/animated-paragraph";
import AnimatedTitle from "@/components/effect/animated-title";
import AnimatedDiv from "@/components/effect/animated-div";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
    const searchParams = useSearchParams();
    const section = searchParams.get("section");

    useEffect(() => {
        if (section) {
            document
                .getElementById(section)
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            console.log(section);
        }
    }, [section]);

    return (
        <main>
            <section id="home">
                <AnimatedTitle text="Hello! Nice to meet you." />
                <div className="flex flex-col space-y-4 text-wrap md:flex-row md:space-x-4">
                    <Image
                        src={"/boy-coding.jpeg"}
                        alt="boy coding"
                        width={500}
                        height={500}
                        className="rounded-md w-[200px] h-[200px] md:w-[400px] mx-auto mt-6"
                        priority={true}
                    />
                    <AnimatedParagraph
                        text="My name is Harry🧑‍💻, I thrive on turning
                    ideas into functional, elegant web solutions. Armed with a
                    Bachelors Degree in Electrical and Electronic Engineering,
                    I've honed my skills in JavaScript, React, and Next.js. My
                    passion lies in exploring the intersection of technology and
                    creativity, and I recently completed a DAO platform as my
                    final year project. Join me on this digital journey as we
                    build innovative experiences together!"
                        className="hover:underline text-justify"
                    />
                </div>
            </section>

            <section
                id="introduction"
                className="mt-16 flex flex-col space-y-2 overflow-hidden text-justify"
            >
                <AnimatedTitle text="Introduction" />
                <AnimatedDiv>
                    <ul className="flex flex-col space-y-2">
                        <li className="hover:underline">
                            1. Next.js
                            <ul>
                                The Foundation of this project is Next.js, a
                                powerful React framework that enables
                                server-side rendering, static site generation,
                                and seamless routing. With Next.js, I've built a
                                fast, dynamic, and SEO-friendly website that
                                delivers an exceptional user experience.
                            </ul>
                        </li>
                        <li className="hover:underline">
                            2. Google Firebase
                            <ul>
                                For data storage, authentication, and real-time
                                updates, I turned to Google Firebase. Firebase
                                provides a suite of tools that seamlessly
                                integrate with Next.js, allowing me to focus on
                                functionality rather than infrastructure.
                                Whether it's user authentication, database
                                management, or cloud functions, Firebase has
                                been my reliable companion.
                            </ul>
                        </li>
                        <li className="hover:underline">
                            3. Vercel
                            <ul>
                                To deploy and host my website, I chose Vercel.
                                Their platform is developer-friendly, offering
                                automatic deployments, global CDN, and custom
                                domains. With Vercel, my site is lightning-fast
                                and always available.
                            </ul>
                        </li>
                    </ul>
                </AnimatedDiv>
                <AnimatedDiv direction="right">
                    <ul className="flex flex-col space-y-2">
                        <li className="hover:underline">
                            4. Styling Magic
                            <ul>
                                For styling, I've embraced Styled Components. It
                                allows me to write CSS-in-JS, keeping my styles
                                organized and reusable.
                            </ul>
                        </li>
                        <li className="hover:underline">
                            5. Framer Motion
                            <ul>
                                Animations breathe life into my website. With
                                Framer Motion, I've added delightful
                                transitions, smooth scroll effects, and
                                interactive elements.
                            </ul>
                        </li>
                        <li className="hover:underline">
                            6. Tailwind CSS
                            <ul>
                                It is my secret weapon for efficient styling.
                                Its utility-first approach lets me compose
                                complex layouts and components with ease. Plus,
                                the Tailwind ecosystem offers handy plugins like
                                tailwind-merge and tailwindcss-animate.
                            </ul>
                        </li>
                    </ul>
                </AnimatedDiv>
            </section>

            <section id="functions">
                <AnimatedTitle text="Functions" />
                <AnimatedParagraph text="" />
            </section>
        </main>
    );
}
