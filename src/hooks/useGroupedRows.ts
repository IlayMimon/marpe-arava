import { useMemo } from 'react';
import { GroupedRow } from '../components/Table/TableTypes';

export function useGroupedRows<T>(
  data: T[],
  groupBy: (row: T) => string,
  collapsedGroups: Record<string, boolean>
): GroupedRow<T>[] {
  return useMemo(() => {
    const grouped: Record<string, T[]> = {};

    // Step 1: group data
    for (const item of data) {
      const key = groupBy(item);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    }

    // Step 2: build grouped rows
    const result: GroupedRow<T>[] = [];

    for (const groupTitle in grouped) {
      result.push({ type: 'group', groupTitle });

      if (!collapsedGroups[groupTitle]) {
        result.push(
          ...grouped[groupTitle].map((item) => ({
            type: 'data' as const,
            original: item,
          }))
        );
      }
    }

    return result;
  }, [data, groupBy, collapsedGroups]);
}