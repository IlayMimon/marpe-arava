import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { DatePicker, Button, ConfigProvider, Tag } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import heIL from "antd/lib/locale/he_IL";
import "dayjs/locale/he";
import { useState, useMemo } from "react";

dayjs.extend(customParseFormat);
dayjs.locale("he");

const defaultDate = dayjs();

const HeaderDatePicker = () => {
  const [date, setDate] = useState<Dayjs>(defaultDate);
  const isToday = useMemo(() => date.isSame(dayjs(), "day"), [date]);

  const isAllowedDay = (day: number) => [1, 2, 3].includes(day);

  const findNextAllowedDay = (current: Dayjs): Dayjs => {
    let next = current.add(1, "day");
    while (!isAllowedDay(next.day())) {
      next = next.add(1, "day");
    }
    return next;
  };

  const findPreviousAllowedDay = (current: Dayjs): Dayjs => {
    let prev = current.subtract(1, "day");
    while (!isAllowedDay(prev.day())) {
      prev = prev.subtract(1, "day");
    }
    return prev;
  };

  const goPreviousDay = () => setDate(findPreviousAllowedDay(date));
  const goNextDay = () => setDate(findNextAllowedDay(date));
  const disabledDate = (current: Dayjs) => !isAllowedDay(current.day());

  return (
    <div className="main-date-picker">
      <Button
        className="main-date-picker__button--prev"
        onClick={goPreviousDay}
      >
        <RightOutlined />
      </Button>

      <ConfigProvider locale={heIL} direction="rtl">
        <DatePicker
          className="main-date-picker__input"
          picker="date"
          value={date}
          inputMode="none"
          inputReadOnly
          allowClear={false}
          prefix={
            isToday && (
              <Tag
                className="main-date-picker__input--tag"
                bordered={false}
                color="processing"
              >
                היום
              </Tag>
            )
          }
          suffixIcon={null}
          format="[יום] dd D.M.YY"
          onChange={(val) => val && isAllowedDay(val.day()) && setDate(val)}
          disabledDate={disabledDate}
        />
      </ConfigProvider>

      <Button className="main-date-picker__button--next" onClick={goNextDay}>
        <LeftOutlined />
      </Button>
    </div>
  );
};

export default HeaderDatePicker;
