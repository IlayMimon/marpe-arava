import { ConfigProvider, Flex, Segmented } from "antd";
import { TripDirection } from "../HomeScreenBody";
interface IShuttleTableHeaderProps {
  tripDirection: TripDirection;
  handleChange: (direction: TripDirection) => void;
}

export default function ShuttleTableHeader({ handleChange, tripDirection }: IShuttleTableHeaderProps) {
  return (
    <div className="shuttle-table-header">
      <ConfigProvider direction="rtl">
      <Flex gap="large" align="flex-start" vertical>
        <Segmented
          dir="ltr"
          className="shuttle-table-header__segmented"
          options={[{label: "הלוך", value: "outbound"}, {label: "חזור", value: "return"}]} 
          block
          value={tripDirection}
          onChange={(direction) => handleChange(direction as TripDirection)}
        />
      </Flex>
      </ConfigProvider>
    </div>
  );
}
