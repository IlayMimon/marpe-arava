import { CreateShuttlesParams } from "../types/createSuttlesType";
import { ExpandedShuttleRequest } from "../types/expandShuttleReq";

/**
 * Builds expanded shuttle requests from the provided input.
 * 
 * @param {CreateShuttlesParams} input - The input containing shuttle requests, services, and stations.
 * @returns {ExpandedShuttleRequest[]} - An array of expanded shuttle requests.
 */
const buildExpandedShuttleRequests = (input: CreateShuttlesParams): ExpandedShuttleRequest[] =>  {
  const { shuttleRequests: shuttleRequest, services, stations } = input;
  const result: ExpandedShuttleRequest[] = [];

  for (const request of shuttleRequest) {
    // האם יש שירות שאוסר איחור
    const isLatenessForbidden = request.requestedService.some(serviceId => {
      const service = services.find(s => s.id === serviceId);
      return service?.isLatenessForbidden ?? false;
    });

    // מציאת תחנה מתאימה
    const station = stations.find(s => s.Id === request.stationId);
    if (!station) continue;

    // חישובי זמנים
    const shuttleTime = new Date(request.shuttleDateTime);
    const minArrivalTime = new Date(shuttleTime.getTime() - 30 * 60000); // מינוס 30 דקות
    const maxArrivalTime = isLatenessForbidden
      ? new Date(shuttleTime)
      : new Date(shuttleTime.getTime() + 30 * 60000); // פלוס 30 דקות

    // בניית האובייקט המורחב
    result.push({
      shuttelsRequestId: request.shuttelsRequestId,
      shuttleDateTime: shuttleTime,
      isReturnShuttleRequired: request.isReturnShuttleRequired,
      isLatenessForbidden,
      stationId: station.Id,
      stationName: station.Title,
      stationArea: station.Area,
      stationOrder: station.StationOrder,
      minArrivalTime,
      maxArrivalTime
    });
  }

  return result;
}

export default buildExpandedShuttleRequests;