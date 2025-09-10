import { ShuttlesPerDay } from "./useGetTomorrowShuttles";
import { removeItemFromList } from "./postToSharepoint";

const resetShuttles = async (
  shuttles: ShuttlesPerDay[] | undefined,
) => {
  if (!shuttles) return;
  // מחיקת כל הפריטים מרשימת Shuttles

  for (const shuttle of shuttles) {
    await removeItemFromList("Shuttles", shuttle.Id, "*");
  }
};

export default resetShuttles;
