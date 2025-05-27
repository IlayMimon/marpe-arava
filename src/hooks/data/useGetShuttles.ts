import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

export type Shuttle = {
  ID: number
  Title: string
  StartTime: Date
  ArrivalTime: Date
  Details: string
  RequestsId: number[]
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