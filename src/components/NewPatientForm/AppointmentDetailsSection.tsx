import { Rule } from "antd/es/form/index";
import { useAppointmentDetailsLogic } from "../../hooks/useAppointmentDetailsLogic.tsx";
import { FormErrors, PatientFormData } from "../../types/PatientForm.types.ts";
import EditField from "../EditField/EditField.tsx";
import FormSection from "./FormSection.tsx";
import dayjs from "dayjs";

interface Props {
  formData: PatientFormData;
  errors: FormErrors;
  onChange: (key: keyof PatientFormData) => (val: string | string[]) => void;
  isPickupDisabled: boolean;
  validationMap: Record<keyof PatientFormData, Rule[]>;
}

export default function AppointmentDetailsSection({
  formData,
  errors,
  onChange,
  isPickupDisabled,
  validationMap,
}: Props) {
  const { appointmentOptions, tagRender, disabledTimes } =
    useAppointmentDetailsLogic(formData.desiredDate, formData.appointmentTypes);

  return (
    <FormSection title="פרטי התור">
      <EditField
      name="desiredDate"
        title="תאריך הגעה רצוי"
        type="date"
        hint="בחר תאריך"
        showCheckbox={false}
        value={formData.desiredDate}
        onTextChange={onChange("desiredDate")}
        error={errors.desiredDate}
        disabledDate={(current) => current && current < dayjs().startOf("day")}
        rules={validationMap.desiredDate}
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
        rules={{...validationMap.desiredTime}}
      />
      <EditField
      name="appointmentTypes"
        title="סוג התור"
        multiSelect
        showCheckbox={false}
        options={appointmentOptions}
        hint="בחר סוג תור"
        value={formData.appointmentTypes}
        onTextChange={onChange("appointmentTypes")}
        error={errors.appointmentTypes}
        tagRender={tagRender}
        rules={validationMap.appointmentTypes}
      />
      <EditField
      name="notes"
        title="הערות"
        type="textarea"
        hint="הקלד הערות"
        value={formData.notes}
        onTextChange={onChange("notes")}
        error={errors.notes}
        rules={validationMap.notes}
      />
    </FormSection>
  );
}
