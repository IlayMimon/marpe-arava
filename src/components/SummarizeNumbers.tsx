import Kpi from "./Kpi";
import { IconRoute } from "@tabler/icons-react";
import { IconBusStop } from "@tabler/icons-react";
import { IconUsersGroup } from "@tabler/icons-react";

const SummarizeNumbers = () => {
  return (
    <div className="summarize-numbers">
      <Kpi title={`סה"כ מטופלים`} value={10} icon={<IconUsersGroup />} />
      <Kpi title={`סה"כ תחנות`} value={2} icon={<IconBusStop />} />
      <Kpi title={`סה"כ נסיעות`} value={999} icon={<IconRoute />} />
    </div>
  );
};

export default SummarizeNumbers;
