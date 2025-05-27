import { ColumnType } from "antd/es/table";
import { CSSProperties, ReactNode } from "react";

export interface TableColumn<T> extends Omit<ColumnType<T>, "dataIndex"> {
  key: string;
  title: string;
  dataIndex?: string | number | (string | number)[];
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface GenericGroupedTableProps<T> {
  data: T[];
  groupBy?: (record: T) => string;
  columns: TableColumn<T>[];
  rowKey: (record: T) => string;
}

export type CellType<RecordType> = {
  colSpan?: number;
  rowSpan?: number;
  style?: CSSProperties;
  className?: string;
  title?: string;
};

export type RenderedCell<RecordType> =
  | ReactNode
  | {
      children?: ReactNode;
      props?: CellType<RecordType>;
    };

export type TableRow = {
  key: string;
  fullName: string;
  status: string;
  phone: string;
  appointmentType: string;
  rideId: string | number;
  station: string;
  area: string;
  pickupTime: string;
  estimatedArrival: string;
  desiredArrival: string;
  outboundGap: number;
  estimatedFinish: string;
  finishTime: string;
  inboundTime: string;
  inboundGap: number;
  driver: string;
  notes: string;
  actions?: any;
};
