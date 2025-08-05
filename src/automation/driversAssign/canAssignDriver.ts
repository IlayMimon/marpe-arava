import { SPShuttle } from "../types/createSuttlesType";
import { Driver, Shuttle } from "../types/driversAssignTypes";

export function canAssignShuttle(driver: Driver, shuttle: SPShuttle): boolean {
    // מיון לפי זמן
    const assignments = driver.schedule.sort((a, b) => a.StartTime.valueOf() - b.StartTime.valueOf());

    // בדוק האם יש חפיפה בזמנים
    for (const assignment of assignments) {
      if (
        shuttle.StartTime.isBefore(assignment.ArrivalTime) &&
        shuttle.ArrivalTime.isAfter(assignment.StartTime)   
      ) {
        return false;
      }
    }
  
    // חישוב זמן נהיגה רצוף
    const fourHours = 4 * 60 * 60 * 1000;
    const HalfAnHour = 30 * 60 * 1000;
    const recentAssignments = assignments.filter(
      a => shuttle.StartTime.diff(a.ArrivalTime, 'minute') <= HalfAnHour
    );
  
    let totalDriveTime = 0;
    for (const a of recentAssignments) {
      totalDriveTime += a.ArrivalTime.diff(a.StartTime, 'minute');
    }
  
    // אם עבר 4 שעות - הפסקה 
    return totalDriveTime <= fourHours;
  }
   