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
}

export default function AppointmentDetailsSection({
  formData,
  errors,
  onChange,
  isPickupDisabled,
}: Props) {
  const { appointmentOptions, tagRender, disabledTimes } = useAppointmentDetailsLogic(
    formData.desiredDate,
    formData.appointmentTypes
  );

  return (
    <FormSection title="פרטי התור">
      <EditField
        title="תאריך הגעה רצוי"
        type="date"
        hint="בחר תאריך"
        showCheckbox={false}
        value={formData.desiredDate}
        onTextChange={onChange("desiredDate")}
        error={errors.desiredDate}
        disabledDate={(current) => current && current < dayjs().startOf("day")}
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
    </FormSection>
  );
}