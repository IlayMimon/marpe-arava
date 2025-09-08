import { TableRow } from "../components/Table/TableTypes";

const filterDataBySearch = (
  searchFilter: string,
  data: TableRow[],
  tripDirection: "outbound" | "inbound"
): TableRow[] => {
  const normalizedFilter = searchFilter.toLowerCase().trim();

  const getKeys = (): (keyof TableRow)[] => {
    switch (tripDirection) {
      case "outbound":
        return [
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
        ];
      case "inbound":
        return [
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
        ];
      default:
        return [];
    }
  };

  const keys = getKeys();

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
          return value.toString().toLowerCase().includes(normalizedFilter);
        })
      )
    : data;

  return filteredRows;
};

export default filterDataBySearch;
