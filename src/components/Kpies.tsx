import Kpi from "./Kpi";
import SummarizeNumbers from "./SummarizeNumbers";

const Kpies = () => {
  return (
    <div className="kpies">
      <SummarizeNumbers />
      <div className="kpies__seperator" />
      <Kpi title="טרם שובצו" value={0} titleColor="--Colors-orange-6" borderColor="--Colors-orange-3" />
      <Kpi title="שובצו" value={0} titleColor="--Colors-purple-6" borderColor="--Colors-purple-3" />
      <Kpi title="נשלחה הודעה" value={0} titleColor="--Colors-green-6" borderColor="--Colors-green-3" />
      <div className="kpies__seperator" />
      <Kpi title="מגיעים בקרוב" value={99} titleColor="--Colors-cyan-6" borderColor="--Colors-cyan-3" />
      <Kpi title="במרפאה" value={0} titleColor="--Colors-green-6" borderColor="--Colors-green-3" />
      <div className="kpies__seperator" />
      <Kpi title="מסיימים בקרוב" value={0} titleColor="--Colors-geekblue-6" borderColor="--Colors-geekblue-3" />
      <Kpi title="ממתינים לחזור" value={0} titleColor="--Colors-orange-6" borderColor="--Colors-orange-3" />
      <Kpi title="חזרו" value={0} titleColor="--Colors-green-6" borderColor="--Colors-green-3" />
    </div>
  );
};

export default Kpies;
