import { ExpandedShuttleRequest } from "./expandShuttleReq";
import { StationWithTravelTime } from "./createSuttlesType";
import { Dayjs } from "dayjs";
interface enrichShuttleGroup {
  value: ExpandedShuttleRequest[];
  minArrivalTime: Dayjs;
  maxArrivalTime: Dayjs;
  area: string;
  arrivalTime: Dayjs;
  index: number;
  stations?: { station: StationWithTravelTime; arrivalTime: string }[];
}

export default enrichShuttleGroup