import { ConfigProvider, Flex, Segmented, Tooltip } from "antd";
import { TripDirection } from "../HomeScreenBody";
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from "react";
import classNames from "classnames";
interface IShuttleTableHeaderProps {
  tripDirection: TripDirection;
  handleChange: (direction: TripDirection) => void;
}

export default function ShuttleTableHeader({ handleChange, tripDirection, }: IShuttleTableHeaderProps) {

  const [searchToggle, setSearchToggle] = useState(false)


  return (
    <div className="shuttle-table-header">
      <ConfigProvider direction="rtl">
        <Flex
          gap="large"
          align="flex-start"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Segmented
            dir="ltr"
            className="shuttle-table-header__segmented"
            options={[
              { label: "הלוך", value: "outbound" },
              { label: "חזור", value: "inbound" },
            ]}
            block
            value={tripDirection}
            onChange={(direction) => handleChange(direction as TripDirection)}
          />
        </Flex>
      </ConfigProvider>
      <div className="search-bar-container">
        <div className={classNames({"search-bar-container--close-button":true, "search-bar-container--close-button-disabled":!searchToggle})} onClick={() => searchToggle && setSearchToggle(false)}>✖</div>
        <Tooltip title={!searchToggle && 'חיפוש בטבלה' || ''}>
          <div className={classNames({"search-bar-container__active-button":true, "search-bar-container__active-button--active":!searchToggle})} onClick={() => !searchToggle && setSearchToggle(true)}>
            <AiOutlineSearch className="search-bar-container__icon" />
            <input className={classNames({"search-bar-container__active-button--search-bar":true, "search-bar-container__active-button--search-bar-disabled":!searchToggle})}/>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
