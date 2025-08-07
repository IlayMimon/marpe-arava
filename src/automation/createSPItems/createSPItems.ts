
import dayjs from "dayjs";
import { postToSharepoint } from "../../functions/postToSharepoint";
import { assignShuttlesToDrivers } from "../driversAssign/assignDrivers";
import { initDrivers } from "../driversAssign/initDrivers";
import { SPShuttle, SPShuttleDetailsPerRequest } from "../types/createSuttlesType";
import enrichShuttleGroup from "../types/enrichShuttleGroup";
import { SharepointQueryResult } from "../types/spFetchTypes";

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
      SPSuttles.push(SPSuttle);
      
    }
    const shuttlesWithDrivers = assignShuttlesToDrivers(SPSuttles, initDrivers(3))
    for (const shuttle of shuttlesWithDrivers) {
      const res = await postToSharepoint<SharepointQueryResult<SPShuttle>>(`_api/web/lists/getbytitle('Shuttles')/items`, shuttle);
    }
}




