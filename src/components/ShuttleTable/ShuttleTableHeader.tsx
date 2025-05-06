import { ConfigProvider, Flex, Segmented } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";

interface ShuttleTableHeaderProps {}
export default function NewPatientFormContent({}: ShuttleTableHeaderProps) {
  const [size, setSize] = useState<SizeType>("large");
  return (
    <div className="shuttle-table-header">
      <ConfigProvider direction="rtl">
      <Flex gap="large" align="flex-start" vertical>
        <Segmented
        dir="ltr"
          className="shuttle-table-header__segmented"
          options={["הלוך", "חזור"]} 
          block
          value={size}
          onChange={(value) => setSize(value as SizeType)}
        />
      </Flex>
      </ConfigProvider>
    </div>
  );
}
