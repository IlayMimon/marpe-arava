const getTimeDifference = (times: string[]): string => {
  const minutesArray = times.map((time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  });

  const earliest = Math.min(...minutesArray);
  const latest = Math.max(...minutesArray);

  const diff = latest - earliest;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (!Number.isFinite(hours) || Number.isNaN(minutes)) return 'אירעה שגיאה';
  return `${hours}ש’ ${minutes}דק’`;
};

export default getTimeDifference;
