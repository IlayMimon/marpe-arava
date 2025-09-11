import { useMemo } from "react";
import { assignedStatusEnum, patientsStatus } from "../../functions/patientsStatus";
import useGetShuttleRequests from "../../hooks/data/useGetShuttleRequests";
import useGetShuttles from "../../hooks/data/useGetShuttles";
import SummarizeNumbers from "../SummarizeNumbers";
import getMatchingKpi from "./KpiGet";


const Kpies = () => {
  const shuttleRequests = useGetShuttleRequests();
  const { shuttles } = useGetShuttles();
  const currentStations =
  shuttles &&
  new Set(
    shuttles?.map(drive => drive.Details)
      .join('\n')
      .split('\n')
      .filter(name =>  !name.includes("מרפא ערבה") && name)
      .map(name => name?.split(':')[0])
  )

  const patientStatuses = useMemo(
    () => patientsStatus({ shuttles, shuttleRequests }),
    [shuttles, shuttleRequests]
  );

  const statuses = Object.keys(assignedStatusEnum).map((assignedStatus) => {
    return {
      statusType: assignedStatus,
      value:
        patientStatuses?.filter(
          (patient) =>
            patient.status === assignedStatusEnum[assignedStatus as keyof typeof assignedStatusEnum]
        ).length || 0,
    };
  });

  return (
    <div className="kpies">
      <SummarizeNumbers totalPatients={patientStatuses?.length} totalStations={currentStations?.size} totalTrips={shuttles?.length} />
      <div className="kpies__seperator" />
      {getMatchingKpi({
        title: "טרם שובצו",
        value: statuses.find((status) => status.statusType === "initial")?.value,
        inline: false
      })}
      {getMatchingKpi({
        title: "שובצו",
        value: statuses.find((status) => status.statusType === "assigned")?.value,
        inline: false
      })}
      {getMatchingKpi({
        title: "נשלחה הודעה",
        value: 0,
        inline: false
      })}
      <div className="kpies__seperator" />
      {getMatchingKpi({
        title: "מגיעים בקרוב",
        value: statuses.find((status) => status.statusType === "arrivingSoon")?.value,
        inline: false
      })}
      {getMatchingKpi({
        title: "במרפאה",
        value: statuses.find((status) => status.statusType === "inClinic")?.value,
        inline: false
      })}
      <div className="kpies__seperator" />
      {getMatchingKpi({
        title: "מסיימים בקרוב",
        value: 0,
        inline: false
      })}
      {getMatchingKpi({
        title: "ממתינים לחזור",
        value: 0,
        inline: false
      })}
      {getMatchingKpi({
        title: "חזרו",
        value: statuses.find((status) => status.statusType === "done")?.value,
        inline: false
      })}


    </div>
  );
};

export default Kpies;