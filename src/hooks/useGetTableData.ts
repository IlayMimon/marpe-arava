import { TripDirection } from "../components/HomeScreenBody";
import { TableRow } from "../components/Table/TableTypes";
import useGetDrivers from "./data/useGetDrivers";
import useGetServices from "./data/useGetServices";
import useGetShuttleDetailsPerRequest from "./data/useGetShuttleDetailsPerRequest";
import useGetShuttleRequests from "./data/useGetShuttleRequests";
import useGetShuttles from "./data/useGetShuttles";
import useGetStations from "./data/useGetStations";
import dayjs from 'dayjs';

const useGetTableData = (tripDirection: TripDirection) => {
  const shuttles = useGetShuttles();
  const shuttleRequests = useGetShuttleRequests();
  const shuttleDetailsPerRequest = useGetShuttleDetailsPerRequest();
  const stations = useGetStations();
  const services = useGetServices();
  const drivers = useGetDrivers();

  const data =
    shuttleDetailsPerRequest?.flatMap((requestDetails) => {

      const shuttle = shuttles?.find((shut) => shut?.RequestsId?.results.includes(requestDetails?.ID));
      const request = shuttleRequests?.find((req) => req.ID === requestDetails.RequestId);
      const pickupStation = stations?.find((station) => station.ID === request?.StationId);
      const dropoffStation = stations?.find((station) => station.ID === request?.ReturnStationId);
      const driver = drivers?.find(driver => driver.ID === requestDetails.DriverId)
      const returnDriver = drivers?.find(driver => driver.ID === requestDetails.ReturnDriverId)
      const requestedServices = request?.RequestedServicesId?.results
        .map((serviceId) => services?.find((service) => service.ID === serviceId))
        .filter((service) => service !== undefined)
      const requestedServicesTitles = requestedServices?.map(service => service?.Title);
      const servicesDuration = requestedServices?.reduce((total, service) => total + (service?.Time || 0), 0) || 0;

      if (!request) return []

      const basicPassangerData = {
        id: request.ID,
        requestDetailsId: requestDetails.ID || 0,
        shuttleId: shuttle?.ID || 0,
        fullName: request?.FullName || "",
        status: requestDetails.DriverId ? "שובץ" : "לא שובץ",
        phone: request?.Phone || "",
        appointmentType: requestedServicesTitles || [],
        rideId: shuttle?.ID || "",
        area: tripDirection === "outbound" ? pickupStation?.Area || "" : dropoffStation?.Area || "",
        driver: tripDirection === "outbound" ? driver?.Title || "" : returnDriver?.Title || "",
        notes: "",
        actions: "actions",
      };

      const estimatedArrival = dayjs(shuttle?.ArrivalTime || new Date());
      const desiredArrival = dayjs(request?.Time || new Date());
      const finishTime = dayjs(requestDetails.FinishTime || new Date());
      const inboundTime = dayjs(requestDetails.InboundTime || new Date());

      const directionPassangerData = tripDirection === "outbound" ? {
        pickupStation: pickupStation?.Title || "",
        pickupTime: dayjs(requestDetails.PickupTime),
        estimatedArrival: estimatedArrival,
        desiredArrival: desiredArrival,
        outboundGap: estimatedArrival.diff(desiredArrival, 'minute'),
      } : {
        dropoffStation: pickupStation?.Title || "",
        estimatedFinish: estimatedArrival.add(servicesDuration, 'minute'),
        finishTime: finishTime,
        inboundTime: inboundTime,
        inboundGap: inboundTime.diff(finishTime, 'minute'),
      }

      const passangerData: TableRow = { ...basicPassangerData, ...directionPassangerData };

      return passangerData;
    })

  return data || [];
};

export default useGetTableData;
