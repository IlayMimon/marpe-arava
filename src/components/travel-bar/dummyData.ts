import { Driver, ColorType, TravelItem } from "../../types/travelBar";

export const drivers: Driver[] = [
  { id: 1, name: "אלכס" },
  { id: 2, name: "באסם" },
  { id: 3, name: "שמואל" },
];

// Kilometers per color/driver
export const kilometersPerColor: Record<ColorType, string> = {
  purple: '251 ק"מ',
  teal: '283 ק"מ',
  yellow: '244 ק"מ',
};

// Default data for bus drives
export const defaultTravelItems: TravelItem[] = [
  {
    id: 1121,
    tripId: "1121",
    startTime: "07:30",
    endTime: "08:20",
    code: "א",
    colorType: "purple",
    stations: [
      { name: 'מרכ"א עמק', arrivalTime: "07:30", isOrigin: true },
      { name: 'מרכ"א עמק', arrivalTime: "08:20", isDestination: true },
    ],
  },
  {
    id: 1122,
    tripId: "1122",
    startTime: "07:30",
    endTime: "08:35",
    code: "ב",
    colorType: "purple",
    stations: [
      { name: 'מרכ"א עמק', arrivalTime: "07:30", isOrigin: true },
      { name: "תחנה מרכזית", arrivalTime: "08:35", isDestination: true },
    ],
  },
  {
    id: 1123,
    tripId: "1122",
    startTime: "08:50",
    endTime: "10:00",
    code: "ב",
    colorType: "purple",
    stations: [
      { name: 'מרכ"א עמק', arrivalTime: "08:50", isOrigin: true },
      {
        name: "תחנה מרכזית",
        arrivalTime: "09:20",
        passengers: ["איליי", "טל", "עידן"],
      },
      {
        name: "בסיס חצבה תא 10",
        arrivalTime: "09:50",
        passengers: ["איליי", "טל", "עידן"],
      },
      {
        name: "בסיס חצבה תא 10",
        arrivalTime: "09:51",
        passengers: ["איליי", "טל", "עידן"],
      },
      {
        name: "בסיס חצבה תא 10",
        arrivalTime: "09:52",
        passengers: ["איליי", "טל", "עידן"],
      },
      { name: 'מרכ"א עמק', arrivalTime: "10:00", isDestination: true },
    ],
  },
  {
    id: 1125,
    tripId: "1125",
    startTime: "09:30",
    endTime: "09:55",
    code: "א",
    colorType: "teal",
    stations: [],
  },
  {
    id: 1126,
    tripId: "1125",
    startTime: "10:05",
    endTime: "10:55",
    code: "ב",
    colorType: "teal",
    stations: [],
  },
  {
    id: 1127,
    tripId: "1126",
    startTime: "10:30",
    endTime: "12:00",
    code: "א",
    colorType: "yellow",
    stations: [],
  },
  {
    id: 1128,
    tripId: "1127",
    startTime: "10:45",
    endTime: "11:50",
    code: "א",
    colorType: "purple",
    stations: [],
  },
  {
    id: 1129,
    tripId: "1128",
    startTime: "12:00",
    endTime: "13:30",
    code: "א",
    colorType: "teal",
    stations: [],
  },
];
