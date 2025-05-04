const formatDate = (date: Date): string => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString().slice(-2);

  const days = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

  return `יום ${days[date.getDay()]}’ ${day}.${month}.${year}`;
};

export default formatDate;
