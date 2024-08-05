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
        </div>
    );
}

export default ProjectsPage;
