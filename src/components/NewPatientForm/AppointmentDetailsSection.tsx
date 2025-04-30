import dayjs from "dayjs";
import { Tooltip } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { FormErrors, PatientFormData } from "../../types/PatientForm.types.ts";
import EditField from "../EditField/EditField.tsx";

interface Props {
  formData: PatientFormData;
  errors: FormErrors;
  onChange: (key: keyof PatientFormData) => (val: string | string[]) => void;
  isPickupDisabled: boolean;
}

export default function AppointmentDetailsSection({
  formData,
  errors,
  onChange,
  isPickupDisabled,
}: Props) {
  const selectedDate = dayjs(formData.desiredDate, "DD/MM/YYYY");

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
    const selected = formData.appointmentTypes;
    const isLast = selected[selected.length - 1] === value;

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

  return (
    <div className="patient-form__section">
      <p className="patient-form__section-title">פרטי התור</p>
      <div className="patient-form__section-feilds">
        <EditField
          title="תאריך הגעה רצוי"
          type="date"
          hint="בחר תאריך"
          showCheckbox={false}
          value={formData.desiredDate}
          onTextChange={onChange("desiredDate")}
          error={errors.desiredDate}
          disabledDate={(current) =>
            current && current < dayjs().startOf("day")
          }
        />
        <EditField
          title="שעת הגעה רצויה"
          type="time"
          hint="בחר שעת הגעה"
          showCheckbox={false}
          forceDisable={isPickupDisabled}
          value={formData.desiredTime}
          onTextChange={onChange("desiredTime")}
          error={errors.desiredTime}
          disabledTimes={disabledTimes}
        />
        <EditField
          title="סוג התור"
          multiSelect
          showCheckbox={false}
          options={appointmentOptions}
          hint="בחר סוג תור"
          value={formData.appointmentTypes}
          onTextChange={onChange("appointmentTypes")}
          error={errors.appointmentTypes}
          tagRender={tagRender}
        />
        <EditField
          title="הערות"
          type="textarea"
          hint="הקלד הערות"
          value={formData.notes}
          onTextChange={onChange("notes")}
          error={errors.notes}
        />
      </div>
    </div>
  );
}
