import { ExpandedShuttleRequest } from "../types/expandShuttleReq";

interface IndexedShuttleGroup {
  Index: number;
  Value: ExpandedShuttleRequest[];
}

const assignHayoonRequestsToShuttleGroups = (
    shuttleRequests: ExpandedShuttleRequest[],
  shuttleGroups: ExpandedShuttleRequest[][]
): ExpandedShuttleRequest[][] => {

  const hayoonRequests = shuttleRequests.filter(req => req.stationArea === '*');

  const indexedShuttleGroups: IndexedShuttleGroup[] = shuttleGroups.map((group, index) => ({
    Index: index,
    Value: group,
  }));

  for (const hayoonRequest of hayoonRequests) {
    // חיפוש קבוצות קיימות שמתאימות לבקשת חיון (חפיפת זמנים)
    const possibleGroups = indexedShuttleGroups.filter((group) => {
      const sortedByMin = [...group.Value].sort(
        (a, b) => a.minArrivalTime.getTime() - b.minArrivalTime.getTime()
      );
      const sortedByMax = [...group.Value].sort(
        (a, b) => b.maxArrivalTime.getTime() - a.maxArrivalTime.getTime()
      );

      const latestMin = sortedByMin[sortedByMin.length - 1].minArrivalTime;
      const earliestMax = sortedByMax[sortedByMax.length - 1].maxArrivalTime;

      return (
        hayoonRequest.maxArrivalTime >= latestMin &&
        hayoonRequest.minArrivalTime <= earliestMax
      );
    });

    if (possibleGroups.length > 0) {
      const groupToUpdate = possibleGroups[0];

      // יצירת קבוצת שאטלים מעודכנת עם בקשת חיון
      const newGroupValue = [...groupToUpdate.Value, hayoonRequest];

      // עדכון הקבוצה ברשימה עם אינדקס זהה
      const updatedGroups = indexedShuttleGroups.map((group) =>
        group.Index === groupToUpdate.Index
          ? { Index: group.Index, Value: newGroupValue }
          : group
      );

      indexedShuttleGroups.splice(0, indexedShuttleGroups.length, ...updatedGroups);
    } else {
      // אין קבוצה מתאימה → יוצרים קבוצה חדשה
      indexedShuttleGroups.push({
        Index: indexedShuttleGroups.length,
        Value: [hayoonRequest],
      });
    }
  }

  // הסרה של השדה Index מהפלט הסופי
  return indexedShuttleGroups.map((group) => group.Value);
}


export default assignHayoonRequestsToShuttleGroups;