import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type ShuttleDetailsPerRequest = {
    ID: number
    Title: string
    RequestId: number
    PickupTime: Date
    DriverId: number | null
    ArrivalTime: Date
};

const useGetTomorrowShuttleDetailsPerRequest = () => {
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

    const isoTomorrow = tomorrow.toISOString();
    const isoDayAfter = dayAfterTomorrow.toISOString();

    const { data } = useQueryFetchRequest<SharepointQueryResultArray<ShuttleDetailsPerRequest>>(
        `/_api/web/lists/getbytitle('ShuttleDetailsPerRequest')/items?$select=ID,Title,RequestId,PickupTime,DriverId,ArrivalTime$filter=StartTime ge datetime'${isoTomorrow}' and StartTime lt datetime'${isoDayAfter}'`
    );

    const shuttleDetailsPerRequest = data?.d.results

    return shuttleDetailsPerRequest
}

export default useGetTomorrowShuttleDetailsPerRequest;