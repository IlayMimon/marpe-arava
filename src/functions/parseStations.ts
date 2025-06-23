import { StationInfo } from "../types/travelBar";
import dayjs from "dayjs";

export const parseStations = (input: string, arrivalTime: Date): StationInfo[] => {
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
    return {
      name: rawName,
      arrivalTime: fixTime(rawTime),
      isOrigin: index === 0 ? true : undefined,
      isDestination: undefined,
    };
  });

  return [
    ...parsedStations,
    {
      name: "מרפא ערבה",
      arrivalTime: dayjs(arrivalTime).format("HH:mm"),
      isOrigin: undefined,
      isDestination: true,
    },
  ];
};
