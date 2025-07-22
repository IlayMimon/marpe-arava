import { Route, ShuttleRequest, Station } from "../types/createSuttlesType";
import enrichShuttleGroup from "../types/enrichShuttleGroup";



const getStationsOrders = (group: enrichShuttleGroup): { StationOrder: number; StationArea: string }[] => {

    const marpeStation = {
      StationOrder: 0,
      StationArea: "*"
    };

    const stationOrders = group.Value.map((req) => ({
        StationOrder: req.stationOrder,
        StationArea: req.stationArea,
      }))
      .filter(
        (station, index, self) =>
          index === self.findIndex(
            (s) => s.StationOrder === station.StationOrder && s.StationArea === station.StationArea
          )
      );

    stationOrders.sort((a, b) => {
        if (a.StationArea === '*' && b.StationArea !== '*') return 1;
        if (a.StationArea !== '*' && b.StationArea === '*') return -1;
        return a.StationOrder - b.StationOrder;
  });

  stationOrders.unshift(marpeStation);
  stationOrders.push(marpeStation);

  return stationOrders;
}
// פונקציית עזר להמרת זמן בפורמט ISO והחסרת דקות
const subtractMinutes = (dateString: string, minutes: number): string => {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() - minutes);
  return date.toISOString();
}

const getRoute = (currentStation: Station, prevStation: Station, routes: Route[]): Route => {

    let route: Route;
    if(currentStation.Id === 17 || prevStation.Id === 17){
      route = routes.find(
        (r) => (r.SourceId === null && r.DestinationId === currentStation?.Id) ||
        (r.SourceId === prevStation?.Id && r.DestinationId === null)
    );} else {

      route = routes.find(
            (r) =>
              (r.SourceId === currentStation.Id &&
              r.DestinationId === prevStation.Id) ||
              (r.SourceId === prevStation.Id && 
              r.DestinationId === currentStation.Id)
          );
    }

        if (!route) {
          throw new Error(
            `Route not found from Station ${currentStation.Id} to ${prevStation.Id}`
          );
        }
        return route
}


/**
 * מחשבת את זמני ההגעה של תחנות השאטל בקבוצות השאטלים
 * @param shuttleGroups קבוצות השאטלים המועשרות
 * @param stationsList רשימת התחנות
 * @param routesList רשימת המסלולים
 * @returns קבוצות השאטלים עם זמני ההגעה לכל תחנה
 */
function calculateShuttleStationsTimes(
  shuttleGroups: enrichShuttleGroup[],
  stationsList: Station[],
  routesList: Route[]
): enrichShuttleGroup[] {
  const updatedShuttleGroups = [];

  for (const group of shuttleGroups) {

    // בחר תחנות ומיין לפי StationOrder
    const stationOrders = getStationsOrders(group);

    // מערך לתחנות עם זמני הגעה
    let shuttleStations: { Station: Station; ArrivalTime: string }[] = [];

    // משתנה למעקב אחרי התחנה הקודמת
    let prevStation: Station | null = null;

    // עבור כל תחנה
    for (const stationOrder of stationOrders) {
      
      // מצא את התחנה בהתאמה באובייקט תחנות
      const currentStation = stationsList.find(
        (s) =>
          s.Area === stationOrder.StationArea &&
          s.StationOrder === stationOrder.StationOrder
      );

      if (!currentStation) {
        throw new Error(
          `Station not found for Area: ${stationOrder.StationArea} Order: ${stationOrder.StationOrder}`
        );
      }

      // אם זו לא התחנה הראשונה, נמצא את המסלול בין התחנה הקודמת לתחנה הנוכחית
      let travelTimeMinutes = 0;
      let distance = 0

      console.log(prevStation, currentStation);
      if (prevStation) {
        const route = getRoute(currentStation, prevStation, routesList)

        travelTimeMinutes = route.TravelTime;
        distance = route.Distance;
      }

      // שמור את התחנה עם זמן ההגעה
      shuttleStations.push({
        Station: {
          Id: currentStation.Id,
          Title: currentStation.Title,
          Area: currentStation.Area,
          StationOrder: currentStation.StationOrder,
          Distance: distance,
          TravelTime: travelTimeMinutes,
        },
        ArrivalTime: '',
      });

      // עדכן את התחנה הקודמת
      prevStation = currentStation;
    }

   for (let i = shuttleStations.length - 1; i >= 0; i--) {
     if(i === shuttleStations.length - 1) {
       shuttleStations[i].ArrivalTime = subtractMinutes(String(group.ArrivalTime), 0);
      } else {
        shuttleStations[i].ArrivalTime = subtractMinutes(shuttleStations[i + 1].ArrivalTime, shuttleStations[i + 1].Station.TravelTime);
      }
}

    // עדכן את קבוצת השאטל עם התחנות וחישובי הזמנים
    updatedShuttleGroups.push({
      ...group,
      Stations: shuttleStations,
    });
  }

  return updatedShuttleGroups;
}


export default calculateShuttleStationsTimes;