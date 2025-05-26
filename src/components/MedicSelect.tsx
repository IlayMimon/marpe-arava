import { Select } from "antd";
import { useState } from "react";
import useGetMedics from "../hooks/data/useGetMedics";
const { Option } = Select;

const MedicSelect = () => {
  const [medic, setMedic] = useState<string>();
  const medics = useGetMedics();

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
        {medics?.map((medic) => (
          <Option value={medic.ID}>{medic.Title}</Option>
        ))}
      </Select>
    </div>
  );
};

export default MedicSelect;
