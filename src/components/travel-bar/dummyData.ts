import { Driver, ColorType, TravelItem } from "./types";

export const availableDrivers: Driver[] = [
    { id: 1, name: "אלכס" },
    { id: 2, name: "באסם" },
    { id: 3, name: "שמואל" },
  ];
  
  // Color to driver mapping
  export const colorToDriverNumber: Record<ColorType, string> = {
    'purple': 'נהג',
    'teal': 'נהג',
    'yellow': 'נהג'
  };
  
  // Kilometers per color/driver
  export const kilometersPerColor: Record<ColorType, string> = {
    'purple': '251 ק"מ',
    'teal': '283 ק"מ',
    'yellow': '244 ק"מ'
  };
  
  // Default data for bus drives
  export const defaultTravelItems: TravelItem[] = [
    { 
      id: 1121, 
      tripId: "1121",
      location: 'מרכ"א עמק', 
      type: 'ירושלים', 
      startTime: '07:30', 
      endTime: '08:20', 
      code: 'אזור א', 
      colorType: 'purple',
      driverId: 1,
      stations: [
        { name: 'מרכ"א עמק', arrivalTime: '07:30', isOrigin: true },
        { name: 'מרכ"א עמק', arrivalTime: '08:20', isDestination: true }
      ]
    },
    { 
      id: 1122, 
      tripId: "1122",
      location: 'אזור ב', 
      type: 'תחנה מרכזית', 
      startTime: '07:30', 
      endTime: '08:35', 
      code: 'אזור ב', 
      colorType: 'purple',
      driverId: 3,
      stations: [
        { name: 'מרכ"א עמק', arrivalTime: '07:30', isOrigin: true },
        { name: 'תחנה מרכזית', arrivalTime: '08:35', isDestination: true }
      ]
    },
    { 
      id: 1123, 
      tripId: "1122",
      location: 'מרכ"א עמק', 
      type: 'בסיס חצבה תא 10', 
      startTime: '08:50', 
      endTime: '10:00', 
      code: 'אזור ב', 
      colorType: 'purple',
      driverId: 3,
      stations: [
        { name: 'מרכ"א עמק', arrivalTime: '08:50', isOrigin: true },
        { name: 'תחנה מרכזית', arrivalTime: '09:20', passengers: 2 },
        { name: 'בסיס חצבה תא 10', arrivalTime: '09:50', passengers: 5 },
        { name: 'מרכ"א עמק', arrivalTime: '10:00', isDestination: true }
      ]
    },
    { 
      id: 1125, 
      tripId: "1125",
      location: 'אזור א', 
      type: 'חיפה', 
      startTime: '09:30', 
      endTime: '09:55', 
      code: 'אזור א', 
      colorType: 'teal',
      driverId: 2,
      stations: []
    },
    { 
      id: 1126, 
      tripId: "1125",
      location: 'אזור ב', 
      type: 'באר שבע', 
      startTime: '10:05', 
      endTime: '10:55', 
      code: 'אזור ב', 
      colorType: 'teal',
      driverId: 2,
      stations: []
    },
    { 
      id: 1127, 
      tripId: "1126",
      location: 'אזור א', 
      type: 'נתניה', 
      startTime: '10:30', 
      endTime: '12:00', 
      code: 'אזור א', 
      colorType: 'yellow',
      driverId: 1,
      stations: []
    },
    { 
      id: 1128, 
      tripId: "1127",
      location: 'אזור א', 
      type: 'אשדוד', 
      startTime: '10:45', 
      endTime: '11:50', 
      code: 'אזור א', 
      colorType: 'purple',
      driverId: 3,
      stations: []
    },
    { 
      id: 1129, 
      tripId: "1128",
      location: 'אזור א', 
      type: 'אילת', 
      startTime: '12:00', 
      endTime: '13:30', 
      code: 'אזור א', 
      colorType: 'teal',
      driverId: 2,
      stations: []
    },
  ];