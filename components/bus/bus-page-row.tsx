import moment from "moment";

function BusRow({
    busRoute,
    dest,
    busStop,
    eta,
    rmk,
}: {
    busRoute: string;
    dest: string;
    busStop: string;
    eta: string;
    rmk: string;
}) {
    return (
        <div className="flex items-center flex-row text-center border-b-2">
            <div className="w-1/6 font-extrabold text-2xl">{busRoute}</div>
            <div className="flex-1 flex flex-col h-16 text-start justify-center">
                <span>
                    <span className="text-sm">往</span>
                    <span className="font-bold text-lg">{dest}</span>
                </span>
                <span className="text-sm">{busStop}</span>
            </div>
            <div className="flex flex-col mr-3">
                {moment(eta, "YYYY-MM-DD HH:mm:ss").diff(moment(), "minutes") >
                0 ? (
                    <span>
                        <span className="text-blue-600 text-xl font-extrabold">
                            {moment(eta, "YYYY-MM-DD HH:mm:ss").diff(
                                moment(),
                                "minutes"
                            )}
                        </span>{" "}
                        分鐘
                    </span>
                ) : (
                    "即將到達"
                )}{" "}
                <span className="text-red-500 text-sm">{rmk}</span>
            </div>
            {/* <>{moment(eta, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}</> */}
        </div>
    );
}

export default BusRow;
