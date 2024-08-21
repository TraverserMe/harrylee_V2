"use client";
import TitleBar from "@/components/design/titleBar";
import Link from "next/link";
import Image from "next/image";

function ProjectsPage() {
    return (
        <>
            <TitleBar title="Projects Page" />
            <section id="#project_1" className="mt-4 p-2 ">
                <div className="flex flex-1 font-bold flex-col md:flex-row">
                    <div className="w-full text-wrap ">
                        <h1 className="text-lg md:text-xl underline">
                            Galaxy of Movies
                        </h1>
                        <h2 className="text-sm md:text-lg">My first project</h2>
                        <p className="mt-2 px-4">
                            <strong>Technologies:</strong> HTML, CSS,
                            JavaScript, Node.js, Express, MongoDB, Firebase
                            storage
                        </p>
                        <br />
                        <p className="px-4">
                            <strong>About:</strong> This is the first project I
                            did with my friend in university. We built a movie
                            website that allows users to search for movies and
                            buy tickets. We even did not know how to use Github
                            for file management.
                        </p>
                    </div>
                    <div>
                        <Image
                            src={"/image/galaxy-of-moive-thumbnail.png"}
                            alt={"Galaxy of Movies"}
                            width={500}
                            height={300}
                            className="rounded-xl"
                        />
                    </div>
                </div>
                <div>
                    <Link
                        href="https://galaxyofmovies.onrender.com/index.html"
                        className="text-base break-all"
                        target="_blank"
                    >
                        Link:{" "}
                        <span className="hover:underline text-blue-500 ">
                            https://galaxyofmovies.onrender.com/index.html
                        </span>
                    </Link>
                    <br />
                    <Link
                        href={"https://github.com/TraverserMe/Galaxy-of-movies"}
                        className="text-base break-all"
                        target="_blank"
                    >
                        Github:{" "}
                        <span className="hover:underline text-blue-500 ">
                            https://github.com/TraverserMe/Galaxy-of-movies
                        </span>
                    </Link>
                </div>
            </section>

            <hr />
            <section id="#project_2" className="mt-4 p-2 ">
                <div className="flex flex-1 font-bold flex-col md:flex-row">
                    <div className="w-full text-wrap ">
                        <h1 className="text-lg md:text-xl underline">
                            DAO platform
                        </h1>
                        <h2 className="text-sm md:text-lg">My FYP project</h2>
                        <p className="mt-2 px-4">
                            <strong>Technologies:</strong> HTML, CSS,
                            JavaScript, Solidity, IPFS, NextJs, MetaMask
                        </p>
                        <br />
                        <p className="px-4">
                            <strong>About:</strong> This is my final year
                            project, titled DAO platform. The project is a web
                            app that like carousell but for DAO. It allows users
                            to be a seller or buyer of a DAO. The project is
                            built on top of the Ethereum blockchain and IPFS.
                            The project is built with NextJs and Solidity. The
                            need to use MetaMask to interact with the smart
                            contract.
                        </p>
                        <br />
                        <h2 className="text-sm md:text-lg">
                            Introduction Video:
                        </h2>
                        <video width="400" height="300" controls preload="none">
                            <source
                                src="/fyp-demo-video.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                    <div className="mt-2">
                        <Image
                            src={"/image/fyp-poster.png"}
                            alt={"DAO platform"}
                            width={500}
                            height={300}
                            className="rounded-xl"
                        />
                    </div>
                </div>
                <div>
                    <Link
                        href="https://fyp-ochre.vercel.app/"
                        className="text-base break-all"
                        target="_blank"
                    >
                        Link:{" "}
                        <span className="hover:underline text-blue-500 ">
                            https://fyp-ochre.vercel.app/
                        </span>
                        <br />
                    </Link>
                    (It needs MetaMask to be viewed)
                    <br />
                    <Link
                        href={"https://github.com/TraverserMe/FYP"}
                        className="text-base break-all"
                        target="_blank"
                    >
                        Github:{" "}
                        <span className="hover:underline text-blue-500 ">
                            https://github.com/TraverserMe/FYP
                        </span>
                    </Link>
                </div>
            </section>
            <hr />
            <section id="#project_3" className="mt-4 p-2 ">
                <div className="flex flex-1 font-bold flex-col md:flex-row">
                    <div className="w-full text-wrap ">
                        <h1 className="text-lg md:text-xl underline">
                            harrylee.com
                        </h1>
                        <h2 className="text-sm md:text-lg">
                            First version of this website
                        </h2>
                        <p className="mt-2 px-4">
                            <strong>Technologies:</strong> HTML, CSS,
                            JavaScript, NextJs, Tailwindcss, NextAuth, Prisma,
                            Firebase realtime database
                        </p>
                        <br />
                        <p className="px-4">
                            <strong>About:</strong> This is my first version of
                            my personal website. The website is built with
                            NextJs and Tailwindcss. The website is like my
                            playground. The website is built with NextAuth for
                            authentication and Prisma for database management.
                            It has bus stop information.
                        </p>
                    </div>
                    <div className="mt-2">
                        <Image
                            src={"/image/version-one-thumbnail.png"}
                            alt={"DAO platform"}
                            width={500}
                            height={300}
                            className="rounded-xl"
                        />
                    </div>
                </div>
                <div>
                    <Link
                        href="https://harrylee-com.vercel.app/"
                        className="text-base break-all"
                        target="_blank"
                    >
                        Link:{" "}
                        <span className="hover:underline text-blue-500 ">
                            https://harrylee-com.vercel.app/
                        </span>
                    </Link>
                </div>
            </section>

            <hr />
            <section id="#project_3" className="mt-4 p-2 ">
                <div className="flex flex-1 font-bold ">
                    <div className="w-full text-wrap ">
                        <h1 className="text-lg md:text-xl underline">
                            harryleeV2.com
                        </h1>
                        <h2 className="text-sm md:text-lg">
                            This website you are viewing
                        </h2>
                        <p className="mt-2 px-4">
                            <strong>Technologies:</strong> HTML, CSS,
                            JavaScript, NextJs, Tailwindcss, Firebase Auth,
                            Firebase Storage, Firebase realtime database
                        </p>
                        <br />
                        <p className="px-4">
                            <strong>About:</strong> This is my second version of
                            my personal website. The website is built with
                            NextJs and Tailwindcss. The website is like my
                            playground. The website is built with Firebase for
                            authentication and storage. It has bus stop
                            information(work in progress).
                        </p>
                    </div>
                </div>
                <div>
                    <Link
                        href={"https://github.com/TraverserMe/harrylee_V2"}
                        className="text-base break-all"
                        target="_blank"
                    >
                        Github:{" "}
                        <span className="hover:underline text-blue-500 ">
                            https://github.com/TraverserMe/harrylee_V2
                        </span>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default ProjectsPage;
