import { useQueryFetchRequest } from "../useQueryFetch";
import { SharePointResponse } from "./types";

type ShuttleRequests = {
    ID: number
    Title: string
    FullName: string | null
    Phone: string
    RequestedServicesId: number[]
    IsReturnShuttleRequired: boolean
    ReturnStationId: number | null
    StationId: number
    Time: Date
};

const useGetShuttleRequests = () => {
    const { data } = useQueryFetchRequest<SharePointResponse<ShuttleRequests>>(
        "/_api/web/lists/getbytitle('ShuttleRequests')/items"
    );

    const shuttleRequests = data?.d.results

    return shuttleRequests
}

export default useGetShuttleRequests;