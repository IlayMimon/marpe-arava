<<<<<<< HEAD:src/hooks/data/useGetShuttleDetailsPerRequest .ts
import { ShuttleDetailsPerRequest } from "../../types/shuttleDetailsPerRequst";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";


=======
import { useHomePageContext } from "../../contexts/HomePage";
import filterByToday from "../../functions/filterByToday";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

export type ShuttleDetailsPerRequest = {
    ID: number
    Title: string
    RequestId: number
    PickupTime: Date
    DriverId: number | null
    ArrivalTime: Date
};
>>>>>>> origin/NP:src/hooks/data/useGetShuttleDetailsPerRequest.ts

const useGetShuttleDetailsPerRequest = () => {
    const date = useHomePageContext().selectedDate;
    const { data } = useQueryFetchRequest<SharepointQueryResultArray<ShuttleDetailsPerRequest>>(
        `/_api/web/lists/getbytitle('ShuttleDetailsPerRequest')/items?$select=ID,Title,RequestId,PickupTime,DriverId,ArrivalTime&${filterByToday(date, 'PickupTime')}`
    );

    const shuttleDetailsPerRequest = data?.d.results

    return shuttleDetailsPerRequest
}

export default useGetShuttleDetailsPerRequest;