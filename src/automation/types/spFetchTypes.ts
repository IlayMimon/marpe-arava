// this file exists to bridge the differences
// between how you receive the data from SharePoint
// and the types used in this code.
//// for example: ShuttleRequest.shuttleDateTime only exists when constructed in testFile.ts
//// the SharePoint list ShuttleRequests doesn't have a shuttleDateTime column

import { Dayjs } from 'dayjs';

export interface SPShuttleRequest {
  Id: number;
  Title?: string;
  Time: Dayjs; // remember to parse using dayjs(Time) - this is an ISO string, not a date object
  StationId: number; // reference to station using ID
  Phone: string; // stored in SharePoint as '050-0000000'
  IsReturnShuttleRequired?: boolean;
  RequestedServicesId: { results: number[] };
  ReturnStationId?: number;
  FullName: string;
  notes?: string; 
}

export interface SPService {
    Id: number;
    Title: string;
    Time: number;
    IsLatenessForbidden: boolean;
}

export interface SPStation {
    Id: number;
    Title: string;
    // Area: 'א' | 'ב' | 'ג' | '*'; // might be messy to implement
    Area: string;
    StationOrder: number;
}

export interface SPRoute {
    Id: number;
    Title?: string;
    SourceId?: number;
    DestinationId?: number;
    TravelTime: number;
    Distance: number;
}


// types imported from NYP 2.0
export type SharepointQueryResult<T = unknown> = {
  d: T;
};

export type SharepointQueryResultArray<T> = SharepointQueryResult<{ results: T[] }>;
