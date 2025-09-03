import { useMemo } from "react";
import { assignedStatusEnum, patientsStatus } from "../functions/patientsStatus";
import useGetShuttleDetailsPerRequest from "../hooks/data/useGetShuttleDetailsPerRequest";
import useGetShuttleRequests from "../hooks/data/useGetShuttleRequests";
import useGetShuttles from "../hooks/data/useGetShuttles";
import Kpi from "./Kpi";
import SummarizeNumbers from "./SummarizeNumbers";

interface IGetMatchingKpi {
  title: string,
  value: string | number | undefined,
  inline: boolean,
}
export const getMatchingKpi = ({ title, value, inline }: IGetMatchingKpi) => {
  switch (title) {
    case "טרם שובצו":
    case "טרם שובץ":
    case "ממתינים לחזור":
    case "ממתין לחזור":
      return <Kpi
        title={title}
        value={value}
        titleColor="--Colors-orange-6"
        borderColor="--Colors-orange-3"
        inline={inline}
      />

    case "שובצו":
    case "שובץ":
      return <Kpi
        title={title}
        value={value}
        titleColor="--Colors-purple-6"
        borderColor="--Colors-purple-3"
        inline={inline}
      />

    case "נשלחה הודעה":
    case "במרפאה":
    case "חזרו":
    case "חזר":
      return <Kpi
        title={title}
        value={value}
        titleColor="--Colors-green-6"
        borderColor="--Colors-green-3"
        inline={inline}
      />

    case "מגיעים בקרוב":
    case "מגיע בקרוב":
      return <Kpi
        title={title}
        value={value}
        titleColor="--Colors-cyan-6"
        borderColor="--Colors-cyan-3"
        inline={inline}
      />

    case "מסיימים בקרוב":
    case "מסיים בקרוב":
      return <Kpi
        title={title}
        value={value}
        titleColor="--Colors-geekblue-6"
        borderColor="--Colors-geekblue-3"
        inline={inline}
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
