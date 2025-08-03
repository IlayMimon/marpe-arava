// import createShuttles from "./main";
// import { ShuttleRequest, Service, Station, Route, CreateShuttlesParams } from "./types/createSuttlesType";
// import axios from 'axios';
// import dayjs from "dayjs";
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import { SharepointQueryResultArray, SPRoute, SPService, SPShuttleRequest, SPStation } from "./types/spFetchTypes";

// dayjs.extend(timezone);
// dayjs.extend(utc);

// const BASE_URL = 'https://tikshuv.sharepoint.com/sites/MarpeArava';

// axios.defaults.baseURL = 'http://localhost:3000/sites/MarpeArava/_api/web/lists';
// axios.defaults.headers.Accept = 'application/json;odata=verbose';

export async function getshuttlesRequests(): Promise<ShuttleRequest[]> {
  const tomorrow = dayjs().add(1,'day').startOf('day');
  const dayAfterTomorrow = tomorrow.add(1, "day");

  const isoTomorrow = tomorrow.subtract(1,'day').toISOString();
  const isoDayAfter = dayAfterTomorrow.subtract(1,'day').toISOString();

  const res = await axios.get<SharepointQueryResultArray<SPShuttleRequest>>(
    `/getbytitle('ShuttleRequests')/items?$filter=Time ge datetime'${isoTomorrow}' and Time lt datetime'${isoDayAfter}'`
  );
  return res.data.d.results.map((item): ShuttleRequest => ({
    id: item.Id,
    requestedService: item.RequestedServicesId || [],
    isReturnShuttleRequired: item.IsReturnShuttleRequired || false,
    shuttleDateTime: dayjs.utc(item.Time).local(),
    stationId: item.StationId,
    returnStationId: item.ReturnStationId
  }));
}

// export async function getServices(): Promise<Service[]> {
//   const res = await axios.get<SharepointQueryResultArray<SPService>>("/getbytitle('Services')/items");
  
//   return res.data.d.results.map((item): Service => ({
//     id: item.Id,
//     name: item.Title,
//     isLatenessForbidden: item.IsLatenessForbidden,
//     duration: item.Time
//   }));
// }

// export async function getStations(): Promise<Station[]> {
//   const res = await axios.get<SharepointQueryResultArray<SPStation>>("/getbytitle('Stations')/items");
//   return res.data.d.results.map((item): Station => ({
//     id: item.Id,
//     title: item.Title,
//     area: item.Area,
//     stationOrder: item.StationOrder
//   }));
// }

// export async function getRoutes(): Promise<Route[]> {
//   const res = await axios.get<SharepointQueryResultArray<SPRoute>>("/getbytitle('Routes')/items");
 
//   return res.data.d.results.map((item): Route => ({
//     id: item.Id,
//     sourceId: item.SourceId,
//     destinationId: item.DestinationId,
//     travelTime: item.TravelTime,
//     distance: item.Distance
//   }));
// }

// async function getParams() {
   
//   try {
//     const shuttles = await getshuttlesRequests();
//     // console.log('shuttles:', shuttles);

//     const services = await getServices();
//     // console.log('Services:', services);

//     const stations = await getStations();
//     // console.log('Stations:', stations);

//     const routes = await getRoutes();
//     // console.log('Routes:', routes);

//     return {
//       shuttleRequests: shuttles,
//       services: services,
//       stations: stations,
//       routes: routes
//     };
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// async function main() {
//   try {
//     const createShuttlesParams: CreateShuttlesParams = (await getParams())!;
//     createShuttles(createShuttlesParams); 
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// main();



