import { Dayjs } from "dayjs";

export interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValues) => void;
  medicName: string | null;
  setMedicName: (name: string) => void;
  messagesAlreadySent: boolean;
}

export interface FormValues {
  startTime: Dayjs;
  endTime: Dayjs;
  vehicleCount: number;
  medicName: string;
}
