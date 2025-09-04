import { ConfigProvider, Flex, Segmented, Tooltip } from "antd";
import { TripDirection } from "../HomeScreenBody";
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from "react";
interface IShuttleTableHeaderProps {
  tripDirection: TripDirection;
  handleChange: (direction: TripDirection) => void;
}

export default function ShuttleTableHeader({handleChange,tripDirection,}: IShuttleTableHeaderProps){

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
        { !searchToggle &&
          <Tooltip title={'חיפוש'}>
            <div className="search-bar-container__active-button" onClick={() => setSearchToggle(!searchToggle)}>
              <AiOutlineSearch className="search-bar-container__icon" />
            </div>
          </Tooltip>
        }
        { searchToggle &&
          <div className="search-bar-container__expanded">
            <input className="search-bar-container__expanded--search-bar">
            </input>
            <div className="search-bar-container__expanded--close-button" onClick={() => setSearchToggle(!searchToggle)}>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
