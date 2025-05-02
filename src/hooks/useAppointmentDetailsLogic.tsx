import dayjs from "dayjs";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { Tooltip } from "antd";

export function useAppointmentDetailsLogic(
  desiredDate: string,
  appointmentTypes: string[]
) {
  const selectedDate = dayjs(desiredDate, "DD/MM/YYYY");

  const appointmentOptions = [
    "בדיקות מעבדה",
    "בית מרקחת",
    'קב"ן',
    "רופא מומחה - אורתופד",
    "רופא מומחה - אף אוזן גרון",
  ];

  const getShortLabel = (label: string): string => {
    const allLabels = appointmentOptions;
    const words = label.split(" ");
    const prefix = words.slice(0, 3).join(" ");

    const similar = allLabels.filter(
      (l) => l !== label && l.startsWith(prefix)
    );

    let short = label;
    if (similar.length > 0) {
      const rest = label.replace(prefix, "").trim();
      const restWords = rest.split(" ");
      const cut = restWords.slice(0, 3).join(" ");
      short = cut + (restWords.length > 3 ? "..." : "");
    } else {
      const cut = words.slice(0, 3).join(" ");
      short = cut + (words.length > 3 ? "..." : "");
    }

    return short;
  };

  const tagRender = ({ label, value }: CustomTagProps) => {
    const isLast = appointmentTypes[appointmentTypes.length - 1] === value;

    return (
      <div className="custom-tag" onMouseDown={(e) => e.preventDefault()}>
        <Tooltip title={label as string}>
          <span>
            {getShortLabel(label as string)}
            {!isLast && ", "}
          </span>
        </Tooltip>
      </div>
    );
  };

  const disabledTimes = selectedDate.isSame(dayjs(), "day")
    ? () => {
        const now = dayjs();
        const currentHour = now.hour();
        const currentMinute = now.minute();
        return {
          disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
          disabledMinutes: (selectedHour: number) =>
            selectedHour === currentHour
              ? Array.from({ length: currentMinute }, (_, i) => i)
              : [],
        };
      }
    : undefined;

  return {
    appointmentOptions,
    selectedDate,
    tagRender,
    disabledTimes,
  };
}