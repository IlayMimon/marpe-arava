import dayjs from "dayjs";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type ShuttleRequests = {
    ID: number
    Title: string
    FullName: string | null
    Phone: string
    RequestedServicesId: { results: number[] }
    IsReturnShuttleRequired: boolean
    ReturnStationId: number | null
    StationId: number
    Time: dayjs.Dayjs;
};

const useGetShuttleRequests = () => {
    const { data } = useQueryFetchRequest<SharepointQueryResultArray<ShuttleRequests>>(
        "/_api/web/lists/getbytitle('ShuttleRequests')/items?$select=ID,Title,FullName,Phone,RequestedServicesId,IsReturnShuttleRequired,ReturnStationId,StationId,Time"
    );

    const shuttleRequests = data?.d.results

    return shuttleRequests
}

export default useGetShuttleRequests;