import { canAssignShuttle } from "./canAssignDriver";
import { Driver, Shuttle, ShuttleAssignment } from "../../components/types/assignDriversTypes";

function getTotalKm(driver: Driver): number {
    return driver.schedule.reduce((sum, a) => sum + a.distanceKm, 0);
  }
  
export function assignShuttlesToDrivers(shuttles: Shuttle[], drivers: Driver[]): ShuttleAssignment[] {
    const result: ShuttleAssignment[] = [];
    
    // מיון השאטלים לפי זמן התחלה
    const sortedShuttles = shuttles.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  
    for (const shuttle of sortedShuttles) {
      let assigned = false;
  
      // מתחיל מהנהגים עם הכי פחות קילומטרים
      const sortedDrivers = [...drivers].sort((a, b) => getTotalKm(a) - getTotalKm(b));
  
      for (const driver of sortedDrivers) {
        if (canAssignShuttle(driver, shuttle)) {
          driver.schedule.push({
            shuttleId: shuttle.id,
            startTime: shuttle.startTime,
            arrivalTime: shuttle.arrivalTime,
            distanceKm: shuttle.distanceKm
          });
  
          result.push({
            shuttleId: shuttle.id,
            driverId: driver.id,
            driverName: driver.name
          });
  
          assigned = true;
          break;
        }
      }
  
      if (!assigned) {
        console.warn(`לא נמצא נהג זמין לנסיעה ${shuttle.id}`);
      }
    }
    for (const driver of drivers) {
        console.log(driver.id, driver.name, getTotalKm(driver));
    }
    return result;
  }
  