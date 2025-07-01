import { Fragment, useMemo } from "react";
import { patientsStatus } from "../functions/patientsStatus";
import useGetShuttleDetailsPerRequest from "../hooks/data/useGetShuttleDetailsPerRequest";
import useGetShuttleRequests from "../hooks/data/useGetShuttleRequests";
import useGetShuttles from "../hooks/data/useGetShuttles";
import Kpi from "./Kpi";
import SummarizeNumbers from "./SummarizeNumbers";
import { statusDetails } from "../constants/statusDetails";
import { AssignedStatusEnum } from "../types/status";

const Kpies = () => {
  const shuttleRequests = useGetShuttleRequests();
  const shuttleDetailsPerRequest = useGetShuttleDetailsPerRequest();
  const { shuttles } = useGetShuttles();

  const patientStatuses = useMemo(
    () => patientsStatus({ shuttleDetailsPerRequest, shuttles, shuttleRequests }),
    [shuttleDetailsPerRequest, shuttles, shuttleRequests]
  );

  const statuses = Object.keys(AssignedStatusEnum).map((assignedStatus) => {
    return {
      statusType: assignedStatus,
      value:
        patientStatuses?.filter(
          (patient) =>
            patient.status === statusDetails[assignedStatus as keyof typeof AssignedStatusEnum].singularTitle
        ).length || 0,
    };
  });

  return (
    <div className="kpies">
      <SummarizeNumbers totalPatients={patientStatuses?.length} totalTrips={shuttles?.length} />
      <div className="kpies__seperator" />
      {Object.values(AssignedStatusEnum).map((status, index) => {
        const statusDetail = statusDetails[status];

        if (!statusDetail) return null;

        return (
          <Fragment key={status + index}>
            <Kpi
              title={statusDetail.pluralTitle}
              value={statuses.find((s) => s.statusType === status)?.value}
              titleColor={statusDetail.titleColor}
              borderColor={statusDetail.borderColor}
            />
            {index === 2 || index === 4 ? <div className="kpies__seperator" /> : null}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Kpies;
