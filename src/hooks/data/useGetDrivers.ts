import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type Driver = {
  ID: number
  Title: string
};

const useGetDrivers = () => {
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<Driver>>(
    "/_api/web/lists/getbytitle('Drivers')/items?$select=ID,Title"
  );

  const drivers = data?.d.results

  return drivers
}

export default useGetDrivers;