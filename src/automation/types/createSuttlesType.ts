import { Dayjs } from "dayjs";

export interface ShuttleRequest {
    id: number;
    requestedService: { results: number[] };
    isReturnShuttleRequired: boolean;
    shuttleDateTime: Dayjs;
    stationId: number;
    returnStationId?: number;
}

export interface Service{
    id: number;
    name: string;
    isLatenessForbidden: boolean;
    duration: number; // in minutes
}
 
export interface Station {
    id: number;
    title: string;
    area: string;
    stationOrder: number; // order of the station in the route
    distance?: number; // distance from the previous station in km
}

export interface StationWithTravelTime extends Station {
    travelTime: number; // travel time to the next station in minutes
}

export interface SPShuttle{
  StartTime: Date;
  ArrivalTime: Date;
  Details: string;
  RequestsId: { results: number[] };
  driverData: number | null;
  totalDistance: number;
  Driver: {
    Title: string;
  };
};

export interface SPShuttleDetailsPerRequest {
  
}

export interface Route {
    id: number;
    sourceId?: number;
    destinationId?: number;
    travelTime: number; // in minutes
    distance: number; // in km
}

export interface CreateShuttlesParams {
    shuttleRequests: ShuttleRequest[];
    services: Service[];
    stations: Station[];
    routes: Route[];
}