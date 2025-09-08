import { canAssignShuttle } from "./canAssignDriver";
import { Driver } from "../types/driversAssignTypes";
import { SPShuttle } from "../types/createSuttlesType";


function getTotalKm(driver: Driver): number {
    return driver.schedule.reduce((sum, a) => sum + a.totalDistance, 0);
  }
  
export function assignShuttlesToDrivers(shuttles: SPShuttle[], drivers: Driver[]) {
  
    // מיון השאטלים לפי זמן התחלה
    const sortedShuttles = shuttles.sort((a, b) => a.StartTime.valueOf() - b.StartTime.valueOf());

    for (const shuttle of sortedShuttles) {
      let assigned = false;
      
      // מתחיל מהנהגים עם הכי פחות קילומטרים
      const sortedDrivers = [...drivers].sort((a, b) => getTotalKm(a) - getTotalKm(b));
  
      for (const driver of sortedDrivers) {
        if (canAssignShuttle(driver, shuttle)) {
            // אם הנהג יכול לקבל את השאטל, מוסיף אותו ללוח הזמנים של הנהג
            driver.schedule.push({
              // shuttleId: shuttle.Id,
              StartTime: shuttle.StartTime,
              ArrivalTime: shuttle.ArrivalTime,
              totalDistance: shuttle.totalDistance
            });
  
            // מוסיף את ההקצאה לתוצאה
            shuttle.driverDataId = driver.id;
            assigned = true;
            break;
        }
      }
  
      if (!assigned) {
        console.warn(`לא נמצא נהג זמין לנסיעה ${shuttle}`);
      }
    }
    return shuttles
    
  }