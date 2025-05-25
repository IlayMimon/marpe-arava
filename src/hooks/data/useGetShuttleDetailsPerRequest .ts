import { useQueryFetchRequest } from "../useQueryFetch";
import { SharePointResponse } from "./types";

type ShuttleDetailsPerRequest = {
    ID: number
    Title: string
    RequestId: number
    PickupTime: Date
    DriverId: number | null
    ArrivalTime: Date
};

const useGetShuttleDetailsPerRequest = () => {
    const { data } = useQueryFetchRequest<SharePointResponse<ShuttleDetailsPerRequest>>(
        "/_api/web/lists/getbytitle('ShuttleDetailsPerRequest')/items"
    );

    const shuttleDetailsPerRequest = data?.d.results

    return shuttleDetailsPerRequest
}

export default useGetShuttleDetailsPerRequest;