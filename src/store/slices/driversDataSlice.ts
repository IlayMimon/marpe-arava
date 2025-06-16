import { IDriverData } from "../../hooks/data/useGetDriversData";
import createArraySlice from "../createArraySlice";

const driversDataSlice = createArraySlice<IDriverData[]>("driversData");

export const { setDriversData } = driversDataSlice.actions;
export default driversDataSlice.reducer;