import { Form, Input, Select, Checkbox } from "antd";
import FormSection from "./FormSection.tsx";

export default function PatientDetailsSection({
  validationMap,
  pickupEnabled,
  dropOffCheckbox,
  setPickupEnabled,
  setDropOffCheckbox,
  onPickupChange,
  onDropOffChange,
}: any) {
  return (
    <FormSection title="פרטי החייל">
      <Form.Item
        name="fullName"
        label="שם מלא"
        rules={validationMap.fullName}
        required={false}
      >
        <Input placeholder="הקלד שם החייל" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="טלפון"
        rules={validationMap.phone}
        required={false}
      >
        <Input placeholder="הקלד מספר" type="tel" />
      </Form.Item>

      <Form.Item
        label={
          <Checkbox
            className="edit-field__checkbox"
            checked={pickupEnabled}
            onChange={(e) => setPickupEnabled(e.target.checked)}
          >
            תחנת איסוף
          </Checkbox>
        }
        name="pickupStation"
        rules={validationMap.pickupStation}
        required={false}
      >
        <Select
          options={["שגוב", "סיירים"].map((x) => ({ value: x, label: x }))}
          placeholder="בחר תחנה"
          onChange={onPickupChange}
          disabled={!pickupEnabled}
        />
      </Form.Item>

      <Form.Item
        label={
          <Checkbox
            className="edit-field__checkbox"
            checked={dropOffCheckbox}
            onChange={(e) => setDropOffCheckbox(e.target.checked)}
          >
            תחנת פיזור
          </Checkbox>
        }
        name="dropOffStation"
        rules={validationMap.dropOffStation}
        required={false}
      >
        <Select
          options={["שגוב", "סיירים"].map((x) => ({ value: x, label: x }))}
          placeholder="בחר תחנה"
          disabled={!dropOffCheckbox}
          onChange={onDropOffChange}
        />
      </Form.Item>
    </FormSection>
  );
}
