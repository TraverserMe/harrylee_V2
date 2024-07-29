import { motion } from "framer-motion";

function TitleBar({ title }: { title: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl md:text-2xl font-extrabold uppercase pl-6 text-white bg-neutral-900 dark:bg-slate-50 dark:text-neutral-900 p-2"
        >
            {title}
        </motion.div>
    );
}

export default TitleBar;
