import { Select } from "antd";
import { useState } from "react";
import { dummyMedics } from "./HomeScreenBody";
const { Option } = Select;

const MedicSelect = () => {
  const [medic, setMedic] = useState<string>();

  const handleChange = (value: string) => {
    setMedic(value);
  };

  return (
    <div className="medic-select">
      <Select
        value={medic}
        placeholder="בחר חובש אחראי"
        allowClear
        onChange={(medic) => handleChange(medic)}
      >
        {dummyMedics.map((medic) => (
          <Option value={medic.id}>{medic.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default MedicSelect;
