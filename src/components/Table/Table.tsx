import { Table as AntTable } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { useState } from 'react';
import { useGroupedRows } from '../../hooks/useGroupedRows';
import { GenericGroupedTableProps, GroupedRow, RenderedCell } from './TableTypes';

const Table = <T extends object>({ data, columns, groupBy, rowKey }: GenericGroupedTableProps<T>) => {
    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

    const groupedRows: GroupedRow<T>[] = groupBy
        ? useGroupedRows<T>(data, groupBy, collapsedGroups)
        : data.map((item) => ({ type: 'data', original: item }));

    const toggleGroup = (groupTitle: string) => {
        setCollapsedGroups((prev) => ({
            ...prev,
            [groupTitle]: !prev[groupTitle],
        }));
    };

    const enhancedColumns: ColumnsType<GroupedRow<T>> = columns.map((col, i) => {
        const baseCol: ColumnType<GroupedRow<T>> = {
            key: col.key,
            title: col.title,
            dataIndex: col.dataIndex as string,
            filters: col.filters,
            onFilter: col.onFilter as any,
            sorter: col.sorter as any,
            render: (value: any, record: GroupedRow<T>, index: number): RenderedCell<GroupedRow<T>> => {
                if (record.type === 'group') {
                    if (i === 0) {
                        return {
                            children: (
                                <div
                                    className="group-label"
                                    onClick={() => toggleGroup(record.groupTitle)}
                                >
                                    ▶ {record.groupTitle} ({collapsedGroups?.[record.groupTitle] ? 'Show' : 'Hide'})
                                </div>
                            ),
                            props: { colSpan: columns.length },
                        };
                    } else {
                        return {
                            children: null,
                            props: { colSpan: 0 },
                        };
                    }
                }

                const actualValue =
                    col.dataIndex && record.original
                        ? (record.original[col.dataIndex as keyof T] as React.ReactNode)
                        : value;

                return col.render
                    ? col.render(actualValue, record.original, index)
                    : actualValue ?? null;
            }
        };

        return baseCol;
    });

    return (
        <AntTable<GroupedRow<T>>
            columns={enhancedColumns}
            dataSource={groupedRows}
            rowKey={(record) => {
                if (record.type === 'group') {
                    return `group-${record.groupTitle}`;
                }

                if (!record.original) {
                    console.error('Missing original data in GroupedRow:', record);
                    return 'unknown-row';
                }

                return rowKey(record.original);
            }}
            pagination={false}
            rowClassName={(record) =>
                record.type === 'group' ? 'group-row' : ''
            }
        />
    );
}

export default Table