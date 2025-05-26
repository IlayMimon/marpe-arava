import { Driver, Shuttle } from "../../types/assignDriversTypes";

export function canAssignShuttle(driver: Driver, shuttle: Shuttle): boolean {
    // מיון לפי זמן
    const assignments = driver.schedule.sort((a, b) => a.StartTime.getTime() - b.StartTime.getTime());
  
    // בדוק האם יש חפיפה בזמנים
    for (const assignment of assignments) {
      if (
        shuttle.StartTime < assignment.ArrivalTime &&  
        shuttle.ArrivalTime > assignment.StartTime   
      ) {
        return false;
      }
    }
  
    // חישוב זמן נהיגה רצוף
    const fourHours = 4 * 60 * 60 * 1000;
    const HalfAnHour = 30 * 60 * 1000;
    const recentAssignments = assignments.filter(
      a => shuttle.StartTime.getTime() - a.ArrivalTime.getTime() <= HalfAnHour
    );
  
    let totalDriveTime = 0;
    for (const a of recentAssignments) {
      totalDriveTime += a.ArrivalTime.getTime() - a.StartTime.getTime();
    }
  
    // אם עבר 4 שעות - הפסקה 
    return totalDriveTime <= fourHours;
  }
   