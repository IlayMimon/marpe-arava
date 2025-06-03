import dayjs from "dayjs";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type ShuttleDetailsPerRequest = {
    ID: number
    Title: string
    RequestId: number
    DriverId: number
    PickupTime: dayjs.Dayjs;
    ArrivalTime: dayjs.Dayjs;
    FinishTime: dayjs.Dayjs;
    InboundTime: dayjs.Dayjs;
};

const useGetShuttleDetailsPerRequest = () => {
    const { data } = useQueryFetchRequest<SharepointQueryResultArray<ShuttleDetailsPerRequest>>(
        "/_api/web/lists/getbytitle('ShuttleDetailsPerRequest')/items?$select=ID,Title,RequestId,PickupTime,DriverId,ArrivalTime,FinishTime,InboundTime",
    );

    const shuttleDetailsPerRequest = data?.d.results

    return shuttleDetailsPerRequest
}

export default useGetShuttleDetailsPerRequest;