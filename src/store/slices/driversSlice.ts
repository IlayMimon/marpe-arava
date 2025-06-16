import { Driver } from "../../types/travelBar";
import createArraySlice from "../createArraySlice";

const driversSlice = createArraySlice<Driver[]>("drivers");

export const { setDrivers } = driversSlice.actions;
export default driversSlice.reducer;
