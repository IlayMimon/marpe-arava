import dayjs from "dayjs";
import { useHomePageContext } from "../../contexts/HomePage";
import filterByToday from "../../functions/filterByToday";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

export type ShuttleRequest = {
  ID: number;
  Title: string;
  FullName: string | null;
  Phone: string;
  RequestedServicesId: { results: number[] };
  IsReturnShuttleRequired: boolean;
  ReturnStationId?: number;
  StationId: number;
  Time: dayjs.Dayjs;
  notes?: string;
  FinishTime?: dayjs.Dayjs;
  InboundTime?: dayjs.Dayjs;
  ReturnDriverId?: number;
  PickupTime?: dayjs.Dayjs;
};

const useGetShuttleRequests = () => {
  const date = useHomePageContext().selectedDate;
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<ShuttleRequest>>(
    `/_api/web/lists/getbytitle('ShuttleRequests')/items?$select=ID,Title,FullName,Phone,RequestedServicesId,IsReturnShuttleRequired,ReturnStationId,StationId,Time,notes,FinishTime,InboundTime,ReturnDriverId,PickupTime&${filterByToday(date, "Time")}`
  );

  const shuttleRequests = data?.d.results;

  return shuttleRequests;
};

export default useGetShuttleRequests;
