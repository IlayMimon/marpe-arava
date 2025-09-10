import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { postToSharepoint } from "../../functions/postToSharepoint";
import { assignShuttlesToDrivers } from "../driversAssign/assignDrivers";
import { initDrivers } from "../driversAssign/initDrivers";
import { SPShuttle } from "../types/createSuttlesType";
import enrichShuttleGroup from "../types/enrichShuttleGroup";
import { SharepointQueryResult } from "../types/spFetchTypes";

// משתני עזר
let TotalDistance = 0;


dayjs.extend(utc);
dayjs.extend(timezone);

// הגדרת timezone ברירת מחדל
dayjs.tz.setDefault("Asia/Jerusalem");

const combineDateAndTime = (datePart: Dayjs | undefined, timePart: Dayjs): Dayjs => {
  if (!datePart) return timePart;
  return datePart
    .set("hour", timePart.hour())
    .set("minute", timePart.minute())
    .set("second", timePart.second())
    .set("millisecond", timePart.millisecond());
};

const getPossibleTravelTimeAddition = (startTime: Dayjs | undefined, endTime: Dayjs | undefined): number => {
  // לוגיקה לחישוב תוספת זמן הנסיעה האפשרית
  const sixThirty = combineDateAndTime(startTime, dayjs("06:30", "HH:mm"));
  const lunchStart = combineDateAndTime(startTime, dayjs("11:30", "HH:mm"));
  const lunchEnd = combineDateAndTime(startTime, dayjs("12:30", "HH:mm"));
  
  if(startTime?.isAfter(sixThirty) && endTime?.isBefore(lunchStart) && startTime?.isAfter(lunchEnd)) {
    return 0
  }else if (startTime?.isBefore(sixThirty)) {
    return sixThirty.diff(startTime, "minute");     // כמה דקות נשארו
  } else {
    // הפרש דקות עד סיום ב-11:30
    const shiftToBeforeLunch = lunchStart.diff(endTime, "minute"); 
    // הפרש דקות עד התחלה ב-12:30
    const shiftToAfterLunch = lunchEnd.diff(startTime, "minute"); 

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
    
    // חישוב סך המרחקים
    const stationsToSum = group.stations ?? [];
    TotalDistance = stationsToSum.reduce(
      (sum, s) => sum + (s.station.distance || 0),
      0
    );


    const firstArrival = group.stations?.[0]?.arrivalTime;
    const possibleTravelTimeAddition = getPossibleTravelTimeAddition(firstArrival, group.arrivalTime);

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
        RequestsId: group.value.map((req) => req.shuttlesRequestId),
        driverDataId: null,
        totalDistance: TotalDistance,
      }
      SPSuttles.push(SPSuttle);
      
  }
    const shuttlesWithDrivers = assignShuttlesToDrivers(SPSuttles, initDrivers(3))
    for (const shuttle of shuttlesWithDrivers) {
      console.log("Creating SharePoint item for shuttle:", shuttle);
      await postToSharepoint<SharepointQueryResult<SPShuttle>>(`_api/web/lists/getbytitle('Shuttles')/items`, shuttle);
    }
}




