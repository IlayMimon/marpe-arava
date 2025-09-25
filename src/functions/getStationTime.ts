import dayjs, { Dayjs } from "dayjs";

export function getStationTime(stationName: string, input: string): Dayjs | undefined {
  const lines = input.split("\n");

  for (const line of lines) {
    const index = line.indexOf(":");
    if (index === -1) continue;

    const station = line.slice(0, index).trim();
    const timeStr = line.slice(index + 1).trim();

    if (station === stationName) {
      const parsed = dayjs(timeStr, "HH:mm"); // parse as today’s date + HH:mm
      return parsed.isValid() ? parsed : undefined;
    }
  }

  return undefined;
}
