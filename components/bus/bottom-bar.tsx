"use client";
import { House, Search, Star } from "lucide-react";
import { useRouter } from "next/navigation";

function BusBottomBar() {
    const router = useRouter();
    return (
        <div className="absolute bottom-0 h-12 mx-auto w-full ">
            <ul className="flex justify-evenly items-center flex-row text-sm text-rose-600">
                <li
                    className="w-full text-center"
                    onClick={() => router.push("/bus")}
                >
                    <House className="mx-auto" />
                    主頁
                </li>
                <li
                    className="w-full text-center"
                    onClick={() => router.push("/bus/search")}
                >
                    <Search className="mx-auto" />
                    搜索
                </li>
                <li
                    className="w-full text-center"
                    onClick={() => router.push("/bus/favorite")}
                >
                    <Star className="mx-auto" />
                    收藏
                </li>
            </ul>
        </div>
    );
}

export default BusBottomBar;
