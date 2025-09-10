import { Dayjs } from "dayjs";

export interface ExpandedShuttleRequest {
  shuttlesRequestId: number;
  shuttleDateTime: Dayjs;
  phone?: string;
  isReturnShuttleRequired: boolean;
  isLatenessForbidden: boolean;
  stationId: number;
  stationName: string;
  stationArea: string;
  stationOrder: number;
  minArrivalTime: Dayjs;
  maxArrivalTime: Dayjs;
}

