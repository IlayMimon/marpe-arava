import { TableRow } from "../components/Table/TableTypes";
import dayjs from "dayjs";

const SEARCHABLE_KEYS: Record<"outbound" | "inbound", (keyof TableRow)[]> = {
  outbound: [
    "fullName",
    "status",
    "phone",
    "appointmentType",
    "rideId",
    "station",
    "area",
    "pickupTime",
    "estimatedArrival",
    "desiredArrival",
    "outboundGap",
    "driver",
    "notes",
    "actions",
  ],
  inbound: [
    "fullName",
    "status",
    "phone",
    "returnStation",
    "returnArea",
    "estimatedFinish",
    "finishTime",
    "inboundTime",
    "inboundGap",
    "returnDriver",
    "notes",
    "actions",
  ],
};


const filterDataBySearch = (
    searchFilter: string,
    data: TableRow[],
    tripDirection: "outbound" | "inbound"
): TableRow[] => {
    const normalizedFilter = searchFilter.toLowerCase().trim();

    const keys = SEARCHABLE_KEYS[tripDirection];

    const filteredRows = normalizedFilter
        ? data.filter((row) =>
            keys.some((key) => {
                const value = row[key];
                if (value === null || value === undefined) return false;
                if (Array.isArray(value)) {
                    return value.some((item) =>
                        item?.toString().toLowerCase().includes(normalizedFilter)
                    );
                }
                if (dayjs.isDayjs(value)) {
                    return value.format("HH:mm").toLowerCase().includes(normalizedFilter);
                }
                return value.toString().toLowerCase().includes(normalizedFilter);
            })
        )
        : data;

    return filteredRows;
};

export default filterDataBySearch;
