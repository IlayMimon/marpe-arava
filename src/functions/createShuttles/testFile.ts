import { Status } from "../../components/types/Status";
import createShuttles from "./main";
import { ShuttleRequest, Service, Station, Route, CreateShuttlesParams } from "./types/createSuttlesType";
import axios from 'axios';

const BASE_URL = 'https://tikshuv.sharepoint.com/sites/MarpeArava';

axios.defaults.baseURL = 'http://localhost:3000/sites/MarpeArava/_api/web/lists';

export async function getShuttelsRequests(): Promise<ShuttleRequest[]> {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

  const isoTomorrow = tomorrow.toISOString();
  const isoDayAfter = dayAfterTomorrow.toISOString();

  const res = await axios.get(`/getbytitle('ShuttleRequests')/items?$filter=Time ge datetime'${isoTomorrow}' and Time lt datetime'${isoDayAfter}'`);
 
  return res.data.value.map((item: any): ShuttleRequest => ({
    shuttelsRequestId: item.Id,
    requestedService: item.RequestedServicesId || [],
    isReturnShuttleRequired: item.IsReturnShuttleRequired,
    shuttleDateTime: new Date(new Date(item.Time).getTime() + 3 * 60 * 60 * 1000), // INFO add 3 hours
    stationId: item.StationId,
    returnStationId: item.ReturnStationId
  }));
}

export async function getServices(): Promise<Service[]> {
  const res = await axios.get("/getbytitle('Services')/items");
  
  return res.data.value.map((item: any): Service => ({
    id: item.Id,
    name: item.Title,
    isLatenessForbidden: item.IsLatenessForbidden,
    duration: item.Time
  }));
}

export async function getStations(): Promise<Station[]> {
  const res = await axios.get("/getbytitle('Stations')/items");
  return res.data.value.map((item: any): Station => ({
    Id: item.Id,
    Title: item.Title,
    Area: item.Area,
    StationOrder: item.StationOrder
  }));
}

export async function getRoutes(): Promise<Route[]> {
  const res = await axios.get("/getbytitle('Routes')/items");
 
  return res.data.value.map((item: any): Route => ({
    id: item.Id,
    SourceId: item.SourceId,
    DestinationId: item.DestinationId,
    TravelTime: item.TravelTime,
    Distance: item.Distance
  }));
}

async function getParams() {
   
  try {
    const shuttels = await getShuttelsRequests();
    // console.log('Shuttels:', shuttels);

    const services = await getServices();
    // console.log('Services:', services);

    const stations = await getStations();
    // console.log('Stations:', stations);

    const routes = await getRoutes();
    // console.log('Routes:', routes);

    return {
      shuttleRequests: shuttels,
      services: services,
      stations: stations,
      routes: routes
    } as CreateShuttlesParams;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function runShuttleAssignment(setStatus: (status: Status) => void) {
  try {
    const createShuttlesParams = await getParams();
    if (createShuttlesParams) {
      createShuttles(createShuttlesParams, setStatus);
    } else {
      console.error("Failed to get parameters for createShuttles.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export default runShuttleAssignment;
