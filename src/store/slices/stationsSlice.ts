import { Station } from "../../hooks/data/useGetStations";
import createArraySlice from "../createArraySlice";

const stationsSlice = createArraySlice<Station[]>("stations");

export const { setStation } = stationsSlice.actions;
export default stationsSlice.reducer;
