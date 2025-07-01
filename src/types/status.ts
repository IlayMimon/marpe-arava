export enum AssignedStatusEnum {
    initial = "initial",
    assigned = "assigned",
    messageSent = "messageSent",
    arrivingSoon = "arrivingSoon",
    inClinic = "inClinic",
    finishingSoon = "finishingSoon",
    waitingToReturn = "waitingToReturn",
    done = "done",
}

export type StatusDetails = {
    singularTitle: string;
    pluralTitle: string;
    titleColor: string;
    borderColor: string;
};

export interface IPatientStatus {
  patientId: number;
  status: string;
}