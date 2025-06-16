import { MedicPerDate } from "../../hooks/data/useGetMedicsPerDate";
import createArraySlice from "../createArraySlice";

const medicsPerDateSlice = createArraySlice<MedicPerDate[]>('medicsPerDate')

export const { setMedicsPerDate } = medicsPerDateSlice.actions;
export default medicsPerDateSlice.reducer;
