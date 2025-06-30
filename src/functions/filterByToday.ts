import { Dayjs } from 'dayjs';

const filterByToday = (date: Dayjs, columnName: string): string => {
  const startOfDay = date.startOf('day').utc().toISOString();
  const endOfDay = date.endOf('day').utc().toISOString();

  return `$filter=${columnName} ge datetime'${startOfDay}' and ${columnName} lt datetime'${endOfDay}'`;
};

export default filterByToday;
