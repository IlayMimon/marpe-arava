import { TripDirection } from "../components/HomeScreenBody";
import { TableRow } from "../components/Table/TableTypes";
import useGetDrivers from "./data/useGetDrivers";
import useGetServices from "./data/useGetServices";
import useGetShuttleDetailsPerRequest from "./data/useGetShuttleDetailsPerRequest ";
import useGetShuttleRequests from "./data/useGetShuttleRequests";
import useGetShuttles from "./data/useGetShuttles";
import useGetStations from "./data/useGetStations";

const useGetTableData = (tripDirection: TripDirection): TableRow[] => {
  const shuttles = useGetShuttles();
  const shuttleRequests = useGetShuttleRequests();
  const shuttleDetailsPerRequest = useGetShuttleDetailsPerRequest();
  const stations = useGetStations();
  const services = useGetServices();
  const drivers = useGetDrivers();

  const data: TableRow[] | undefined =
    shuttleDetailsPerRequest?.map((requestDetails, index) => {

      const shuttle = shuttles?.find((shut) => shut?.RequestsId?.results.includes(requestDetails?.ID));
      const request = shuttleRequests?.find((req) => req.ID === requestDetails.RequestId);
      const station = stations?.find((station) => station.ID === request?.StationId);
      const driver = drivers?.find(driver => driver.ID === requestDetails.DriverId)
      const requestedServices = request?.RequestedServicesId?.results.map((serviceId) => {
        services?.find((service) => service.ID === serviceId)
      }).join(", ");

      const basicPassangerData = {
        key: request?.ID || index + 1,
        fullName: request?.FullName || "",
        status: requestDetails.DriverId ? "שובץ" : "לא שובץ",
        phone: request?.Phone || "",
        appointmentType: requestedServices || "",
        rideId: shuttle?.ID || "",
        station: station?.Title || "",
        area: station?.Area || "",
        driver: driver?.Title || "",
        notes: "",
        actions: "actions",
      };

      const estimatedArrival = shuttle?.ArrivalTime;
      const desiredArrival = requestDetails?.ArrivalTime;

      const directionPassangerData = tripDirection === "outbound" ? {
        pickupTime: requestDetails?.PickupTime || undefined,
        estimatedArrival: estimatedArrival || undefined,
        desiredArrival: desiredArrival || undefined,
        outboundGap: estimatedArrival && desiredArrival ? Math.abs(new Date(estimatedArrival).getTime() - new Date(desiredArrival).getTime()) / 60000 : undefined,
      } : {
        //estimatedFinish: details?.estimatedFinish || "",
        //finishTime: details?.finishTime || "",
        //inboundTime: details?.inboundTime || "",
        //inboundGap: details?.inboundGap || "",
      }

      const passangerData: TableRow = { ...basicPassangerData, ...directionPassangerData };

      return passangerData;
    })

  return data || [];
};

export default useGetTableData;
