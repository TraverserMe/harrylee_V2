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
            <div className="w-1/6 font-extrabold text-xl">{busRoute}</div>
            <div className="flex-1 flex flex-col h-12 text-start">
                <span>
                    往<span className="font-bold text-base">{dest}</span>
                </span>
                <span>{busStop}</span>
            </div>
            <div className="w-2/6 flex flex-col">
                {moment(eta, "YYYY-MM-DD HH:mm:ss").diff(moment(), "minutes") >
                0
                    ? moment(eta, "YYYY-MM-DD HH:mm:ss").diff(
                          moment(),
                          "minutes"
                      ) + " 分鐘"
                    : "即將到達"}{" "}
                <span className="text-red-500 text-sm">{rmk}</span>
            </div>
            {/* <>{moment(eta, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}</> */}
        </div>
    );
}

export default BusRow;
