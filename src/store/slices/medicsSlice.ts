import { Medic } from "../../hooks/data/useGetMedics";
import createArraySlice from "../createArraySlice";

const medicsSlice = createArraySlice<Medic[]>("medics");

export const { setMedics } = medicsSlice.actions;
export default medicsSlice.reducer;
