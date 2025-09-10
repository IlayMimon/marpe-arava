import { ShuttleRequest } from "../hooks/data/useGetShuttleRequests";
import { Shuttle } from "../hooks/data/useGetShuttles";

export enum assignedStatusEnum {
  "initial" = "טרם שובץ",
  "assigned" = "שובץ",
  "arrivingSoon" = "מגיע בקרוב",
  "inClinic" = "במרפאה",
  "done" = "חזר",
}

interface IPatientStatus {
  patientId: number;
  status: assignedStatusEnum;
}

interface IUseGetPatientsStatusParams {
  shuttleRequests: ShuttleRequest[] | undefined;
  shuttles: Shuttle[] | undefined;
}

export const patientsStatus = ({
  shuttleRequests,
  shuttles,
}: IUseGetPatientsStatusParams): IPatientStatus[] | undefined => {
  const now = new Date();

  const shuttleDetailsIdToShuttle = new Map<number, Shuttle>();
  if (!shuttles) {
    return;
  }

  shuttles.forEach((shuttle) => {
    shuttle.RequestsId.results.forEach((requestId) => {
      shuttleDetailsIdToShuttle.set(requestId, shuttle);
    });
  });

  return shuttleRequests?.map((request) => {
    const shuttle = request.ID ? shuttleDetailsIdToShuttle.get(request.ID) : undefined;

    if (!shuttle) return { patientId: request.ID, status: assignedStatusEnum.initial };

    const arrivalTime = new Date(shuttle.ArrivalTime);
    const timeToArrival = (arrivalTime.getTime() - now.getTime()) / 60000;
    const timeSinceArrival = (now.getTime() - arrivalTime.getTime()) / 60000;

    let status: assignedStatusEnum = assignedStatusEnum.assigned;

    if (timeToArrival <= 30 && timeToArrival > 0) status = assignedStatusEnum.arrivingSoon;
    if (timeSinceArrival >= 0) status = assignedStatusEnum.inClinic;
    if (timeSinceArrival >= 30) status = assignedStatusEnum.done;

    return { patientId: request.ID, status };
  });
};
