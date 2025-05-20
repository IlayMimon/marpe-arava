import { IconSparkles } from "@tabler/icons-react";
import {
  Button,
  ConfigProvider,
  Form,
  Modal,
  Select,
  TimePicker,
  message,
} from "antd";
import heIL from "antd/locale/he_IL";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { useEffect } from "react";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { FormValues, Props } from "../types/shuttleAssignmentProps";
import { useQueryFetchRequest } from "../../hooks/useQueryFetch";
import {SharePointResponse} from "../../components/types/SharePointResponse";
import {Shuttle} from '../../types/assignDriversTypes'
dayjs.extend(customParseFormat);
const { Option } = Select;

const ShuttleAssignmentModal: React.FC<Props> = ({
  visible,
  onCancel,
  onSubmit,
  medicName,
  setMedicName,
}) => {
  const [form] = Form.useForm();
   const { data } = useQueryFetchRequest<SharePointResponse<Shuttle>>(
            "/_api/web/lists/getbytitle('Shuttles')/items"
          );
           const shuttles = data?.d.results.map((shuttle) => {
            return {
              Id: shuttle.Id,
              StartTime: shuttle.StartTime,
              ArrivalTime: shuttle.ArrivalTime,
              totalDistance: shuttle.totalDistance,
            };
          });

          console.log("shuttles", shuttles);
  const validateTimeRange = (_: any, endTime: Dayjs) => {
    const startTime = form.getFieldValue("startTime");
    if (!startTime || !endTime) return Promise.resolve();
    const diff = endTime.diff(startTime, "hour", true);
    if (diff > 12) {
      return Promise.reject("טווח הזמן לא יכול להיות ארוך מ-12 שעות");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    form.setFieldValue("medicName", medicName);
  }, [medicName]);

  const handleValuesChange = (changedValues: FormValues) => {
    if ("medicName" in changedValues) {
      setMedicName(changedValues.medicName);
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values: FormValues) => {
        onSubmit(values);
        form.resetFields();
        
      })
      .catch(() => {
        message.error("נא למלא את כל השדות החובה כראוי");
      });
  };

  return (
    <Modal
      className="ShuttleAssignmentModal"
      title="שיבוץ נסיעות אוטומטי"
      open={visible}
      onCancel={onCancel}
      footer={
        <div className="ShuttleAssignmentModal__footer">

        <Button key="cancel" onClick={onCancel}>
          ביטול
        </Button>

        <Button
          type="primary"
          className="ShuttleAssignmentModal__assign-btn"
          onClick={handleSubmit}
        >
          <IconSparkles />
          שבץ נסיעות
        </Button>
        </div>
      }
    >
      <ConfigProvider locale={heIL} direction="rtl">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          initialValues={{ vehicleCount: 3 }}
        >
          <Form.Item
            label="שעות פעילות השאטלים"
            className="ShuttleAssignmentModal__timePicker"
            required
          >
            <div className="ShuttleAssignmentModal__timePicker__container">
              <Form.Item
                name="startTime"
                rules={[{ required: true, message: "יש לבחור שעת התחלה" }]}
                className="ShuttleAssignmentModal__timePicker__container__startTime"
              >
                <TimePicker format="HH:mm" placeholder="התחלה" />
              </Form.Item>

              <TbArrowNarrowLeft className="ShuttleAssignmentModal__timePicker__container__arrowIcon" />

              <Form.Item
                name="endTime"
                rules={[
                  { required: true, message: "יש לבחור שעת סיום" },
                  { validator: validateTimeRange },
                ]}
                className="ShuttleAssignmentModal__timePicker__container__endTime"
              >
                <TimePicker format="HH:mm" placeholder="סיום" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label="מספר נהגים"
            name="vehicleCount"
            rules={[{ required: true, message: "יש לבחור מספר רכבים" }]}
          >
            <Select>
              {[1, 2, 3, 4, 5].map((num) => (
                <Option key={num} value={num}>
                  {num}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="חובש אחראי"
            name="medicName"
            rules={[{ required: true, message: "יש לבחור חובש אחראי" }]}
          >
            <Select placeholder="בחר חובש">
              <Option value="משה כהן">משה כהן</Option>
              <Option value="דנה לוי">דנה לוי</Option>
              <Option value="רועי ישראלי">רועי ישראלי</Option>
            </Select>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </Modal>
  );
};

export default ShuttleAssignmentModal;
