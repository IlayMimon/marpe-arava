import { SharePointResponse } from "../components/types/SharePointResponse";
import { useQueryFetchRequest } from "../hooks/useQueryFetch";
import { Shuttle } from "../types/assignDriversTypes";

export const getShuttles = () => {
    const { data } = useQueryFetchRequest<SharePointResponse<Shuttle>>(
      "/_api/web/lists/getbytitle('Shuttles')/items", true, "GET"
    );
    const shuttles = data?.d.results.map((shuttle) => {
      return {
        Id: shuttle.Id,
        StartTime: shuttle.StartTime,
        ArrivalTime: shuttle.ArrivalTime,
        totalDistance: shuttle.totalDistance,
      };
    });
    
    console.log("shuttles fetched", shuttles);
    return shuttles;
  }