import dayjs, { Dayjs } from "dayjs";
import { Route, Station, StationWithTravelTime } from "../types/createSuttlesType";
import enrichShuttleGroup from "../types/enrichShuttleGroup";



const getStationsOrders = (group: enrichShuttleGroup): { StationOrder: number; StationArea: string }[] => {

    const marpeStation = {
      StationOrder: 0,
      StationArea: "*"
    };

    const stationOrders = group.value.map((req) => ({
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
const subtractMinutes = (dateString: dayjs.Dayjs, minutes: number): dayjs.Dayjs => {
  return dayjs(dateString).subtract(minutes, 'minutes');
}

const getRoute = (currentStation: Station, prevStation: Station, routes: Route[]): Route => {

    let route: Route | undefined = undefined;
    if(currentStation.id === 17 || prevStation.id === 17){
      route = routes.find(
        (route) => (route.sourceId === null && route.destinationId === currentStation?.id) ||
        (route.sourceId === prevStation?.id && route.destinationId === null)
    );} else {

      route = routes.find(
            (r) =>
              (r.sourceId === currentStation.id &&
              r.destinationId === prevStation.id) ||
              (r.sourceId === prevStation.id && 
              r.destinationId === currentStation.id)
          );
    }

        if (!route) {
          throw new Error(
            `Route not found from Station ${currentStation.id} to ${prevStation.id}`
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
  const updatedShuttleGroups: enrichShuttleGroup[] = [];

  for (const group of shuttleGroups) {

    // בחר תחנות ומיין לפי StationOrder
    const stationOrders = getStationsOrders(group);

    // מערך לתחנות עם זמני הגעה
    const shuttleStations: { station: StationWithTravelTime; arrivalTime: Dayjs }[] = [];

    // משתנה למעקב אחרי התחנה הקודמת
    let prevStation: Station | null = null;

    // עבור כל תחנה
    for (const stationOrder of stationOrders) {
      
      // מצא את התחנה בהתאמה באובייקט תחנות
      const currentStation = stationsList.find(
        (s) =>
          s.area === stationOrder.StationArea &&
          s.stationOrder === stationOrder.StationOrder
      );

      if (!currentStation) {
        throw new Error(
          `Station not found for Area: ${stationOrder.StationArea} Order: ${stationOrder.StationOrder}`
        );
      }

      // אם זו לא התחנה הראשונה, נמצא את המסלול בין התחנה הקודמת לתחנה הנוכחית
      let travelTimeMinutes = 0;
      let distance = 0

      if (prevStation) {
        const route = getRoute(currentStation, prevStation, routesList)

        travelTimeMinutes = route.travelTime;
        distance = route.distance;
      }

      // שמור את התחנה עם זמן ההגעה
      shuttleStations.push({
        station: {
          id: currentStation.id,
          title: currentStation.title,
          area: currentStation.area,
          stationOrder: currentStation.stationOrder,
          distance: distance,
          travelTime: travelTimeMinutes,
        },
        arrivalTime: dayjs(),
      });

      // עדכן את התחנה הקודמת
      prevStation = currentStation;
    }

   for (let i = shuttleStations.length - 1; i >= 0; i--) {
     if(i === shuttleStations.length - 1) {
       shuttleStations[i].arrivalTime = group.arrivalTime;
      } else {
        const previousStation = shuttleStations[i + 1]
        shuttleStations[i].arrivalTime =  previousStation.arrivalTime.subtract(previousStation.station.travelTime, 'minutes');
      }
}

    // עדכן את קבוצת השאטל עם התחנות וחישובי הזמנים
    updatedShuttleGroups.push({
      ...group,
      stations: shuttleStations,
    });
  }

  return updatedShuttleGroups;
}


export default calculateShuttleStationsTimes;