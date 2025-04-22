import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useGroupedRows } from '../../hooks/useGroupedRows';
import { GenericGroupedTableProps } from './TableTypes';

function GroupedTable<T extends object>({
  data,
  columns,
  groupBy,
  rowKey,
}: GenericGroupedTableProps<T>) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const groupedRows = useGroupedRows(data, groupBy, collapsedGroups);

  const toggleGroup = (groupTitle: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  const enhancedColumns: ColumnsType<any> = columns.map((col, i) => ({
    ...col,
    render: (value, record, index) => {
      if (record.type === 'group') {
        if (i === 0) {
          return {
            children: (
              <div
                className="group-label"
                onClick={() => toggleGroup(record.groupTitle)}
              >
                ▶ {record.groupTitle} ({collapsedGroups[record.groupTitle] ? 'Show' : 'Hide'})
              </div>
            ),
            props: { colSpan: columns.length },
          };
        } else {
          return { children: null, props: { colSpan: 0 } };
        }
      }

      return col.render ? col.render(value, record, index) : value;
    },
  }));

  return (
    <Table
      columns={enhancedColumns}
      dataSource={groupedRows}
      rowKey={(record) =>
        record.type === 'group'
          ? `group-${record.groupTitle}`
          : rowKey(record)
      }
      pagination={false}
      rowClassName={(record) =>
        record.type === 'group' ? 'group-row' : ''
      }
    />
  );
}

export default GroupedTable;