import { addMinutes, differenceInMinutes, format } from "date-fns";
import { TripDirection } from "../components/HomeScreenBody";
import { TableRow } from "../components/Table/TableTypes";
import useGetDrivers from "./data/useGetDrivers";
import useGetServices from "./data/useGetServices";
import useGetShuttleDetailsPerRequest from "./data/useGetShuttleDetailsPerRequest ";
import useGetShuttleRequests from "./data/useGetShuttleRequests";
import useGetShuttles from "./data/useGetShuttles";
import useGetStations from "./data/useGetStations";

const useGetTableData = (tripDirection: TripDirection) => {
  const shuttles = useGetShuttles();
  const shuttleRequests = useGetShuttleRequests();
  const shuttleDetailsPerRequest = useGetShuttleDetailsPerRequest();
  const stations = useGetStations();
  const services = useGetServices();
  const drivers = useGetDrivers();

  const data =
    shuttleDetailsPerRequest?.map((requestDetails, index) => {

      const shuttle = shuttles?.find((shut) => shut?.RequestsId?.results.includes(requestDetails?.ID));
      const request = shuttleRequests?.find((req) => req.ID === requestDetails.RequestId);
      const station = stations?.find((station) => station.ID === request?.StationId);
      const driver = drivers?.find(driver => driver.ID === requestDetails.DriverId)
      const requestedServices = request?.RequestedServicesId?.results
        .map((serviceId) => services?.find((service) => service.ID === serviceId))
        .filter((service) => service !== undefined)
      const requestedServicesTitles = requestedServices?.map(service => service?.Title);
      const servicesDuration = requestedServices?.reduce((total, service) => total + (service?.Time || 0), 0) || 0;

      console.log(station?.Title, "station");

      const basicPassangerData = {
        id: request?.ID || index + 1,
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

      const estimatedArrival = shuttle?.ArrivalTime ?? new Date();
      const desiredArrival = requestDetails.ArrivalTime ?? new Date();
      const finishTime = requestDetails.FinishTime || new Date();
      const inboundTime = requestDetails.FinishTime || new Date();

      const directionPassangerData = tripDirection === "outbound" ? {
        pickupTime: format(requestDetails.PickupTime, 'HH:mm'),
        estimatedArrival: format(estimatedArrival, 'HH:mm'),
        desiredArrival: format(desiredArrival, 'HH:mm'),
        outboundGap: differenceInMinutes(estimatedArrival, desiredArrival),
      } : {
        estimatedFinish: format(addMinutes(estimatedArrival, servicesDuration), 'HH:mm'),
        finishTime: format(finishTime, 'HH:mm'),
        inboundTime: format(inboundTime, 'HH:mm'),
        inboundGap: differenceInMinutes(inboundTime, finishTime),
      }

      const passangerData: TableRow = { ...basicPassangerData, ...directionPassangerData };

      return passangerData;
    })

  return data || [];
};

export default useGetTableData;
