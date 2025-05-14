import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { DatePicker as AntDatePicker, Button, ConfigProvider, Tag } from "antd";
import heIL from "antd/lib/locale/he_IL";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/he";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMemo, useState } from "react";

dayjs.extend(customParseFormat);
dayjs.locale("he");

const defaultDate = dayjs();
const allowedDays = [1, 2, 3]; // Sunday, Monday, Tuesday

const DatePicker = () => {
  const isAllowedDay = (day: number) => allowedDays.includes(day);

  const findNextAllowedDay = (current: Dayjs): Dayjs => {
    return isAllowedDay(current.day() + 1)
      ? current.add(1, "day")
      : current.add((8 - current.day()) % 7, "day");
  };

  const findPreviousAllowedDay = (current: Dayjs): Dayjs => {
    return isAllowedDay(current.day() - 1)
      ? current.subtract(1, "day")
      : current.subtract((current.day() + 4) % 7, "day");
  };

  const goPreviousDay = () =>
    setDate((prevDate) => findPreviousAllowedDay(prevDate));
  const goNextDay = () => setDate((prevDate) => findNextAllowedDay(prevDate));
  const disabledDate = (current: Dayjs) => !isAllowedDay(current.day());

  const [date, setDate] = useState<Dayjs>(
    isAllowedDay(defaultDate.day())
      ? defaultDate
      : findNextAllowedDay(defaultDate),
  );
  const isToday = useMemo(() => date.isSame(dayjs(), "day"), [date]);

  return (
    <div className="date-picker">
      <Button
        className="date-picker__button date-picker__button--prev"
        onClick={goPreviousDay}
        icon={<RightOutlined />}
      />

      <ConfigProvider locale={heIL} direction="rtl">
        <AntDatePicker
          className="date-picker__input"
          picker="date"
          value={date}
          inputMode="none"
          inputReadOnly
          allowClear={false}
          prefix={
            isToday && (
              <Tag className="date-picker__input--tag" bordered={false}>
                היום
              </Tag>
            )
          }
          suffixIcon={null}
          format="[יום] dd DD.MM.YY"
          onChange={(val) => val && isAllowedDay(val.day()) && setDate(val)}
          disabledDate={disabledDate}
        />
      </ConfigProvider>

      <Button
        className="date-picker__button date-picker__button--next"
        onClick={goNextDay}
        icon={<LeftOutlined />}
      />
    </div>
  );
};

export default DatePicker;
