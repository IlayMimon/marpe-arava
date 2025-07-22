import { CreateShuttlesParams, Route, Service, ShuttleRequest, Station } from './types/createSuttlesType';
import buildExpandedShuttleRequests from './mapShuttleRequests/buildExpandedShuttleRequests';
import groupShuttleRequestsByArea from './groupsByAreaAndArrival/groupsByAreaAndArrival';
import assignHayoonRequestsToShuttleGroups from './addHayoon/addHayoon';
import splitOverflowedShuttleGroups from './splitOverFlowedShuttles/splitOverflowedShuttleGroups';
import enrichShuttleGroups from './addAdditionalParams/enrichShuttleGroups';
import calculateShuttleStationsTimes from './addStations/addStations';
import { useQueryFetchRequest } from '../hooks/useQueryFetch';
import { SharepointQueryResultArray } from '../types/spFetchTypes';
import { SPRoute, SPService, SPShuttleRequest, SPStation } from './types/spFetchTypes';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import Status from '../types/Status';

const useCreateShuttles = (setStatus: React.Dispatch<React.SetStateAction<Status | null>>): { createShuttles: () => void; isLoading: boolean; isError: boolean } => {
  const tomorrow = dayjs().add(1, 'day').startOf('day');
  const dayAfterTomorrow = tomorrow.add(1, 'day');

  const isoTomorrow = tomorrow.toISOString();
  const isoDayAfter = dayAfterTomorrow.toISOString();

  const {
    data: shuttleRequestsData,
    isLoading: shuttleRequestsIsLoading,
    isError: shuttleRequestsIsError,
  } = useQueryFetchRequest<SharepointQueryResultArray<SPShuttleRequest>>(
    `/_api/web/lists/getbytitle('ShuttleRequests')/items?$filter=Time ge datetime'${isoTomorrow}' and Time lt datetime'${isoDayAfter}'`
  );

  const {
    data: servicesData,
    isLoading: servicesIsLoading,
    isError: servicesIsError,
  } = useQueryFetchRequest<SharepointQueryResultArray<SPService>>("/_api/web/lists/getbytitle('Services')/items");

  const {
    data: stationsData,
    isLoading: stationsIsLoading,
    isError: stationsIsError,
  } = useQueryFetchRequest<SharepointQueryResultArray<SPStation>>("/_api/web/lists/getbytitle('Stations')/items");

  const {
    data: routesData,
    isLoading: routesIsLoading,
    isError: routesIsError,
  } = useQueryFetchRequest<SharepointQueryResultArray<SPRoute>>("/_api/web/lists/getbytitle('Routes')/items");

  const shuttleRequests = shuttleRequestsData?.d.results.map(
    (item): ShuttleRequest => ({
      id: item.Id,
      requestedService: item.RequestedServicesId || [],
      isReturnShuttleRequired: item.IsReturnShuttleRequired || false,
      shuttleDateTime: dayjs.utc(item.Time).local(),
      stationId: item.StationId,
      returnStationId: item.ReturnStationId,
    })
  );

  const services = servicesData?.d.results.map(
    (item): Service => ({
      id: item.Id,
      name: item.Title,
      isLatenessForbidden: item.IsLatenessForbidden,
      duration: item.Time,
    })
  );

  const stations = stationsData?.d.results.map(
    (item): Station => ({
      id: item.Id,
      title: item.Title,
      area: item.Area,
      stationOrder: item.StationOrder,
    })
  );

  const routes = routesData?.d.results.map(
    (item): Route => ({
      id: item.Id,
      sourceId: item.SourceId,
      destinationId: item.DestinationId,
      travelTime: item.TravelTime,
      distance: item.Distance,
    })
  );

  const isLoading = shuttleRequestsIsLoading || servicesIsLoading || stationsIsLoading || routesIsLoading;
  const isError = shuttleRequestsIsError || servicesIsError || stationsIsError || routesIsError;

  const createdShuttles = useMemo(() => {
    if (shuttleRequests && stations && services && routes) {
      const createShuttlesParams: CreateShuttlesParams = { shuttleRequests, stations, services, routes };

      const expandedRequests = buildExpandedShuttleRequests(createShuttlesParams);
      const groupedRequests = groupShuttleRequestsByArea(expandedRequests);
      const ShuttleGroupsWithHayoon = assignHayoonRequestsToShuttleGroups(expandedRequests, groupedRequests);
      const splitShuttleGroups = splitOverflowedShuttleGroups(ShuttleGroupsWithHayoon);
      const enrichedShuttleGroups = enrichShuttleGroups(splitShuttleGroups);
      const shuttleGroupsWithTimes = calculateShuttleStationsTimes(
        enrichedShuttleGroups,
        createShuttlesParams.stations,
        createShuttlesParams.routes
      );
      return {
        createShuttles: () =>
          shuttleGroupsWithTimes.forEach((shuttleGroup) => {
            console.log(shuttleGroup);
          }),
        isLoading,
        isError,
      };
    }
  }, [isError, isLoading, routes, services, shuttleRequests, stations]);

  return (
    createdShuttles || {
      createShuttles: () => {},
      isLoading,
      isError,
    }
  );
};
export default useCreateShuttles;
