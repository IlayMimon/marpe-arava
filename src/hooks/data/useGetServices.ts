import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type Service = {
  ID: number;
  Title: string;
};

const useGetServices = () => {
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<Service>>(
    "/_api/web/lists/getbytitle('Services')/items?$select=ID,Title"
  );

  const Services = data?.d.results;

  return Services;
};

export default useGetServices;
