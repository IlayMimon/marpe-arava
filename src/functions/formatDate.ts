import dayjs from "dayjs";

const formatDate = (date: Date): string => {
  const hebrewDays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
  const dayOfWeek = date.getDay();
  const hebrewDay = hebrewDays[dayOfWeek];

  const formatted = dayjs(date).format("DD.MM.YY");

  return `יום ${hebrewDay}’ ${formatted}`;
};

export default formatDate;
