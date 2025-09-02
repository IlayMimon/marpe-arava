import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { postToSharepoint } from "../../functions/postToSharepoint";
import { assignShuttlesToDrivers } from "../driversAssign/assignDrivers";
import { initDrivers } from "../driversAssign/initDrivers";
import { SPShuttle, SPShuttleDetailsPerRequest } from "../types/createSuttlesType";
import enrichShuttleGroup from "../types/enrichShuttleGroup";
import { SharepointQueryResult } from "../types/spFetchTypes";

// משתני עזר
let ShuttleDetailsPerRequestIds: { Id: number }[] = [];
let TotalDistance = 0;
dayjs.extend(utc);
dayjs.extend(timezone);

// הגדרת timezone ברירת מחדל
dayjs.tz.setDefault("Asia/Jerusalem");

const getPossibleTravelTimeAddition = (firstArrival: string | undefined, endTime: dayjs.Dayjs | undefined): number => {
  // לוגיקה לחישוב תוספת זמן הנסיעה האפשרית
  const startTime = dayjs.tz(firstArrival, "HH:mm", "Asia/Jerusalem");
  const sixThirty = dayjs("06:30", "HH:mm");
  const lunchStart = dayjs("11:30", "HH:mm");
  const lunchEnd = dayjs("12:30", "HH:mm");
  console.log('hourMinute', startTime.format("HH:mm"), endTime?.format("HH:mm"));


  if(startTime.isAfter(sixThirty) || endTime?.isBefore(lunchStart) || startTime.isAfter(lunchEnd)) {
    return 0
  }else if (startTime.isBefore(sixThirty)) {
    return sixThirty.diff(startTime, "minute");     // כמה דקות נשארו
  } else {
    // הפרש דקות עד סיום ב-11:30
    const shiftToBeforeLunch = lunchStart.diff(endTime, "minute"); // שלילי או 0
    // הפרש דקות עד התחלה ב-12:30
    const shiftToAfterLunch = lunchEnd.diff(startTime, "minute");  // חיובי או 0

    if (Math.abs(shiftToBeforeLunch) <= Math.abs(shiftToAfterLunch)) {
    return shiftToBeforeLunch; // להזיז אחורה
  } else {
    return shiftToAfterLunch; // להזיז קדימה
  }

  }
};

// פונקציה ראשית
export async function creatSPItems(shuttleGroups: enrichShuttleGroup[]) {
    const SPSuttles: SPShuttle[] = [];
  for (const group of shuttleGroups) {
    ShuttleDetailsPerRequestIds = []; // איפוס

    // יצירת ShuttleDetailsPerRequest לפי הבקשות בקבוצה
    // for (const request of group.value) {
    //   // מציאת התחנה המתאימה לבקשה הנוכחית
    //   const stationMatch = group.stations?.find(
    //     (s) => s.station.id === request.stationId
    //   );

    //   if (!stationMatch) continue;

    //   // יצירת ShuttleDetailsPerRequest
    //   const pickupTime = stationMatch.arrivalTime;
    //   const arrivalTime = group.arrivalTime.toISOString();
    //   const res = await postToSharepoint<SharepointQueryResult<SPShuttleDetailsPerRequest>>(`_api/web/lists/getbytitle('ShuttleDetailsPerRequest')/items`, {
    //       PickupTime: pickupTime,
    //       ArrivalTime: arrivalTime,
    //       RequestId: request.shuttlesRequestId,
    //     },)
      

    
    //   const createdItemId = res.data.d.Id;
    //   ShuttleDetailsPerRequestIds.push({ Id: createdItemId });
    // }

    // חישוב סך המרחקים
    const stationsToSum = group.stations ?? [];
    TotalDistance = stationsToSum.reduce(
      (sum, s) => sum + (s.station.distance || 0),
      0
    );
    const firstArrival = group.stations?.[0]?.arrivalTime;
    console.log(firstArrival)
    const possibleTravelTimeAddition = getPossibleTravelTimeAddition(firstArrival, group.arrivalTime);
    console.log(possibleTravelTimeAddition)
    // פורמט טקסט של התחנות
    const stationsText = stationsToSum
      .map((s) =>
        `${s.station.title}: ${dayjs(s.arrivalTime).add(possibleTravelTimeAddition, "minute")
          .tz("Asia/Jerusalem")
          .format("HH:mm")}`
      )
      .join("\n");

      const SPSuttle: SPShuttle = {
        StartTime: firstArrival ? dayjs(firstArrival).add(possibleTravelTimeAddition, "minute") : dayjs(),
        ArrivalTime: group.arrivalTime.add(possibleTravelTimeAddition, "minute"),
        Details: stationsText,
        // RequestsId: ShuttleDetailsPerRequestIds.map((item) => item.Id),
        driverDataId: null,
        totalDistance: TotalDistance,
      }
      SPSuttles.push(SPSuttle);
      
    }
    const shuttlesWithDrivers = assignShuttlesToDrivers(SPSuttles, initDrivers(3))
    for (const shuttle of shuttlesWithDrivers) {
      await postToSharepoint<SharepointQueryResult<SPShuttle>>(`_api/web/lists/getbytitle('Shuttles')/items`, shuttle);
    }
}




