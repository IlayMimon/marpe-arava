import dayjs from "dayjs";
import { useHomePageContext } from "../../contexts/HomePage";
import filterByToday from "../../functions/filterByToday";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

export type Shuttle = {
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
  const date = useHomePageContext().selectedDate;
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<Shuttle>>(
    `/_api/web/lists/getbytitle('shuttles')/items?$select=ID,Title,StartTime,ArrivalTime,Details,RequestsId,DriverId,totalDistance&${filterByToday(date, 'StartTime')}`
  );

  const shuttles = data?.d.results

  return shuttles
}

export default useGetShuttles;