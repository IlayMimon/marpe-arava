import { ShuttleDetailsPerRequest } from '../hooks/data/useGetShuttleDetailsPerRequest';
import { ShuttleRequests } from '../hooks/data/useGetShuttleRequests';

// Function to find a ShuttleRequest object by the ID that points to the ShuttleDetailsPerRequest
// Shuttles.requestsId.results: number[] (function takes one ID from here)
// -> ShuttleDetailsPerRequest.RequestId: number -> ShuttleRequest object

const findRequestByShuttleId = (
  id: number,
  shuttlesDetailsPerRequest: ShuttleDetailsPerRequest[] | undefined,
  shuttleRequests: ShuttleRequests[] | undefined
): ShuttleRequests | undefined => {
    const result = shuttleRequests?.find(
        (shuttleRequest) =>
            shuttleRequest.ID ===
        shuttlesDetailsPerRequest?.find((shuttleDetailsPerRequest) => shuttleDetailsPerRequest.ID === id)?.RequestId
    );
    return result
};

export default findRequestByShuttleId;
