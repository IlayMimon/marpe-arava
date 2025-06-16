import { Service } from "../../hooks/data/useGetServices";
import createArraySlice from "../createArraySlice";

const servicesSlice = createArraySlice<Service[]>('services')

export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer;
