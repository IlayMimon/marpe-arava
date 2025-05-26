import { Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useHomePageContextContext } from "../contexts/HomePage";
import useGetMedics from "../hooks/data/useGetMedics";
import useGetMedicsPerDate from "../hooks/data/useGetMedicsPerDate";
import { addItemToList, patchItemInList, removeItemFromLsit } from "../functions/postToSharepoint";
const { Option } = Select;

const MedicSelect = () => {
  const { selectedDate } = useHomePageContextContext();
  const [medicId, setMedicId] = useState<number | undefined>(undefined);
  const medics = useGetMedics();
  const {medicsPerDate} = useGetMedicsPerDate(selectedDate);
  const existingEntry = medicsPerDate?.[0];

  const handleChange = useCallback(
    async (value: number | undefined) => {
      setMedicId(value);

      if (value === undefined && existingEntry) {
        await removeItemFromLsit("MedicPerDate", existingEntry.ID, "*");
      } else if (existingEntry) {
        if (existingEntry.medicId !== value) {
          await patchItemInList("MedicPerDate", { medicId: value }, existingEntry.ID, "*");
        }
      } else {
        await addItemToList("MedicPerDate", {
          medicId: value,
          Date: selectedDate.toISOString(),
        });
      }
    },
    [existingEntry, selectedDate]
  );

  useEffect(() => {
    if (existingEntry?.medicId) {
      handleChange(existingEntry?.medicId);
    } else {
      setMedicId(undefined);
    }
  }, [existingEntry, handleChange, setMedicId]);

  return (
    <div className="medic-select">
      <Select
        value={medicId}
        placeholder="בחר חובש אחראי"
        allowClear
        onChange={(medicId) => handleChange(medicId)}
      >
        {medics?.map((medic) => <Option value={medic.ID}>{medic.Title}</Option>)}
      </Select>
    </div>
  );
};

export default MedicSelect;
