import { useMemo } from "react";
import { assignedStatusEnum, patientsStatus } from "../functions/patientsStatus";
import useGetShuttleDetailsPerRequest from "../hooks/data/useGetShuttleDetailsPerRequest";
import useGetShuttleRequests from "../hooks/data/useGetShuttleRequests";
import useGetShuttles from "../hooks/data/useGetShuttles";
import Kpi from "./Kpi";
import SummarizeNumbers from "./SummarizeNumbers";

export const getMatchingKpi = (title: string, value: string | number | undefined) => {
  switch (title) {
    case "טרם שובצו":
      return <Kpi
        title="טרם שובצו"
        value={value}
        titleColor="--Colors-orange-6"
        borderColor="--Colors-orange-3"
      />
    case "טרם שובץ":
      return <Kpi
        title="טרם שובץ"
        value={value}
        titleColor="--Colors-orange-6"
        borderColor="--Colors-orange-3"
      />
    case "שובצו":
      return <Kpi
        title="שובצו"
        value={value}
        titleColor="--Colors-purple-6"
        borderColor="--Colors-purple-3"
      />
    case "שובץ":
      return <Kpi
        title="שובץ"
        value={value}
        titleColor="--Colors-purple-6"
        borderColor="--Colors-purple-3"
      />
    case "נשלחה הודעה":
      return <Kpi
        title="נשלחה הודעה"
        value={0}
        titleColor="--Colors-green-6"
        borderColor="--Colors-green-3"
      />
    case "מגיעים בקרוב":
      return <Kpi
        title="מגיעים בקרוב"
        value={value}
        titleColor="--Colors-cyan-6"
        borderColor="--Colors-cyan-3"
      />
    case "מגיע בקרוב":
      return <Kpi
        title="מגיע בקרוב"
        value={value}
        titleColor="--Colors-cyan-6"
        borderColor="--Colors-cyan-3"
      />
    case "במרפאה":
      return <Kpi
        title="במרפאה"
        value={value}
        titleColor="--Colors-green-6"
        borderColor="--Colors-green-3"
      />
    case "מסיימים בקרוב":
      return <Kpi
        title="מסיימים בקרוב"
        value={0}
        titleColor="--Colors-geekblue-6"
        borderColor="--Colors-geekblue-3"
      />
      case "מסיים בקרוב":
        return <Kpi
          title="מסיים בקרוב"
          value={0}
          titleColor="--Colors-geekblue-6"
          borderColor="--Colors-geekblue-3"
        />
    case "ממתינים לחזור":
      return <Kpi
        title="ממתינים לחזור"
        value={0}
        titleColor="--Colors-orange-6"
        borderColor="--Colors-orange-3"
      />
      case "ממתין לחזור":
        return <Kpi
          title="ממתין לחזור"
          value={0}
          titleColor="--Colors-orange-6"
          borderColor="--Colors-orange-3"
        />
    case "חזרו":
      return <Kpi
        title="חזרו"
        value={value}
        titleColor="--Colors-green-6"
        borderColor="--Colors-green-3"
      />
      case "חזר":
        return <Kpi
          title="חזר"
          value={value}
          titleColor="--Colors-green-6"
          borderColor="--Colors-green-3"
        />
    default:
      return ""
  }
}

const Kpies = () => {
  const shuttleRequests = useGetShuttleRequests();
  const shuttleDetailsPerRequest = useGetShuttleDetailsPerRequest();
  const { shuttles } = useGetShuttles();

  const patientStatuses = useMemo(
    () => patientsStatus({ shuttleDetailsPerRequest, shuttles, shuttleRequests }),
    [shuttleDetailsPerRequest, shuttles, shuttleRequests]
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
      <SummarizeNumbers totalPatients={patientStatuses?.length} totalTrips={shuttles?.length} />
      <div className="kpies__seperator" />
      {getMatchingKpi("טרם שובצו", statuses.find((status) => status.statusType === "initial")?.value)}
      {getMatchingKpi("שובצו", statuses.find((status) => status.statusType === "assigned")?.value)}
      {getMatchingKpi("נשלחה הודעה", 0)}
      <div className="kpies__seperator" />
      {getMatchingKpi("מגיעים בקרוב", statuses.find((status) => status.statusType === "arrivingSoon")?.value)}
      {getMatchingKpi("במרפאה", statuses.find((status) => status.statusType === "inClinic")?.value)}
      <div className="kpies__seperator" />
      {getMatchingKpi("מסיימים בקרוב", 0)}
      {getMatchingKpi("ממתינים לחזור", 0)}
      {getMatchingKpi("חזרו", statuses.find((status) => status.statusType === "done")?.value)}

    </div>
  );
};

export default Kpies;
