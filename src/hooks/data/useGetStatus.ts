import { Status } from "../../components/types/Status";
import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";



const useGetStatus = () => {
  const { refetch } = useQueryFetchRequest<SharepointQueryResultArray<Status>>(
    "/_api/web/lists/getbytitle('Status')/items?$select=isOver,status,step,isAssigned",
  );

  return { refetch };
}

export default useGetStatus;