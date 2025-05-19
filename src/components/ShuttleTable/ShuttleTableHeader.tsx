import { ConfigProvider, Flex, Segmented, Space, Input } from 'antd';
const { Search } = Input;
import { TripDirection } from '../HomeScreenBody';
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Segmented
            dir="ltr"
            className="shuttle-table-header__segmented"
            options={[
              { label: 'הלוך', value: 'outbound' },
              { label: 'חזור', value: 'return' },
            ]}
            block
            value={tripDirection}
            onChange={(direction) => handleChange(direction as TripDirection)}
          />
          {/* <Space direction="vertical">
            <Search
              placeholder="input search text"
              onSearch={() => {}}
              style={{ width: 200 }}
            />
          </Space> */}
        </Flex>
      </ConfigProvider>
    </div>
  );
}
