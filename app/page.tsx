"use client";
import AnimatedParagraph from "@/components/effect/animated-paragraph";
import AnimatedTitle from "@/components/effect/animated-title";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const searchParams = useSearchParams();
    const section = searchParams.get("section");

    useEffect(() => {
        if (section) {
            console.log(section);
            document
                .getElementById(section)
                ?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
        }
    }, [section]);

    return (
        <main>
            <section id="home">
                <AnimatedTitle text="Hello! Nice to meet you." />
                <AnimatedParagraph
                    text="As an aspiring Full Stack Programmer, I thrive on turning
                    ideas into functional, elegant web solutions. Armed with a
                    Bachelors Degree in Electrical and Electronic Engineering,
                    I've honed my skills in JavaScript, React, and Next.js. My
                    passion lies in exploring the intersection of technology and
                    creativity, and I recently completed a DAO platform as my
                    final year project. Join me on this digital journey as we
                    build innovative experiences together!"
                />
            </section>

            <section id="introduction">
                <AnimatedTitle text="Introduction" />
                <AnimatedParagraph
                    text="It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like)."
                />
            </section>

            <section id="functions">
                <AnimatedTitle text="Functions" />
                <AnimatedParagraph
                    text="There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined chunks as necessary, making this the first true
                    generator on the Internet. It uses a dictionary of over 200
                    Latin words, combined with a handful of model sentence
                    structures, to generate Lorem Ipsum which looks reasonable.
                    The generated Lorem Ipsum is therefore always free from
                    repetition, injected humour, or non-characteristic words
                    etc."
                />
            </section>
        </main>
    );
}
