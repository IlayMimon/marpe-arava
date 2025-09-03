import { ShuttleDetailsPerRequest } from "../types/shuttleDetailsPerRequst";
import { ShuttlesPerDay } from "./useGetTomorrowShuttles";
import { removeItemFromList } from "./postToSharepoint";

const resetShuttles = async (
  shuttles: ShuttlesPerDay[] | undefined,
  shuttlesDetailsPerRequest: ShuttleDetailsPerRequest[] | undefined
) => {
  if (!shuttles) return;
  if (!shuttlesDetailsPerRequest) return;
  // מחיקת כל הפריטים מרשימת Shuttles
  for (const shuttle of shuttles) {
    await removeItemFromList("Shuttles", shuttle.Id, "*");
  }
  // מחיקת כל הפריטים מרשימת ShuttleDetailsPerRequest
  for (const shuttleDetailsPerRequest of shuttlesDetailsPerRequest) {
    await removeItemFromList("ShuttleDetailsPerRequest", shuttleDetailsPerRequest.ID, "*");
  }
};

export default resetShuttles;
