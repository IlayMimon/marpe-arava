import dayjs from "dayjs";
import { TableRow } from "../components/Table/TableTypes";
import useGetDrivers from "./data/useGetDrivers";
import useGetServices from "./data/useGetServices";
import useGetShuttleRequests from "./data/useGetShuttleRequests";
import useGetShuttles from "./data/useGetShuttles";
import useGetStations from "./data/useGetStations";
import { assignedStatusEnum, patientsStatus } from "../functions/patientsStatus";
import filterDataBySearch from "../functions/filterDataBySearch";

const useGetTableData = (searchFilter: string, tripDirection:string): TableRow[] => {
  const { shuttles } = useGetShuttles();
  const shuttleRequests = useGetShuttleRequests();
  const stations = useGetStations();
  const services = useGetServices();
  const drivers = useGetDrivers();
  const patientsStatuses = patientsStatus({ shuttleRequests, shuttles });

  const data =
    shuttleRequests?.map((request) => {

      const shuttle = shuttles?.find((shuttle) =>
        request ? shuttle?.RequestsId?.results.includes(request.ID) : false
      );
      const pickupStation = stations?.find((station) => station.ID === request.StationId);
      const dropoffStation = stations?.find((station) => station.ID === request.ReturnStationId);
      const driver =
        shuttles?.find((shuttle) =>
          request?.ID ? shuttle.RequestsId.results.includes(request.ID) : false
        )?.Driver.Title || "";
      const returnDriver = drivers?.find((driver) => driver.ID === request?.ReturnDriverId);
      const requestedServices =
        request.RequestedServicesId?.results
          .map((serviceId) => services?.find((service) => service.ID === serviceId))
          .filter((service): service is NonNullable<typeof service> => service !== undefined) || [];
      const requestedServicesTitles = requestedServices.map((service) => service.Title);
      const servicesDuration = requestedServices.reduce((sum, s) => sum + (s.Time || 0), 0);
      const status = patientsStatuses?.find((s) => s.patientId === request.ID);

      const basicPassangerData = {
        id: request.ID,
        requestDetailsId: request?.ID || 0,
        shuttleId: shuttle?.ID || 0,
        fullName: request.FullName || "",
        status: status?.status || assignedStatusEnum.initial,
        appointmentType: requestedServicesTitles,
        phone: (request?.Phone || "").replace(/-/g, ""),
        rideId: shuttle?.ID || "",
        station: pickupStation?.Title || "",
        returnStation: dropoffStation?.Title || "",
        area: pickupStation?.Area || "",
        returnArea: dropoffStation?.Area || "",
        driver: driver || "",
        returnDriver: returnDriver?.Title || "",
        notes: request.notes || "",
        actions: "actions",
      };

      const estimatedArrival = shuttle?.ArrivalTime
        ? dayjs(shuttle?.ArrivalTime)
        : undefined;
      const desiredArrival = dayjs(request?.Time);
      const finishTime = request?.FinishTime ? dayjs(request?.FinishTime) : undefined;
      const inboundTime = request?.InboundTime
        ? dayjs(request?.InboundTime)
        : undefined;

      const directionPassangerData = {
        pickupTime: request?.PickupTime ? dayjs(request?.PickupTime) : undefined,
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

    const filteredData = searchFilter ? filterDataBySearch(searchFilter, data, tripDirection as "outbound" | "inbound") : data;

  return filteredData;
};

export default useGetTableData;
