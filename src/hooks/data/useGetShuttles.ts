import dayjs from "dayjs";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type Shuttle = {
  ID: number
  Title: string
  StartTime: dayjs.Dayjs;
  ArrivalTime: dayjs.Dayjs;
  Details: string
  RequestsId: { results: number[] }
  DriverId: number | null
  totalDistance: number
};

const useGetShuttles = () => {
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<Shuttle>>(
    "/_api/web/lists/getbytitle('shuttles')/items?$select=ID,Title,StartTime,ArrivalTime,Details,RequestsId,DriverId,totalDistance"
  );

  const shuttles = data?.d.results

  return shuttles
}

export default useGetShuttles;