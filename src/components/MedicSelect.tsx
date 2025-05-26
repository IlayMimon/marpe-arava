import { Select } from "antd";
import { useState } from "react";
import useGetMedics from "../hooks/data/useGetMedics";
const { Option } = Select;

const MedicSelect = () => {
  const [selectedMedic, setSelectedMedic] = useState<string>();
  const medics = useGetMedics();

  const handleChange = (value: string) => {
    setSelectedMedic(value);
  };

  return (
    <div className="medic-select">
      <Select
        value={selectedMedic}
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
