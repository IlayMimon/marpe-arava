import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type Status = {
  ID: number
  Title: string
  isOver: boolean
  status: string
  step: number
};

const useGetStatus = () => {
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<Status>>(
    "/_api/web/lists/getbytitle('Status')/items?$select=ID,Title,isOver,status,step"
  );

  const statuses = data?.d.results

  return statuses
}

export default useGetStatus;