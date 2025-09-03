import { ConfigProvider, Flex, Segmented, Tooltip } from "antd";
import { TripDirection } from "../HomeScreenBody";
import { AiOutlineSearch } from 'react-icons/ai';
interface IShuttleTableHeaderProps {
  tripDirection: TripDirection;
  handleChange: (direction: TripDirection) => void;
}

export default function ShuttleTableHeader({
  handleChange,
  tripDirection,
}: IShuttleTableHeaderProps) {
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
        <Tooltip title={'חיפוש'}>
          <div className="search-bar-container__active-button">
            <AiOutlineSearch className="search-bar-container__icon" />
          </div>
        </Tooltip>

        <input className="search-bar-container__search-bar">

        </input>
        <div className="search-bar-container__close-button">

        </div>


      </div>
    </div>
  );
}
