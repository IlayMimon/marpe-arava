import { ShuttleRequest } from "../hooks/data/useGetShuttleRequests";

// Finds a ShuttleRequest object by its ID.
// Used to match an ID from Shuttles.requestsId.results (number[])
// to ShuttleDetailsPerRequest.RequestId (number) and retrieve the corresponding ShuttleRequest.

const findRequestByShuttleId = (
  id: number,
  shuttleRequests: ShuttleRequest[] | undefined
): ShuttleRequest | undefined => {
  return shuttleRequests?.find((shuttleRequest) => shuttleRequest.ID === id);
};

export default findRequestByShuttleId;
