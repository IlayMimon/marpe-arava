import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type Shuttle = {
  ID: number
  Title: string
  StartTime: Date
  ArrivalTime: Date
  Details: string
  RequestsId: number[]
  AuthorId: number
  DriverId: number | null
  EditorId: number
  totalDistance: number
};

const useGetShuttles = () => {
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<Shuttle>>(
    "/_api/web/lists/getbytitle('shuttles')/items"
  );

  const shuttles = data?.d.results

  return shuttles
}

export default useGetShuttles;