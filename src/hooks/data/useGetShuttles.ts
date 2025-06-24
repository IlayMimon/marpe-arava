import { useHomePageContext } from "../../contexts/HomePage";
import filterByToday from "../../functions/filterByToday";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

export type Station = {
  Title: string;
  Area: string;
};

export type Shuttle = {
  ID: number;
  Title: string;
  StartTime: Date;
  ArrivalTime: Date;
  Details: string;
  stations: string[];
  area: string;
  RequestsId: { results: number[] };
  DriverId: number | null;
  totalDistance: number;
  driverData: {
    ID: number;
    Title: string;
  };
};

const useGetShuttles = () => {
  const date = useHomePageContext().selectedDate;

  const { data: shuttlesData, refetch: refetchShuttles } = useQueryFetchRequest<SharepointQueryResultArray<Shuttle>>(
    `/_api/web/lists/getbytitle('shuttles')/items?$select=ID,Title,StartTime,ArrivalTime,Details,RequestsId,DriverId,totalDistance,driverData/ID,driverData/Title&$expand=driverData&${filterByToday(date, "StartTime")}`
  );

  const { data: stationsData, refetch: refetchStations } = useQueryFetchRequest<SharepointQueryResultArray<Station>>(
    `/_api/web/lists/getbytitle('stations')/items?$select=Title,Area`
  );

  const shuttles = shuttlesData?.d.results;
  const stationsList = stationsData?.d.results;

  const stationMap: { [stationName: string]: string } = {};
  stationsList?.forEach((station) => {
    stationMap[station.Title.trim()] = station.Area.trim();
  });

  shuttles?.forEach((shuttle) => {
    const regex = /([^:]+): \d{2}:\d{2}/g;
    const matches = shuttle.Details.matchAll(regex);
    const stations: string[] = [];

    for (const match of matches) {
      stations.push(match[1].trim());
    }

    shuttle.stations = stations;

    const lastStation = stations[stations.length - 1] ;
    shuttle.area = stationMap[lastStation] || "";
  });

  return { shuttles, refetch: refetchShuttles };
};

export default useGetShuttles;
