import { LoaderCircle } from "lucide-react";
import React from "react";

interface LoadingWithTextProps {
    text: string;
}

export default function LoadingWithText(props: LoadingWithTextProps) {
    return (
        <div className="flex items-center ml-2 ">
            <p>{props.text} </p>
            <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
        </div>
    );
}
