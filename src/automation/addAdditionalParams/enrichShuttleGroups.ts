import { ExpandedShuttleRequest } from "../types/expandShuttleReq";
import enrichShuttleGroup from "../types/enrichShuttleGroup";
import dayjs from "dayjs";



function enrichShuttleGroups(shuttleGroups: ExpandedShuttleRequest[][]): enrichShuttleGroup[] {
  return shuttleGroups.map((group, index) => {
    const sortedByMin = [...group].sort((a, b) => a.minArrivalTime.valueOf() - b.minArrivalTime.valueOf());
    const sortedByMax = [...group].sort((a, b) => b.maxArrivalTime.valueOf() - a.maxArrivalTime.valueOf());
    const sortedByTime = [...group].sort((a, b) => a.shuttleDateTime.valueOf() - b.shuttleDateTime.valueOf());

    const minArrivalTime = sortedByMin[sortedByMin.length - 1].minArrivalTime;
    const maxArrivalTime = sortedByMax[0].maxArrivalTime;
    const arrivalTime = dayjs(Math.min(maxArrivalTime.valueOf(), Math.max(
      minArrivalTime.valueOf(),
      sortedByTime[0].shuttleDateTime.valueOf()
    )));
    const area = group[0].stationArea;

    return {
      value: group,
      minArrivalTime: minArrivalTime,
      maxArrivalTime: maxArrivalTime,
      area,
      arrivalTime,
      index
    };
  });
}

export default enrichShuttleGroups;