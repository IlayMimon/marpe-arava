import { SharepointQueryResultArray } from "../../types/spFetchTypes";
import { useQueryFetchRequest } from "../useQueryFetch";

type Medic = {
  ID: number
  Title: string
};

const useGetMedics = () => {
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<Medic>>(
    "/_api/web/lists/getbytitle('medics')/items?$select=ID,Title"
  );

  const medics = data?.d.results

  return medics
}

export default useGetMedics;