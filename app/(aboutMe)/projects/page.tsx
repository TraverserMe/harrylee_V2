"use client";
import TitleBar from "@/components/design/titleBar";
import Link from "next/link";
import Image from "next/image";

function ProjectsPage() {
    return (
        <div>
            <TitleBar title="Projects Page" />
            <section id="#project_1" className="mt-4 p-2 ">
                <div className="flex flex-1 font-bold flex-col md:flex-row">
                    <div className="w-full text-wrap ">
                        <h1 className="text-lg md:text-xl">Galaxy of Movies</h1>
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
                            src={"/galaxy-of-moive-thumbnail.png"}
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

            <section id="#project_2" className="mt-4 p-2 ">
                <div className="flex flex-1 font-bold flex-col md:flex-row">
                    <div className="w-full text-wrap ">
                        <h1 className="text-lg md:text-xl">DAO platform</h1>
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
                    </div>
                    <div>
                        <Image
                            src={"/fyp-poster.png"}
                            alt={"DAO platform"}
                            width={500}
                            height={300}
                            className="rounded-xl"
                        />
                    </div>
                </div>
                <div>
                    <video width="320" height="240" controls preload="none">
                        <source src="/fyp-demo-video.mp4" type="video/mp4" />
                        {/* Your browser does not support the video tag. */}
                    </video>
                    <br />
                    <Link
                        href="https://fyp-ochre.vercel.app/"
                        className="text-base break-all"
                        target="_blank"
                    >
                        Link:{" "}
                        <span className="hover:underline text-blue-500 ">
                            https://fyp-ochre.vercel.app/
                        </span>
                    </Link>
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
        </div>
    );
}

export default ProjectsPage;
