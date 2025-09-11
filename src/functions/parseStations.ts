import { StationInfo } from "../types/travelBar";
import findRequestByShuttleId from "./findRequestByShuttleId";
import { Shuttle } from "../hooks/data/useGetShuttles";
import { ShuttleRequest } from "../hooks/data/useGetShuttleRequests";
import { Station } from "../hooks/data/useGetStations";

export const parseStations = (
  input: string,
  _arrivalTime: Date,
  shuttle: Shuttle,
  shuttleRequests: ShuttleRequest[] | undefined,
  stations: Station[] | undefined
): StationInfo[] => {
  const fixTime = (rawTime: string): string => {
    const [hourStr, minuteStr] = rawTime.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const totalMinutes = hour * 60 + minute;
    // If the time is before 6:30 AM, add 12 hours to convert to PM
    if (totalMinutes < 6 * 60 + 30) {
      const newHour = hour + 12;
      return `${newHour.toString().padStart(2, "0")}:${minuteStr}`;
    }
    return rawTime;
  };

  const lines = input.trim().split("\n");
  const parsedStations = lines.map((line, index) => {
    const [rawName, rawTime] = line.split(": ").map((part) => part.trim());

    const passengers = shuttle.RequestsId.results
      .map((requestId) => {
        const passenger = findRequestByShuttleId(requestId, shuttleRequests);
        const station = stations?.find((station) => station.ID === passenger?.StationId);
        if (passenger && station && station.Title === rawName) {
          return passenger.FullName;
        }
      })
      .filter((value) => value !== undefined && value !== null);

    return {
      name: rawName,
      arrivalTime: fixTime(rawTime),
      isOrigin: index === 0 ? true : undefined,
      isDestination: undefined,
      passengers: (passengers.length !== 0 && passengers) || undefined,
    };
  });

  return parsedStations;
};
