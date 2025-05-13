import { useState } from "react";
import { Form, Tooltip } from "antd";
import dayjs from "dayjs";
import { PatientFormData } from "../types/PatientForm.types";
import { Rule } from "antd/es/form";
import { CustomTagProps } from "rc-select/lib/BaseSelect";

export const usePatientForm = (
  closeModal?: () => void,
  onSubmitCallback?: (formData: PatientFormData) => void
) => {
  const [form] = Form.useForm<PatientFormData>();

  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [dropOffTouched, setDropOffTouched] = useState(false);
  const [dropOffCheckbox, setDropOffCheckbox] = useState(false);

  const appointmentOptions = [
    "בדיקות מעבדה",
    "בית מרקחת",
    'קב"ן',
    "רופא מומחה - אורתופד",
    "רופא מומחה - אף אוזן גרון",
  ];

  const validationMap: { [K in keyof PatientFormData]: Rule[] } = {
    fullName: [
      { required: true, message: "שדה חובה" },
      { max: 20, message: "שם המטופל לא יכול להכיל יותר מ-20 תווים" },
    ],
    phone: [
      { required: true, message: "מספר טלפון הוא שדה חובה" },
      { pattern: /^\d+$/, message: "מספר טלפון יכול להכיל ספרות בלבד" },
      {
        validator: () => {
          const phone = form.getFieldValue("phone");
          if (!phone || phone.startsWith("05")) return Promise.resolve();
          return Promise.reject("מספר טלפון חייב להתחיל ב-05");
        },
      },
      {
        validator: () => {
          const phone = form.getFieldValue("phone");
          if (!phone || phone.length === 10) return Promise.resolve();
          return Promise.reject("מספר טלפון חייב להיות באורך של 10 ספרות");
        },
      },
    ],
    pickupStation: [{ required: pickupEnabled, message: "שדה חובה" }],
    dropOffStation: [{ required: dropOffCheckbox, message: "שדה חובה" }],
    desiredDate: [
      { required: true, message: "שדה חובה" },
      {
        validator: (_, value) => {
          const selectedDate = dayjs(value, "DD/MM/YYYY");
          const now = dayjs();
          if (!selectedDate.isValid()) return Promise.reject("תאריך לא תקין");
          if (selectedDate.isBefore(now, "day"))
            return Promise.reject("לא ניתן לבחור תאריך עבר");
          return Promise.resolve();
        },
      },
    ],
    desiredTime: [
      { required: true, message: "שדה חובה" },
      {
        validator: () => {
          const time = form.getFieldValue("desiredTime");
          const date = form.getFieldValue("desiredDate");
          const selectedTime = dayjs(time, "HH:mm");
          const selectedDate = dayjs(date, "DD/MM/YYYY");
          const now = dayjs();
          if (!selectedTime.isValid()) return Promise.reject("שעה לא תקינה");
          if (
            selectedDate.isSame(now, "day") &&
            selectedTime.isBefore(now, "minute")
          ) {
            return Promise.reject("לא ניתן לבחור שעה שכבר עברה");
          }
          return Promise.resolve();
        },
      },
    ],
    appointmentTypes: [
      { required: true, message: "יש לבחור לפחות סוג תור אחד" },
    ],
    notes: [
      { max: 300, message: "ההערה ארוכה מדי (מקסימום 300 תווים)" },
    ],
  };

  const disabledDate = (current: dayjs.Dayjs) =>
    current && current < dayjs().startOf("day");

  const disabledTimes = (date: dayjs.Dayjs) => {
    const now = dayjs();
    if (!date.isSame(now, "day")) {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
      };
    }

    const currentHour = now.hour();
    const currentMinute = now.minute();

    return {
      disabledHours: () => Array.from({ length: currentHour }, (_, i) => i),
      disabledMinutes: (hour: number) =>
        hour === currentHour
          ? Array.from({ length: currentMinute }, (_, i) => i)
          : [],
    };
  };

  const getShortLabel = (label: string): string => {
    const words = label.split(" ");
    const prefix = words.slice(0, 3).join(" ");
    const similar = appointmentOptions.filter(
      (l) => l !== label && l.startsWith(prefix)
    );

    let short = label;
    if (similar.length > 0) {
      const rest = label.replace(prefix, "").trim();
      const restWords = rest.split(" ");
      short = restWords.slice(0, 3).join(" ") + (restWords.length > 3 ? "..." : "");
    } else {
      short = prefix + (words.length > 3 ? "..." : "");
    }

    return short;
  };

  const tagRender = ({ label, value }: CustomTagProps) => {
    const isLast = appointmentOptions[appointmentOptions.length - 1] === value;

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

  const onPickupChange = (val: string) => {
    form.setFieldValue("pickupStation", val);
    if (!dropOffTouched) {
      form.setFieldValue("dropOffStation", val);
    }
  };

  const onDropOffChange = () => {
    setDropOffTouched(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmitCallback?.(values);
      closeModal?.();
    } catch {}
  };

  const handleClearAll = () => {
    form.resetFields();
    setDropOffTouched(false);
    setDropOffCheckbox(false);
    setPickupEnabled(true);
  };

  return {
    form,
    validationMap,
    pickupEnabled,
    dropOffCheckbox,
    dropOffTouched,
    setPickupEnabled,
    setDropOffCheckbox,
    setDropOffTouched,
    appointmentOptions,
    disabledDate,
    disabledTimes,
    getShortLabel,
    tagRender,
    onPickupChange,
    onDropOffChange,
    handleSubmit,
    handleClearAll,
  };
};
