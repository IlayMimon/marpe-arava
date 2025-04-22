import { useMemo } from 'react';

export function useGroupedRows<T extends object>(
    data: T[],
    groupBy: (record: T) => string,
    collapsedGroups: Record<string, boolean>
) {
    return useMemo(() => {
        const groups: Record<string, T[]> = {};
        data.forEach((item) => {
            const key = groupBy(item);
            groups[key] = groups[key] || [];
            groups[key].push(item);
        });

        const result: any[] = [];

        Object.entries(groups).forEach(([groupTitle, rows]) => {
            const isCollapsed = collapsedGroups[groupTitle] ?? false;

            result.push({
                type: 'group',
                key: `group-${groupTitle}`,
                groupTitle,
            });

            if (!isCollapsed) {
                result.push(
                    ...rows.map((row) => ({
                        ...row,
                        type: 'data',
                        groupTitle,
                    }))
                );
            }
        });

        return result;
    }, [data, groupBy, collapsedGroups]);
}