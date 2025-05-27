import { SharePointResponse } from "../components/types/SharePointResponse";
import { useQueryFetchRequest } from "../hooks/useQueryFetch";
import { Shuttle } from "../types/assignDriversTypes";

export const getShuttles = () => {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

  const isoTomorrow = tomorrow.toISOString(); // YYYY-MM-DDT00:00:00.000Z
  const isoDayAfter = dayAfterTomorrow.toISOString();

    const { refetch } = useQueryFetchRequest<SharePointResponse<Shuttle>>(
      `/_api/web/lists/getbytitle('Shuttles')/items?$filter=StartTime ge datetime'${isoTomorrow}' and StartTime lt datetime'${isoDayAfter}'`, true, "GET"
    );

    return { refetch };
  }