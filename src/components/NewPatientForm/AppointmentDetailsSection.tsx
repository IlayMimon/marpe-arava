import { Rule } from "antd/es/form/index";
import { useAppointmentDetailsLogic } from "../../hooks/useAppointmentDetailsLogic.tsx";
import { FormErrors, PatientFormData } from "../../types/PatientForm.types.ts";
import EditField from "../EditField/EditField.tsx";
import FormSection from "./FormSection.tsx";
import dayjs from "dayjs";
import { FormInstance } from "antd/lib/index";
import { Form } from "antd";

interface Props {
  formData: FormInstance<PatientFormData>;
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
  const desiredDate = Form.useWatch("desiredDate", formData);
  const desiredTime = Form.useWatch("desiredTime", formData);
  const notes = Form.useWatch("notes", formData);
  const appointmentTypes = Form.useWatch("appointmentTypes", formData);
  const { appointmentOptions, tagRender, disabledTimes } =
    useAppointmentDetailsLogic(desiredDate, appointmentTypes);

  return (
    <FormSection title="פרטי התור">
      <EditField
      name="desiredDate"
        title="תאריך הגעה רצוי"
        type="date"
        hint="בחר תאריך"
        showCheckbox={false}
        value={desiredDate}
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
        value={desiredTime}
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
        value={appointmentTypes}
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
        value={notes}
        onTextChange={onChange("notes")}
        error={errors.notes}
        rules={validationMap.notes}
      />
    </FormSection>
  );
}
