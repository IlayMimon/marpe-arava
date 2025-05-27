import { canAssignShuttle } from "./canAssignDriver";
import { Driver, Shuttle, ShuttleAssignment } from "../../types/assignDriversTypes";

function getTotalKm(driver: Driver): number {
    return driver.schedule.reduce((sum, a) => sum + a.totalDistance, 0);
  }
  
export function assignShuttlesToDrivers(shuttles: Shuttle[], drivers: Driver[]): ShuttleAssignment[] {
    const result: ShuttleAssignment[] = [];
    
    // מיון השאטלים לפי זמן התחלה
    const sortedShuttles = shuttles.sort((a, b) => a.StartTime.getTime() - b.StartTime.getTime());
  
    for (const shuttle of sortedShuttles) {
      let assigned = false;
  
      // מתחיל מהנהגים עם הכי פחות קילומטרים
      const sortedDrivers = [...drivers].sort((a, b) => getTotalKm(a) - getTotalKm(b));
  
      for (const driver of sortedDrivers) {
        if (canAssignShuttle(driver, shuttle)) {
          // אם הנהג יכול לקבל את השאטל, מוסיף אותו ללוח הזמנים של הנהג
          driver.schedule.push({
            shuttleId: shuttle.Id,
            StartTime: shuttle.StartTime,
            ArrivalTime: shuttle.ArrivalTime,
            totalDistance: shuttle.totalDistance
          });
  
          result.push({
            shuttleId: shuttle.Id,
            driverId: driver.id,
            driverName: driver.name
          });
  
          assigned = true;
          break;
        }
      }
  
      if (!assigned) {
        console.warn(`לא נמצא נהג זמין לנסיעה ${shuttle.Id}`);
      }
    }
    for (const driver of drivers) {
        console.log(driver.id, driver.name, driver.schedule,getTotalKm(driver));
    }
    
    return result;
  }
  