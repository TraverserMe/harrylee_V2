"use client";
import TitleBar from "@/components/design/titleBar";
import Image from "next/image";
import Link from "next/link";

function WorkExperiencePage() {
    return (
        <>
            <TitleBar title="Work Experience" />
            <section id="#work_1" className="mt-4 p-2 flex flex-1 font-bold">
                <div className="w-full">
                    <h1 className="text-sm md:text-xl">
                        <Link
                            href="https://shop.pegasus.hk/"
                            className="underline hover:no-underline"
                            target="_blank"
                        >
                            <Image
                                src={"pegasus.svg"}
                                alt={"pegasus logo"}
                                width={100}
                                height={30}
                            />
                            飛馬電腦 PEGASUS
                        </Link>
                    </h1>
                    <h2 className="text-sm md:text-lg">
                        Assemble Worker (Part-Time)
                    </h2>
                    <ul className="text-xs md:text-lg list-disc list-inside">
                        <li>Computer Assembly</li>
                        <li>Computer Repair</li>
                        <li>Computer Inspection</li>
                        <li>Troubleshooting</li>
                    </ul>
                </div>
                <div className="text-sm md:text-lg text-right">
                    <p className="min-w-[150px] md:min-w-[180px]">
                        Sept 2020 - Now
                    </p>
                </div>
            </section>
            <hr />
            <section id="#work_2" className="mt-4 p-2 flex flex-1 font-bold">
                <div className="w-full">
                    <h1 className="text-sm md:text-xl">
                        <Link
                            href="https://www.robocodeacademy.com/"
                            className="underline hover:no-underline"
                            target="_blank"
                        >
                            <Image
                                src={"/RoboCode.png"}
                                alt={"RoboCode logo"}
                                width={100}
                                height={30}
                            />
                            STEM Accelerator Limited
                        </Link>
                    </h1>
                    <h2 className="text-sm md:text-lg">
                        Instructor (Part-Time)
                    </h2>
                    <ul className="text-xs md:text-lg list-disc list-inside">
                        <li>Material Making</li>
                        <li>
                            Teaching STEM <br /> (including Python and HTML)
                        </li>
                        <li>Explore Coding</li>
                    </ul>
                </div>
                <div className="text-sm md:text-lg text-right">
                    <p className="min-w-[150px] md:min-w-[180px]">
                        Dec 2021 - Apr 2024
                    </p>
                </div>
            </section>
            <hr />
            <section id="#work_3" className="mt-4 p-2 flex flex-1 font-bold">
                <div className="w-full">
                    <h1 className="text-sm md:text-xl">
                        <Link
                            href="https://shop.pegasus.hk/"
                            className="underline hover:no-underline"
                            target="_blank"
                        >
                            <Image
                                src={"pegasus.svg"}
                                alt={"pegasus logo"}
                                width={100}
                                height={30}
                            />
                            飛馬電腦 PEGASUS
                        </Link>
                    </h1>
                    <h2 className="text-sm md:text-lg">
                        Junior Website Developer (Part-Time)
                    </h2>
                    <ul className="text-xs md:text-lg list-disc list-inside">
                        <li>Frontend Website Development</li>
                        <li>Website Maintenance</li>
                        <li>SEO Assist</li>
                    </ul>
                </div>
                <div className="text-sm md:text-lg text-right">
                    <p className="min-w-[150px] md:min-w-[180px]">
                        Jan 2024 - May 2024
                    </p>
                </div>
            </section>
        </>
    );
}

export default WorkExperiencePage;
