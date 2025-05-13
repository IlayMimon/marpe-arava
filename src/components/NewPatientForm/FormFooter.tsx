import { Button } from "antd";

export default function FormFooter({ handleClearAll }: { handleClearAll: () => void }) {
  return (
    <div className="patient-form__footer">
      <Button onClick={handleClearAll}>נקה טופס</Button>
      <Button type="primary" htmlType="submit">
        הוסף מטופל
      </Button>
    </div>
  );
}
