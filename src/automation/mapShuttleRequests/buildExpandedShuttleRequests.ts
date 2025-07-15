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
    const isLatenessForbidden = request.requestedService.results.some(serviceId => {
      const service = services.find(s => s.id === serviceId);
      return service?.isLatenessForbidden ?? false;
    });

    // מציאת תחנה מתאימה
    const station = stations.find(s => s.id === request.stationId);
    if (!station) continue;

    // חישובי זמנים
    const shuttleTime = request.shuttleDateTime;
    const minArrivalTime = shuttleTime.subtract(30, 'minutes'); // מינוס 30 דקות
    const maxArrivalTime = isLatenessForbidden
      ? shuttleTime
      : shuttleTime.add(30, 'minutes'); // פלוס 30 דקות

    // בניית האובייקט המורחב
    result.push({
      shuttlesRequestId: request.id,
      shuttleDateTime: shuttleTime,
      isReturnShuttleRequired: request.isReturnShuttleRequired,
      isLatenessForbidden,
      stationId: station.id,
      stationName: station.title,
      stationArea: station.area,
      stationOrder: station.stationOrder,
      minArrivalTime,
      maxArrivalTime
    });
  }

  return result;
}

export default buildExpandedShuttleRequests;