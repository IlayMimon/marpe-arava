import { Shuttle } from '../../hooks/data/useGetShuttles';
import createArraySlice from '../createArraySlice';

const shuttlesSlice = createArraySlice<Shuttle[]>('shuttles');

export const { setShuttles } = shuttlesSlice.actions;
export default shuttlesSlice.reducer;
