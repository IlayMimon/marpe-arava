import { Form, Select, DatePicker, TimePicker, Input, ConfigProvider } from "antd";
import heIL from "antd/locale/he_IL";
import FormSection from "./FormSection.tsx";

const { TextArea } = Input;

export default function AppointmentDetailsSection({
  validationMap,
  disabledDate,
  disabledTimes,
  pickupEnabled,
  appointmentOptions,
  tagRender,
}: any) {
  return (
    <FormSection title="פרטי התור">
      <Form.Item
        name="desiredDate"
        label="תאריך הגעה רצוי"
        rules={validationMap.desiredDate}
        required={false}
      >
        <ConfigProvider locale={heIL} direction="rtl">
          <DatePicker
          className="edit-field__input"
            format="DD/MM/YYYY"
            placeholder="בחר תאריך"
            disabledDate={disabledDate}
            style={{ width: "100%" }}
            inputReadOnly
          />
        </ConfigProvider>
      </Form.Item>

      <Form.Item
        name="desiredTime"
        label="שעת הגעה רצויה"
        rules={validationMap.desiredTime}
        required={false}
      >
        <TimePicker
        className="edit-field__input"
          format="HH:mm"
          needConfirm={false}
          showNow={false}
          placeholder="בחר שעת הגעה"
          style={{ width: "100%" }}
          disabledTime={disabledTimes}
          disabled={!pickupEnabled}
        />
      </Form.Item>

      <Form.Item
        name="appointmentTypes"
        label="סוג התור"
        rules={validationMap.appointmentTypes}
        required={false}
      >
        <Select
          mode="multiple"
          options={appointmentOptions.map((x: string) => ({ value: x, label: x }))}
          placeholder="בחר סוג תור"
          allowClear
          tagRender={tagRender}
        />
      </Form.Item>

      <Form.Item
        name="notes"
        label="הערות"
        rules={validationMap.notes}
        required={false}
      >
        <TextArea placeholder="הקלד הערות" autoSize={{ minRows: 1, maxRows: 2 }} maxLength={300} />
      </Form.Item>
    </FormSection>
  );
}