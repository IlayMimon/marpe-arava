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

  const data = shuttleRequests?.map((request) => {
    const requestDetails = shuttleDetailsPerRequest?.find(
      (detail) => detail.RequestId === request.ID
    );

    const shuttle = shuttles?.find((shuttle) =>
      requestDetails ? shuttle?.RequestsId?.results.includes(requestDetails.ID) : false
    );
    const pickupStation = stations?.find((station) => station.ID === request.StationId);
    const dropoffStation = stations?.find((station) => station.ID === request.ReturnStationId);
    const driver = drivers?.find((driver) => driver.ID === requestDetails?.DriverId);
    const returnDriver = drivers?.find((driver) => driver.ID === requestDetails?.ReturnDriverId);
    const requestedServices = request.RequestedServicesId?.results
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
      phone: request.Phone || "",
      appointmentType: requestedServicesTitles,
      rideId: shuttle?.ID || "",
      station: pickupStation?.Title || "",
      returnStation: dropoffStation?.Title || "",
      area: pickupStation?.Area || "",
      returnArea: dropoffStation?.Area || "",
      driver: driver?.Title || "",
      returnDriver: returnDriver?.Title || "",
      notes: request.notes || "",
      actions: "actions",
    };

    const estimatedArrival = dayjs(shuttle?.ArrivalTime || new Date());
    const desiredArrival = dayjs(request?.Time || new Date());
    const finishTime = dayjs(requestDetails?.FinishTime || new Date());
    const inboundTime = dayjs(requestDetails?.InboundTime || new Date());

    const directionPassangerData = {
      pickupTime: dayjs(requestDetails?.PickupTime || new Date()),
      estimatedArrival,
      desiredArrival,
      outboundGap: estimatedArrival.diff(desiredArrival, "minute"),
      estimatedFinish: estimatedArrival.add(servicesDuration, "minute"),
      finishTime,
      inboundTime,
      inboundGap: inboundTime.diff(finishTime, "minute"),
    };

    const passengerData: TableRow = { ...basicPassangerData, ...directionPassangerData };

    return passengerData;
  }) || [];

  return data;
};

export default useGetTableData;