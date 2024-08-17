function BusBottomBar() {
    return (
        <div className="fixed bottom-0 h-24 w-full">
            <div className=" mx-2 bg-neutral-900 dark:bg-slate-50 text-white dark:text-neutral-900 transition-all">
                <ul className="flex justify-around items-center flex-row">
                    <li>Home</li>
                    <li>Search</li>
                </ul>
            </div>
        </div>
    );
}

export default BusBottomBar;
