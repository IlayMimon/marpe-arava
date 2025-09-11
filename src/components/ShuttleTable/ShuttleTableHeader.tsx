import { ConfigProvider, Flex, Segmented } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GenericSearchBar from "../generic/searchBar";
import { TripDirection } from "../HomeScreenBody";

interface IShuttleTableHeaderProps {
  tripDirection: TripDirection;
  handleChange: (direction: TripDirection) => void;
  setSearchFilter: Dispatch<SetStateAction<string>>;
}

export default function ShuttleTableHeader({ handleChange, tripDirection, setSearchFilter }: IShuttleTableHeaderProps) {

  const [inputValue, setInputValue ] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchFilter(inputValue);
    }, 300);
  
    return () => clearTimeout(timeout);
  }, [inputValue]);

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

      <GenericSearchBar inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
}
