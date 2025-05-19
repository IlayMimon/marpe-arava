import { Select } from "antd";
import { useState } from "react";
import { useQueryFetchRequest } from "../hooks/useQueryFetch";
import {SharePointResponse} from "../components/types/SharePointResponse";
type medic = {
  Title: string;
}
const MedicSelect = () => {
  const [medic, setMedic] = useState<string>();
  const { data } = useQueryFetchRequest<SharePointResponse<medic>>(
    "/_api/web/lists/getbytitle('medics')/items"
  );
  const medicOptions = data?.d.results.map((medic) => {
    return {
      value: medic.Title,
      label: medic.Title,
    };
  });
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
        options={medicOptions}
      />
    </div>
  );
};

export default MedicSelect;
