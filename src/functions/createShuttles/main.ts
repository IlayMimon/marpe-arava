import { CreateShuttlesParams} from "./types/createSuttlesType";
import buildExpandedShuttleRequests from "./mapShuttleRequests/buildExpandedShuttleRequests";
import groupShuttleRequestsByArea from "./groupsByAreaAndArrival/groupsByAreaAndArrival";
import assignHayoonRequestsToShuttleGroups from "./addHayoon/addHayoon";
import splitOverflowedShuttleGroups from "./splitOverFlowedShuttles/splitOverflowedShuttleGroups";
import enrichShuttleGroups from "./addAdditionalParams/enrichShuttleGroups";
import calculateShuttleStationsTimes from "./addStations/addStations";
import { Status } from "../../components/types/Status";
const createShuttles = (createShuttlesParams: CreateShuttlesParams, setStatus: (status: Status) => void) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const expandedRequests = buildExpandedShuttleRequests(createShuttlesParams);
    // setStatus({ , step, isAssigned, status, Modified });
    const groupedRequests = groupShuttleRequestsByArea(expandedRequests);
    // setStatus({ isOver, step, isAssigned, status, Modified});
    const ShuttleGroupsWithHayoon = assignHayoonRequestsToShuttleGroups(expandedRequests, groupedRequests);
    const splitShuttleGroups = splitOverflowedShuttleGroups(ShuttleGroupsWithHayoon);
    const enrichedShuttleGroups = enrichShuttleGroups(splitShuttleGroups);
    const shuttleGroupsWithTimes = calculateShuttleStationsTimes(enrichedShuttleGroups, createShuttlesParams.stations, createShuttlesParams.routes);
    console.log("Shuttle Groups:", shuttleGroupsWithTimes);
    for(const group of shuttleGroupsWithTimes) {
        // console.log("Split Shuttle Groups:", group);
        console.log("Split Shuttle Groups length:", group.Stations);
}
}
export default createShuttles;