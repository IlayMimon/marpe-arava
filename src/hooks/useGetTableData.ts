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

  console.log('shuttles', shuttleDetailsPerRequest)

  const data =
    shuttleDetailsPerRequest?.map((requestDetails, index) => {
      console.log('requestDetails', requestDetails)

      const shuttle = shuttles?.find((shut) => shut?.RequestsId?.results.includes(requestDetails?.ID));
      const request = shuttleRequests?.find((req) => req.ID === requestDetails.RequestId);
      const station = stations?.find((station) => station.ID === request?.StationId);
      const driver = drivers?.find(driver => driver.ID === requestDetails.DriverId)
      const requestedServices = request?.RequestedServicesId?.results
        .map((serviceId) => services?.find((service) => service.ID === serviceId))
        .filter((service) => service !== undefined)
      const requestedServicesTitles = requestedServices?.map(service => service?.Title);
      const servicesDuration = requestedServices?.reduce((total, service) => total + (service?.Time || 0), 0) || 0;

      const basicPassangerData = {
        id: request?.ID || index + 1,
        requestDetailsId: requestDetails?.ID || 0,
        suttleId: shuttle?.ID || 0,
        fullName: request?.FullName || "",
        status: requestDetails.DriverId ? "שובץ" : "לא שובץ",
        phone: request?.Phone || "",
        appointmentType: requestedServicesTitles || [],
        rideId: shuttle?.ID || "",
        pickupStation: station?.Title || "",
        area: station?.Area || "",
        driver: driver?.Title || "",
        notes: "",
        actions: "actions",
      };

      console.log('basic', basicPassangerData)

      const estimatedArrival = dayjs(shuttle?.ArrivalTime || new Date());
      const desiredArrival = dayjs(request?.Time || new Date());
      const finishTime = dayjs(requestDetails.FinishTime || new Date());
      const inboundTime = dayjs(requestDetails.InboundTime || new Date());

      const directionPassangerData = tripDirection === "outbound" ? {
        pickupTime: dayjs(requestDetails.PickupTime),
        estimatedArrival: estimatedArrival,
        desiredArrival: desiredArrival,
        outboundGap: estimatedArrival.diff(desiredArrival, 'minute'),
      } : {
        estimatedFinish: estimatedArrival.add(servicesDuration, 'minute'),
        finishTime: finishTime,
        inboundTime: inboundTime,
        inboundGap: inboundTime.diff(finishTime, 'minute'),
      }

      const passangerData: TableRow = { ...basicPassangerData, ...directionPassangerData };
      console.log('passs',passangerData)

      return passangerData;
    })

  return data || [];
};

export default useGetTableData;
