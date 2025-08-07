import dayjs from 'dayjs';
import { useMemo } from 'react';
import resetShuttles from '../functions/resetShuttles';
import { useGetTomorrowShuttles } from '../functions/useGetTomorrowShuttles';
import useGetTomorrowShuttleDetailsPerRequest from '../hooks/data/useGetTomorrowShuttlesDetailsPerRequest';
import { useQueryFetchRequest } from '../hooks/useQueryFetch';
import { SharepointQueryResultArray } from '../types/spFetchTypes';
import enrichShuttleGroups from './addAdditionalParams/enrichShuttleGroups';
import assignHayoonRequestsToShuttleGroups from './addHayoon/addHayoon';
import calculateShuttleStationsTimes from './addStations/addStations';
import { creatSPItems } from './createSPItems/createSPItems';
import groupShuttleRequestsByArea from './groupsByAreaAndArrival/groupsByAreaAndArrival';
import buildExpandedShuttleRequests from './mapShuttleRequests/buildExpandedShuttleRequests';
import splitOverflowedShuttleGroups from './splitOverFlowedShuttles/splitOverflowedShuttleGroups';
import { CreateShuttlesParams, Route, Service, Station } from './types/createSuttlesType';
import { SPRoute, SPService, SPShuttleRequest, SPStation } from './types/spFetchTypes';

const useCreateShuttles = (): { createShuttles: () => void } => {
  const { shuttles } = useGetTomorrowShuttles();
  const shuttlesDetailsPerRequest = useGetTomorrowShuttleDetailsPerRequest();

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
    (item): SPShuttleRequest => ({
      Id: item.Id,
      Time: dayjs.utc(item.Time).local(),
      StationId: item.StationId,
      Phone: item.Phone,
      IsReturnShuttleRequired: item.IsReturnShuttleRequired || false,
      RequestedServicesId: item.RequestedServicesId || [],
      ReturnStationId: item.ReturnStationId,
      FullName: item.FullName,
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
      const shuttleGroupsWithTimes = calculateShuttleStationsTimes( enrichedShuttleGroups, createShuttlesParams.stations, createShuttlesParams.routes);

      return {
        createShuttles: async () => {
          await resetShuttles(shuttles, shuttlesDetailsPerRequest);
          await creatSPItems(shuttleGroupsWithTimes);
        },
        // isLoading,
        // isError,
      };
    }
  }, [isError, isLoading, routes, services, shuttleRequests, stations]);

  return (
    createdShuttles || {
      createShuttles: () => {},
      // isLoading,
      // isError,
    }
  );
};
export default useCreateShuttles;
