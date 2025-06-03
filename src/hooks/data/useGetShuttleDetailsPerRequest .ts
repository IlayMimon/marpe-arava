import { ShuttleDetailsPerRequest } from "../../types/shuttleDetailsPerRequst";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";



const useGetShuttleDetailsPerRequest = () => {
    const { data } = useQueryFetchRequest<SharepointQueryResultArray<ShuttleDetailsPerRequest>>(
        "/_api/web/lists/getbytitle('ShuttleDetailsPerRequest')/items?$select=ID,Title,RequestId,PickupTime,DriverId,ArrivalTime"
    );

    const shuttleDetailsPerRequest = data?.d.results

    return shuttleDetailsPerRequest
}

export default useGetShuttleDetailsPerRequest;