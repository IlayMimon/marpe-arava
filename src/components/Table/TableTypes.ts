export interface TableColumn<T> {
    key: string;
    title: string;
    dataIndex?: keyof T;
    render?: (value: any, record: T, index: number) => React.ReactNode;
    sorter?: (a: T, b: T) => number;
    filters?: { text: string; value: any }[];
    onFilter?: (value: any, record: T) => boolean;
}

export interface GenericGroupedTableProps<T> {
    data: T[];
    groupBy: (record: T) => string;
    columns: TableColumn<T>[];
    rowKey: (record: T) => string;
}  