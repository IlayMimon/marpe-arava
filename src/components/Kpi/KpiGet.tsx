import Kpi from "./Kpi"

interface IGetMatchingKpi {
  title: string,
  value: string | number | undefined,
  inline: boolean,
}
const getMatchingKpi = ({ title, value, inline }: IGetMatchingKpi) => {
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

export default getMatchingKpi