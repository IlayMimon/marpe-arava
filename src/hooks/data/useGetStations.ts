import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type Station = {
  ID: number;
  Title: string;
};

const useGetStations = () => {
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<Station>>(
    "/_api/web/lists/getbytitle('Stations')/items?$select=ID,Title"
  );

  const Stations = data?.d.results;

  return Stations;
};

export default useGetStations;
