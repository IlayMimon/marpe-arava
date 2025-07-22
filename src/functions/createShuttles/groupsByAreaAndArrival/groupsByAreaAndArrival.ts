import { ExpandedShuttleRequest } from "../types/expandShuttleReq";


/**
 * Groups shuttle requests by their station area and sorts them by max arrival time.
 * Each group contains requests that can be served by the same shuttle.
 *
 * @param shuttleRequests - Array of expanded shuttle requests to be grouped.
 * @returns An array of shuttle groups, each containing a list of requests.
 */
function groupShuttleRequestsByArea(shuttleRequests: ExpandedShuttleRequest[]): ExpandedShuttleRequest[][] {
  const shuttleGroups: ExpandedShuttleRequest[][] = [];

  //   חילוץ אזורים ייחודיים שאינם '*'
  const distinctAreas = Array.from(new Set(shuttleRequests.map(req => req.stationArea).filter(area => area !== '*')));
  
  //   מעבר לפי אזור
  for (const area of distinctAreas) {
    const requestsInArea = shuttleRequests
      .filter(req => req.stationArea === area)
      .sort((a, b) => a.maxArrivalTime.getTime() - b.maxArrivalTime.getTime());

    let currShuttleGroup: ExpandedShuttleRequest[] = [];

    for (const request of requestsInArea) {
      const canBeAppended =
        currShuttleGroup.length === 0 ||
        currShuttleGroup[0].maxArrivalTime >= request.minArrivalTime;

      if (canBeAppended) {
        currShuttleGroup.push(request);
      } else {
        // סיים קבוצה קודמת
        shuttleGroups.push(currShuttleGroup);
        // התחל קבוצה חדשה
        currShuttleGroup = [request];
      }
    }

    // סיום: הוספת קבוצה אחרונה
    if (currShuttleGroup.length > 0) {
      shuttleGroups.push(currShuttleGroup);
    }
  }

  return shuttleGroups;
}

export default groupShuttleRequestsByArea;