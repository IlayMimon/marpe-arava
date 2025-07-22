import { ExpandedShuttleRequest } from "../types/expandShuttleReq";
import enrichShuttleGroup from "../types/enrichShuttleGroup";



function enrichShuttleGroups(shuttleGroups: ExpandedShuttleRequest[][]): enrichShuttleGroup[] {
  return shuttleGroups.map((group, index) => {
    const sortedByMin = [...group].sort((a, b) => a.minArrivalTime.getTime() - b.minArrivalTime.getTime());
    const sortedByMax = [...group].sort((a, b) => b.maxArrivalTime.getTime() - a.maxArrivalTime.getTime());
    const sortedByTime = [...group].sort((a, b) => a.shuttleDateTime.getTime() - b.shuttleDateTime.getTime());

    const minArrivalTime = sortedByMin[sortedByMin.length - 1].minArrivalTime;
    const maxArrivalTime = sortedByMax[0].maxArrivalTime;
    const arrivalTime = new Date(Math.min(maxArrivalTime.getTime(), Math.max(
      minArrivalTime.getTime(),
      sortedByTime[0].shuttleDateTime.getTime()
    )));
    const area = group[0].stationArea;

    return {
      Value: group,
      MinArrivalTime: minArrivalTime,
      MaxArrivalTime: maxArrivalTime,
      Area: area,
      ArrivalTime: arrivalTime,
      Index: index
    };
  });
}

export default enrichShuttleGroups;