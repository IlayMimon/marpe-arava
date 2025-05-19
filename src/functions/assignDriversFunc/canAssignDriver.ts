import { Driver, Shuttle } from "../../components/types/assignDriversTypes";

export function canAssignShuttle(driver: Driver, shuttle: Shuttle): boolean {
    // מיון לפי זמן
    const assignments = driver.schedule.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  
    // בדוק האם יש חפיפה בזמנים
    for (const assignment of assignments) {
      if (
        shuttle.startTime < assignment.arrivalTime &&  
        shuttle.arrivalTime > assignment.startTime   
      ) {
        return false;
      }
    }
  
    // חישוב זמן נהיגה רצוף
    const fourHours = 4 * 60 * 60 * 1000;
    const recentAssignments = assignments.filter(
      a => shuttle.startTime.getTime() - a.arrivalTime.getTime() <= 30 * 60 * 1000
    );
  
    let totalDriveTime = 0;
    for (const a of recentAssignments) {
      totalDriveTime += a.arrivalTime.getTime() - a.startTime.getTime();
    }
  
    // אם עבר 4 שעות - הפסקה 
    return totalDriveTime <= fourHours;
  }
   