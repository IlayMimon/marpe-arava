import dayjs from "dayjs";
import { TableRow } from "../components/Table/TableTypes";
import useGetDrivers from "./data/useGetDrivers";
import useGetServices from "./data/useGetServices";
import useGetShuttleDetailsPerRequest from "./data/useGetShuttleDetailsPerRequest";
import useGetShuttleRequests from "./data/useGetShuttleRequests";
import useGetShuttles from "./data/useGetShuttles";
import useGetStations from "./data/useGetStations";
import { assignedStatusEnum, patientsStatus } from "../functions/patientsStatus";

const useGetTableData = () => {
  const { shuttles } = useGetShuttles();
  const shuttleRequests = useGetShuttleRequests();
  const shuttleDetailsPerRequest = useGetShuttleDetailsPerRequest();
  const stations = useGetStations();
  const services = useGetServices();
  const drivers = useGetDrivers();
  const patientsStatuses = patientsStatus({ shuttleDetailsPerRequest, shuttleRequests, shuttles });

  const data =
    shuttleRequests?.map((request) => {
      const requestDetails = shuttleDetailsPerRequest?.find(
        (detail) => detail.RequestId === request.ID
      );

      const shuttle = shuttles?.find((shuttle) =>
        requestDetails ? shuttle?.RequestsId?.results.includes(requestDetails.ID) : false
      );
      const pickupStation = stations?.find((station) => station.ID === request.StationId);
      const dropoffStation = stations?.find((station) => station.ID === request.ReturnStationId);
      const driver =
        shuttles?.find((shuttle) =>
          requestDetails?.ID ? shuttle.RequestsId.results.includes(requestDetails.ID) : false
        )?.Driver.Title || "";
      const returnDriver = drivers?.find((driver) => driver.ID === requestDetails?.ReturnDriverId);
      const requestedServices =
        request.RequestedServicesId?.results
          .map((serviceId) => services?.find((service) => service.ID === serviceId))
          .filter((service): service is NonNullable<typeof service> => service !== undefined) || [];
      const requestedServicesTitles = requestedServices.map((service) => service.Title);
      const servicesDuration = requestedServices.reduce((sum, s) => sum + (s.Time || 0), 0);
      const status = patientsStatuses?.find((s) => s.patientId === request.ID);

      const basicPassangerData = {
        id: request.ID,
        requestDetailsId: requestDetails?.ID || 0,
        shuttleId: shuttle?.ID || 0,
        fullName: request.FullName || "",
        status: status?.status || assignedStatusEnum.initial,
        appointmentType: requestedServicesTitles,
        phone: (request?.Phone || "").replace(/-/g, ""),
        rideId: shuttle?.ID || "",
        station: pickupStation?.Title || "",
        returnStation: dropoffStation?.Title || "",
        area: (pickupStation?.Area && pickupStation?.StationOrder) ? `${pickupStation?.Area}${pickupStation?.StationOrder}` : "",
        returnArea: (dropoffStation?.Area && dropoffStation?.StationOrder) ? `${dropoffStation?.Area}${dropoffStation?.StationOrder}` : "",
        driver: driver || "",
        returnDriver: returnDriver?.Title || "",
        notes: request.notes || "",
        actions: "actions",
      };

      const estimatedArrival = requestDetails?.ArrivalTime
        ? dayjs(shuttle?.ArrivalTime)
        : undefined;
      const desiredArrival = dayjs(request?.Time);
      const finishTime = requestDetails?.FinishTime ? dayjs(requestDetails?.FinishTime) : undefined;
      const inboundTime = requestDetails?.InboundTime
        ? dayjs(requestDetails?.InboundTime)
        : undefined;

      const directionPassangerData = {
        pickupTime: requestDetails?.PickupTime ? dayjs(requestDetails?.PickupTime) : undefined,
        estimatedArrival,
        desiredArrival,
        outboundGap: estimatedArrival?.diff(desiredArrival, "minute"),
        estimatedFinish: estimatedArrival?.add(servicesDuration, "minute"),
        finishTime,
        inboundTime,
        inboundGap: inboundTime?.diff(finishTime, "minute"),
      };

      const passengerData: TableRow = { ...basicPassangerData, ...directionPassangerData };

      return passengerData;
    }) || [];

  return data;
};

export default useGetTableData;
