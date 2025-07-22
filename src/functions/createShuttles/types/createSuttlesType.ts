
export interface ShuttleRequest {
    shuttelsRequestId: number;
    requestedService: number[];
    isReturnShuttleRequired: boolean;
    shuttleDateTime: Date;
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
    Id: number;
    Title: string;
    Area?: string;
    StationOrder?: number; // order of the station in the route
    Distance?: number; // distance from the previous station in km
    TravelTime?: number; // travel time to the next station in minutes
}

export interface Route {
    id: number;
    SourceId: number;
    DestinationId: number;
    TravelTime: number; // in minutes
    Distance: number; // in km
}

export interface CreateShuttlesParams {
    shuttleRequests: ShuttleRequest[];
    services: Service[];
    stations: Station[];
    routes: Route[];
}