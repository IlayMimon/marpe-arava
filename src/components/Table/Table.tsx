import { Table as AntTable } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { useState, useMemo } from "react";
import { useGroupedRows } from "../../hooks/useGroupedRows";
import {
  GenericGroupedTableProps,
  GroupedRow,
  RenderedCell,
} from "./TableTypes";
import { BiSolidDownArrow, BiSolidLeftArrow } from "react-icons/bi";

const Table = <T extends object>({
  data,
  columns,
  groupBy,
  rowKey,
}: GenericGroupedTableProps<T>) => {
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});
  const [sortInfo, setSortInfo] = useState<any>({});
  const [filteredInfo, setFilteredInfo] = useState<Record<string, any>>({});

  const handleChange = (_pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
    setSortInfo(sorter);
  };

  const groupedRows: GroupedRow<T>[] = useMemo(() => {
    return useGroupedRows(
      data,
      collapsedGroups,
      filteredInfo,
      sortInfo,
      groupBy
    );
  }, [data, collapsedGroups, filteredInfo, sortInfo, groupBy]);
  console.log(groupBy)

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
      filteredValue: filteredInfo[col.dataIndex as string] || null,
      onFilter: (value, record) => {
        if (record.type === "group") return false;
        const actualValue = record.original?.[col.dataIndex as keyof T];
        return actualValue?.toString().includes(value.toString()) ?? false;
      },
      sorter: col.sorter
        ? (a, b) => {
            if (a.type === "group" || b.type === "group") return 0;
            const aValue = a.original?.[col.dataIndex as keyof T];
            const bValue = b.original?.[col.dataIndex as keyof T];
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          }
        : undefined,
      sortOrder: sortInfo?.columnKey === col.key ? sortInfo.order : null,
      render: (
        value: any,
        record: GroupedRow<T>,
        index: number
      ): RenderedCell<GroupedRow<T>> => {
        if (record.type === "group") {
          if (i === 0) {
            return {
              children: (
                <div
                  className="group-label"
                  onClick={() => toggleGroup(record.groupTitle)}
                >
                  {collapsedGroups?.[record.groupTitle] ? (
                    <BiSolidLeftArrow />
                  ) : (
                    <BiSolidDownArrow />
                  )}
                  {record.groupTitle}
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
      },
    };

    return baseCol;
  });

  return (
    <AntTable<GroupedRow<T>>
      columns={enhancedColumns}
      dataSource={groupedRows}
      rowKey={(record) => {
        if (record.type === "group") {
          return `group-${record.groupTitle}`;
        }

        if (!record.original) {
          console.error("Missing original data in GroupedRow:", record);
          return "unknown-row";
        }

        return rowKey(record.original);
      }}
      pagination={false}
      onChange={handleChange}
      rowClassName={(record) => (record.type === "group" ? "group-row" : "")}
    />
  );
};

export default Table;
