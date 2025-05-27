import { Status } from "../../components/types/Status";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";



const useGetStatus = () => {
  const { data, refetch } = useQueryFetchRequest<SharepointQueryResultArray<Status>>(
    "/_api/web/lists/getbytitle('Status')/items?$select=isOver,status,step,isAssigned",
  );

  const status = data?.d.results[0];

  return { status, refetch };
}

export default useGetStatus;