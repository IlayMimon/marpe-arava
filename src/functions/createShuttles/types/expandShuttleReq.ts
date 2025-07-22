export interface ExpandedShuttleRequest {
  shuttelsRequestId: number;
  shuttleDateTime: Date;
  phone?: string;
  isReturnShuttleRequired: boolean;
  isLatenessForbidden: boolean;
  stationId: number;
  stationName: string;
  stationArea: string;
  stationOrder: number;
  minArrivalTime: Date;
  maxArrivalTime: Date;
}

