import enrichShuttleGroup from '../types/enrichShuttleGroup';
import  {ShuttleRequest, SPShuttle, SPShuttleDetailsPerRequest}  from '../types/createSuttlesType';
import { ExpandedShuttleRequest } from '../types/expandShuttleReq';
import { SharepointQueryResultArray, SPShuttleRequest } from '../types/spFetchTypes';
import axios from 'axios';
import {postToSharepoint} from '../../functions/postToSharepoint'

type SPShuttleReq = {  
    Time: string;
    StationId: number;
    Phone: string;
}

export async function getshuttlesRequest(itemID: Number): Promise<SPShuttleReq> {   
  const res = await axios.get<SharepointQueryResultArray<SPShuttleRequest>>(
    `/_api/web/lists/getbytitle('ShuttleRequests')/items(${itemID})`
  );
  const item = res.data.d.results[0]; 
  return {
    Time: item.Time,
    StationId: item.StationId,
    Phone: item.Phone,
  };
}


const creatSPItems = async (shuttleGroupsWithTimes: enrichShuttleGroup[]) => {
    for (const group of shuttleGroupsWithTimes) {
       
        for (const request of group.value) {
            const shuttleRequest = await getshuttlesRequest(request.shuttlesRequestId);
            console.log('Creating SharePoint item for ShuttleRequest:');
            const pickupStation = group.stations?.find(station =>
            station.station.id === shuttleRequest.StationId
        );
            const SPShuttleDetailsPerRequest: SPShuttleDetailsPerRequest = {
                Request: {
                    Id: request.shuttlesRequestId,
                    Phone: shuttleRequest.Phone,
                    Time: shuttleRequest.Time,
                },
                PickupTime: pickupStation?.arrivalTime ? new Date(pickupStation.arrivalTime) : new Date(0),
                ArrivalTime: group.arrivalTime.toDate(),
            }
            console.log('Creating SharePoint item for ShuttleDetailsPerRequest:', SPShuttleDetailsPerRequest);
            // const response = await postToSharepoint(
            //     'ShuttleDetailsPerRequest',
            //     SPShuttleDetailsPerRequest
            // );
            // console.log('Created SharePoint item for ShuttleDetailsPerRequest:', response.data);
        }

        // Create SharePoint item for each shuttle group
    //     const Shuttle: SPShuttle = {
    //         StartTime: group.stations?.[0]?.arrivalTime ? new Date(group.stations[0].arrivalTime) : new Date(0), 
    //         ArrivalTime: group.arrivalTime.toDate(), // V
    //         Details: "",
    //         RequestsId: { results: group.value.map(request => request.shuttlesRequestId) }, //V
    //         driverData: null,
    //         totalDistance: group.stations?.reduce((sum, s) => sum + (s.station.distance ?? 0), 0) ?? 0
    //     };
    //     console.log('Creating SharePoint item:', Shuttle);
    }


    }


export default creatSPItems;