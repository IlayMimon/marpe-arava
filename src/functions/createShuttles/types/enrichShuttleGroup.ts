import { ExpandedShuttleRequest } from "./expandShuttleReq";
import { Station } from "./createSuttlesType";
interface enrichShuttleGroup {
  Value: ExpandedShuttleRequest[];
  MinArrivalTime: Date;
  MaxArrivalTime: Date;
  Area: string;
  ArrivalTime: Date;
  Index: number;
  Stations?: { Station: Station; ArrivalTime: string }[];
}

export default enrichShuttleGroup