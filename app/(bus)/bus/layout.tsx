import BusBottomBar from "@/components/bus/bottom-bar";

async function BusLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="max-w-[400px] h-[calc(100vh-50px)] max-h-[800px] relative p-0 border-2 md:mt-40">
            {children}
            <BusBottomBar />
        </main>
    );
}

export default BusLayout;
