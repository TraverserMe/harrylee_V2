"use client";
import TitleBar from "@/components/design/titleBar";
import { retrieveUser, firstTimeClaim } from "@/firebase/admin/admin";
import queryString from "query-string";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

function BackgroundPage() {
    // const test = async () => {
    //     const user = await retrieveUser("nouJSYa4k8PpmlBLG263pJaCsrD3");
    //     if (!user) return console.log("user not found");
    //     console.log(JSON.parse(user));
    // };

    // const test3 = async () => {
    //     try {
    //         const url = queryString.stringifyUrl({
    //             url: "/api/firebase/admin/setCustomUserClaims",
    //         });
    //         console.log(url);

    //         const res = await axios.patch(url, {
    //             uid: "nouJSYa4k8PpmlBLG263pJaCsrD3",
    //             claims: {
    //                 isOwner: true,
    //                 isAdmin: true,
    //                 isUser: true,
    //             },
    //         });
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     // const user = await retrieveUser("nouJSYa4k8PpmlBLG263pJaCsrD3");
    //     // console.log(user);
    // };

    // const test2 = async () => {
    //     const user = await getSession();
    //     console.log(user);
    // };

    return (
        <>
            <section id="aboutMe">
                <TitleBar title="About Me" />
                <p className="text-bold mt-2 p-2 text-sm md:text-xl">
                    <span className="md:text-3xl text-lg font-extrabold">
                        A
                    </span>
                    spiring Full Stack Developer with a passion for creating
                    seamless web experiences. I thrive on learning new skills
                    and embracing challenges.
                </p>
                <p className="text-bold mt-2 p-2 text-sm md:text-xl">
                    <span className="md:text-3xl text-lg font-extrabold">
                        M
                    </span>
                    y approach is both quick and meticulous, ensuring
                    high-quality results. Whether front-end or back-end
                    development, I am ready to contribute my expertise to
                    innovative projects.
                </p>
            </section>

            <section id="education" className="mt-4">
                <TitleBar title="Education" />
                <div className="flex flex-col sm:flex-row">
                    <p className="text-bold mt-2 p-2 text-sm md:text-xl w-full md:w-full">
                        <span className="md:text-3xl text-lg font-extrabold">
                            B
                        </span>
                        achelor of Engineering (Honours) in <br />
                        <span className="font-bold">
                            Electronic and Information Engineering{" "}
                        </span>
                        <br />
                        <span className="text-[#7ab4c1] font-bold">
                            Hong Kong Polytechnic University
                        </span>
                    </p>
                    <p className="mt-2 p-2 md:min-w-fit md:font-bold">
                        Sept 2020 - Aug 2024 (Finished)
                    </p>
                </div>
                <ol className="list-disc list-inside px-2">
                    <li>
                        Gaining a solid foundation in electrical engineering
                        principles, software development, and cutting-edge
                        technologies.
                    </li>
                    <li>
                        Participating in web3 projects, honing my
                        problem-solving skills and passion for innovation.
                    </li>
                </ol>
            </section>

            <section id="skillsAndLanguages" className="mt-4">
                <div className="flex flex-col md:flex-row flex-1 md:space-x-10">
                    <div className="w-full">
                        <TitleBar title="Technical Skills" />
                        <div className="flex flex-1">
                            <ol className="list-disc list-inside p-2 w-full space-y-2 font-semibold">
                                <li>Next Js</li>
                                <li>React</li>
                                <li>Tailwind</li>
                                <li>Typescript</li>
                                <li>Java</li>
                                <li>C++</li>
                            </ol>
                            <ol className="list-disc list-inside p-2 w-full space-y-2 font-semibold">
                                <li>Node</li>
                                <li>Svelte Kit</li>
                                <li>SQL</li>
                                <li>Solidity</li>
                                <li>Javascript</li>
                                <li>React Native</li>
                            </ol>
                        </div>
                    </div>
                    <div className="w-full">
                        <TitleBar title="Languages" />
                        <ol className="list-disc list-inside p-2 w-full space-y-2 font-semibold">
                            <li>Fluent in English</li>
                            <li>Fluent in Cantonese</li>
                            <li>Fluent in Mandarin</li>
                        </ol>
                    </div>
                </div>
            </section>

            <section id="contact" className="mt-4">
                <div className="flex flex-col md:flex-row flex-1 md:space-x-10">
                    <div className="w-full">
                        <TitleBar title="Contact" />
                        <ol className="list-inside p-2 w-full space-y-4 font-semibold">
                            <li>
                                <Link
                                    href={"tel:+852 55472822"}
                                    className="flex items-center hover:underline"
                                >
                                    <Phone className="mr-2" />
                                    +852 55472822
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="mailto:leekinnangharry@gmail.com"
                                    className="flex items-center hover:underline break-all"
                                >
                                    <Mail className="mr-3" />
                                    leekinnangharry@gmail.com
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"https://github.com/TraverserMe"}
                                    className="flex items-center hover:underline"
                                    target="_blank"
                                >
                                    <Image
                                        src={"/github-mark.png"}
                                        width={30}
                                        height={30}
                                        alt="github logo"
                                        className="mr-2"
                                    />
                                    TraverserMe
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.linkedin.com/in/kin-nang-lee-1826a8250/"
                                    target="_blank"
                                    className="flex items-center hover:underline"
                                >
                                    <Image
                                        src={"/linkedin.svg"}
                                        width={30}
                                        height={30}
                                        alt="github logo"
                                        className="mr-2"
                                    />
                                    Kin Nang (Harry) Lee
                                </Link>
                            </li>
                        </ol>
                    </div>
                    <div className="w-full"></div>
                </div>
            </section>

            <div className="w-full mt-4">
                <TitleBar
                    title="Download Resume (CV)"
                    className="text-center w-fit mx-auto text-sm md:text-xl pl-0 p-2"
                />
                <p className="text-center text-sm p-2">
                    <a href="/resume.pdf" download className="w-fit mx-auto">
                        <Button variant={"outline"}>Click Here 👆</Button>
                    </a>
                    <br />
                    Click the button below to download my resume.
                </p>
            </div>

            <button onClick={() => signOut()}>Logout</button>
        </>
    );
}

export default BackgroundPage;
