import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function TitleBar({ title, className }: { title: string; className?: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={cn(
                "text-xl md:text-2xl font-extrabold uppercase p-2 pl-4 text-white bg-neutral-900 dark:bg-slate-50 dark:text-neutral-900",
                className
            )}
        >
            {title}
        </motion.div>
    );
}

export default TitleBar;
