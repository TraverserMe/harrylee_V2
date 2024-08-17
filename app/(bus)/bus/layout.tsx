import BusBottomBar from "@/components/bus/bottom-bar";

async function BusLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="max-w-[400px] h-[600px] relative">
            {children}
            <BusBottomBar />
        </main>
    );
}

export default BusLayout;
