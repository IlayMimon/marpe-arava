// import enrichShuttleGroup from '../types/enrichShuttleGroup';
// import  {ShuttleRequest, SPShuttle, SPShuttleDetailsPerRequest}  from '../types/createSuttlesType';
// import { ExpandedShuttleRequest } from '../types/expandShuttleReq';
// import { SharepointQueryResultArray, SPShuttleRequest } from '../types/spFetchTypes';
// import axios from 'axios';
// import {postToSharepoint} from '../../functions/postToSharepoint'

// type SPShuttleReq = {  
//     Time: string;
//     StationId: number;
//     Phone: string;
// }

// export async function getshuttlesRequest(itemID: Number): Promise<SPShuttleReq> {   
//   const res = await axios.get<SharepointQueryResultArray<SPShuttleRequest>>(
//     `/_api/web/lists/getbytitle('ShuttleRequests')/items(${itemID})`
//   );
//   const item = res.data.d.results[0]; 
//   return {
//     Time: item.Time,
//     StationId: item.StationId,
//     Phone: item.Phone,
//   };
// }


// const creatSPItems = async (shuttleGroupsWithTimes: enrichShuttleGroup[]) => {
//     for (const group of shuttleGroupsWithTimes) {
       
//         for (const request of group.value) {
//             const shuttleRequest = await getshuttlesRequest(request.shuttlesRequestId);
//             console.log('Creating SharePoint item for ShuttleRequest:');
//             const pickupStation = group.stations?.find(station =>
//             station.station.id === shuttleRequest.StationId
//         );
//             const SPShuttleDetailsPerRequest: SPShuttleDetailsPerRequest = {
//                 Request: {
//                     Id: request.shuttlesRequestId,
//                     Phone: shuttleRequest.Phone,
//                     Time: shuttleRequest.Time,
//                 },
//                 PickupTime: pickupStation?.arrivalTime ? new Date(pickupStation.arrivalTime) : new Date(0),
//                 ArrivalTime: group.arrivalTime.toDate(),
//             }
//             console.log('Creating SharePoint item for ShuttleDetailsPerRequest:', SPShuttleDetailsPerRequest);
//             // const response = await postToSharepoint(
//             //     'ShuttleDetailsPerRequest',
//             //     SPShuttleDetailsPerRequest
//             // );
//             // console.log('Created SharePoint item for ShuttleDetailsPerRequest:', response.data);
//         }

//         // Create SharePoint item for each shuttle group
//     //     const Shuttle: SPShuttle = {
//     //         StartTime: group.stations?.[0]?.arrivalTime ? new Date(group.stations[0].arrivalTime) : new Date(0), 
//     //         ArrivalTime: group.arrivalTime.toDate(), // V
//     //         Details: "",
//     //         RequestsId: { results: group.value.map(request => request.shuttlesRequestId) }, //V
//     //         driverData: null,
//     //         totalDistance: group.stations?.reduce((sum, s) => sum + (s.station.distance ?? 0), 0) ?? 0
//     //     };
//     //     console.log('Creating SharePoint item:', Shuttle);
//     }


//     }


// export default creatSPItems;

import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import enrichShuttleGroup from "../types/enrichShuttleGroup";
import { postToSharepoint } from "../../functions/postToSharepoint";
import { SharepointQueryResult } from "../types/spFetchTypes";
import { SPShuttle, SPShuttleDetailsPerRequest } from "../types/createSuttlesType";
import { initDrivers } from "../driversAssign/initDrivers";
import { assignShuttlesToDrivers } from "../driversAssign/assignDrivers";

// משתני עזר
let ShuttleDetailsPerRequestIds: { Id: number }[] = [];
let TotalDistance = 0;

// פונקציה ראשית
export async function creatSPItems(shuttleGroups: enrichShuttleGroup[]) {
    const SPSuttles: SPShuttle[] = [];
  for (const group of shuttleGroups) {
    ShuttleDetailsPerRequestIds = []; // איפוס

    // יצירת ShuttleDetailsPerRequest לפי הבקשות בקבוצה
    for (const request of group.value) {
      // מציאת התחנה המתאימה לבקשה הנוכחית
      const stationMatch = group.stations?.find(
        (s) => s.station.id === request.stationId
      );

      if (!stationMatch) continue;

      // יצירת ShuttleDetailsPerRequest
      const pickupTime = stationMatch.arrivalTime;
      const arrivalTime = group.arrivalTime.toISOString();
      const res = await postToSharepoint<SharepointQueryResult<SPShuttleDetailsPerRequest>>(`_api/web/lists/getbytitle('ShuttleDetailsPerRequest')/items`, {
          PickupTime: pickupTime,
          ArrivalTime: arrivalTime,
          RequestId: request.shuttlesRequestId,
        },)
        // console.log("Created ShuttleDetailsPerRequest:", res);

    
      const createdItemId = res.data.d.Id;
      ShuttleDetailsPerRequestIds.push({ Id: createdItemId });
    }

    // חישוב סך המרחקים
    const stationsToSum = group.stations ?? [];
    TotalDistance = stationsToSum.reduce(
      (sum, s) => sum + (s.station.distance || 0),
      0
    );

    // פורמט טקסט של התחנות
    const stationsText = stationsToSum
      .map((s) =>
        `${s.station.title}: ${dayjs(s.arrivalTime)
          .tz("Asia/Jerusalem")
          .format("HH:mm")}`
      )
      .join("\n");

    // // יצירת Shuttle סופי
    const firstArrival = group.stations?.[0]?.arrivalTime;
      

      const SPSuttle: SPShuttle = {
        StartTime: firstArrival ? dayjs(firstArrival) : dayjs(),
        ArrivalTime: group.arrivalTime,
        Details: stationsText,
        RequestsId: ShuttleDetailsPerRequestIds.map((item) => item.Id),
        driverDataId: null,
        totalDistance: TotalDistance,
      }
    //console.log("Creating SharePoint item for Shuttle:", SPSuttle);
      SPSuttles.push(SPSuttle);
      
    }
    const shuttlesWithDrivers = assignShuttlesToDrivers(SPSuttles, initDrivers(3))
    for (const shuttle of shuttlesWithDrivers) {
      const res = await postToSharepoint<SharepointQueryResult<SPShuttle>>(`_api/web/lists/getbytitle('Shuttles')/items`, shuttle);
      console.log("Created SharePoint item for Shuttle:", res);
    }
}




