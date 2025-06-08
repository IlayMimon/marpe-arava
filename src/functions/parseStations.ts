import { StationInfo } from "../types/travelBar";

export const parseStations = (input: string): StationInfo[] => {
  const lines = input.trim().split("\n");
  return lines.map((line, index) => {
    const [rawName, rawTime] = line.split(": ").map((part) => part.trim());
    return {
      name: rawName,
      arrivalTime: rawTime,
      isOrigin: index === 0 ? true : undefined,
      isDestination: index === lines.length - 1 ? true : undefined,
    };
  });
};
