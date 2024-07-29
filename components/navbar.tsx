"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import * as React from "react";
import { CurrentUser } from "@/components/auth/user";
import { ActionTooltip } from "@/components/action-tooltip";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Background",
        href: "/",
        description:
            "It&apos;s a great place to start my introduction of myself.",
    },
    {
        title: "Projects",
        href: "/",
        description: "The place to find out about my projects and my skills.",
    },
    {
        title: "Work Experience",
        href: "/",
        description:
            "I&apos;m always happy to share my work experience with you.",
    },
];

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

export default function Navbar() {
    const isDesktop = useMediaQuery("(min-width: 768px)", true);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    if (isDesktop) {
        return (
            <NavigationMenu
                className="min-w-fit md:flex hidden md:min-w-full
            md:items-center px-2 sticky top-0 bg-slate-50 dark:bg-neutral-900"
            >
                <div className="flex flex-1 max-w-[1600px]">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <ActionTooltip
                                side="bottom"
                                align="center"
                                label="Home"
                            >
                                <Link href={"/"}>
                                    <Image
                                        src={"/logo.png"}
                                        alt="logo"
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            </ActionTooltip>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Getting started
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_.75fr] ">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <button
                                                className="flex h-full w-full select-none flex-col justify-end bg-slate-100 rounded-md bg-gradient-to-b 
                                        from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                onClick={() => {
                                                    router.push("/");
                                                }}
                                            >
                                                <Image
                                                    src={"/harry.svg"}
                                                    alt="logo"
                                                    width={200}
                                                    height={200}
                                                />
                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    My name is Harry
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    I&apos;m a software
                                                    engineer. I want to learn
                                                    more about web development.
                                                    I hope that I could be a
                                                    great developer in the
                                                    future.
                                                </p>
                                            </button>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem
                                        onClick={() => {
                                            router.push(
                                                "/?section=introduction"
                                            );
                                        }}
                                        title="Introduction"
                                    >
                                        How is this project created? What are
                                        the technologies used?
                                    </ListItem>
                                    <ListItem
                                        onClick={() => {
                                            router.push("/?section=functions");
                                        }}
                                        title="Functions"
                                    >
                                        What are the functions of this website?
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                About Me
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <ModeToggle />
                        <CurrentUser />
                    </div>
                </div>
            </NavigationMenu>
        );
    }

    return (
        <nav className="flex flex-1 items-center justify-between px-2 md:hidden z-50 sticky top-0 bg-slate-50 dark:bg-neutral-900">
            <Link href={"/"}>
                <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <AlignJustify />
                </SheetTrigger>
                <SheetContent className="w-[200px] bg-slate-50 dark:bg-neutral-900">
                    <SheetHeader>
                        <SheetTitle>Navigation</SheetTitle>
                        <SheetDescription>
                            <Link
                                href={"/"}
                                className="underline"
                                onClick={() => setOpen(false)}
                            >
                                Home
                            </Link>
                            <hr />
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        Getting started
                                    </AccordionTrigger>
                                    <AccordionContent className="w-full flex flex-1 flex-col">
                                        <Link
                                            href={"/?section=introduction"}
                                            className="underline"
                                            onClick={() => setOpen(false)}
                                        >
                                            Introduction
                                        </Link>
                                        <br />
                                        <Link
                                            href={"/?section=functions"}
                                            className="underline"
                                            onClick={() => setOpen(false)}
                                        >
                                            Functions
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                        Is it styled?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It comes with default styles that
                                        matches the other components&apos;
                                        aesthetic.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>
                                        Is it animated?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It&apos;s animated by default, but
                                        you can disable it if you prefer.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <div className="flex flex-1 items-center justify-center space-x-4 my-2">
                                <ModeToggle />
                                <CurrentUser />
                            </div>
                            <hr />
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
