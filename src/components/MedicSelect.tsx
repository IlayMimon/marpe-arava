import { Select } from "antd";
import { useState } from "react";

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
        options={[
          { value: "1", label: "חובש 1" },
          { value: "2", label: "חובש 2" },
          { value: "3", label: "חובש 3" },
          { value: "4", label: "חובש 4" },
          { value: "5", label: "חובש 5" },
          { value: "6", label: "חובש 6" },
          { value: "7", label: "חובש 7" },
          { value: "8", label: "חובש 8" },
          { value: "9", label: "חובש 9" },
        ]}
      />
    </div>
  );
};

export default MedicSelect;
