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

const useGetShuttleDetailsPerRequest = () => {
    const { data } = useQueryFetchRequest<SharepointQueryResultArray<ShuttleDetailsPerRequest>>(
        "/_api/web/lists/getbytitle('ShuttleDetailsPerRequest')/items"
    );

    const shuttleDetailsPerRequest = data?.d.results

    return shuttleDetailsPerRequest
}

export default useGetShuttleDetailsPerRequest;