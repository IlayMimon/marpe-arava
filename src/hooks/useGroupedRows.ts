import { GroupedRow } from "../components/Table/TableTypes";

export const useGroupedRows = <T>(
  data: T[],
  collapsedGroups: Record<string, boolean>,
  filteredInfo: Record<string, any>,
  sortInfo: any,
  groupBy?: (row: T) => string
): GroupedRow<T>[] => {
  // Apply filtering
  const filteredData = data.filter((item) => {
    for (const key in filteredInfo) {
      const values = filteredInfo[key];
      const actualValue = (item as any)[key];
      if (values && values.length > 0 && !values.includes(actualValue)) {
        return false;
      }
    }
    return true;
  });

  // Apply sorting
  if (sortInfo?.columnKey && sortInfo?.order) {
    const { columnKey, order } = sortInfo;
    filteredData.sort((a, b) => {
      const aVal = (a as any)[columnKey];
      const bVal = (b as any)[columnKey];
      if (aVal === bVal) return 0;
      const result = aVal > bVal ? 1 : -1;
      return order === "ascend" ? result : -result;
    });
  }

  // If no groupBy, return plain data rows
  if (!groupBy) {
    return filteredData.map((item) => ({
      type: "data" as const,
      original: item,
    }));
  }

  // Grouping logic
  const grouped: Record<string, T[]> = {};
  for (const item of filteredData) {
    const key = groupBy(item);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  }

  const result: GroupedRow<T>[] = [];

  for (const groupTitle in grouped) {
    const groupData = grouped[groupTitle];
    result.push({ type: "group", groupTitle });

    if (!collapsedGroups[groupTitle]) {
      result.push(
        ...groupData.map((item) => ({
          type: "data" as const,
          original: item,
        }))
      );
    }
  }

  return result;
};
