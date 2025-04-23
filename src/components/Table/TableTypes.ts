import { ColumnType } from 'antd/es/table';
import { CSSProperties, ReactNode } from 'react';

export interface TableColumn<T> extends Omit<ColumnType<T>, 'dataIndex'> {
    key: string;
    title: string;
    dataIndex?: string | number | (string | number)[];
}

export interface GenericGroupedTableProps<T> {
    data: T[];
    groupBy: (record: T) => string;
    columns: TableColumn<T>[];
    rowKey: (record: T) => string;
}

export type GroupedRow<T> =
    | { type: 'group'; groupTitle: string }
    | { type: 'data'; original: T };

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
