import useGetTomorrowShuttleDetailsPerRequest from "../hooks/data/useGetTomorrowShuttlesDetailsPerRequest";
import { getShuttles } from "./getSuttles";
import { removeItemFromLsit } from "./postToSharepoint";

const resetShuttles = () => {
    console.log("a")
    const result = getShuttles();
    console.log("a")
    const shuttles = result?.shuttles || [];
    console.log("a")

    const shuttlesDetailsPerRequest = useGetTomorrowShuttleDetailsPerRequest() || [];

    console.log("a")
    for (const shuttle of shuttles) {
        removeItemFromLsit('Shuttles', shuttle.Id, '*');
    }
    console.log("b")
    for (const DetailsPerRequest of shuttlesDetailsPerRequest) {
        removeItemFromLsit('ShuttleDetailsPerRequest', DetailsPerRequest.ID, '*');
    }
    console.log("c")
}

export default resetShuttles;