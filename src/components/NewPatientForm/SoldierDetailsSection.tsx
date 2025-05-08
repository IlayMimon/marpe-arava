import React from 'react';
import EditField from "../EditField/EditField.tsx";
import { FormErrors, PatientFormData } from "../../types/PatientForm.types.ts";
import FormSection from './FormSection.tsx';
import { Rule } from 'antd/es/form/index';


interface Props {
  formData: PatientFormData;
  errors: FormErrors;
  onChange: (key: keyof PatientFormData) => (val: string | string[]) => void;
  onPickupChange: (val: string | string[]) => void;
  isPickupDisabled: boolean;
  isDropoffDisabled: boolean;
  setIsPickupDisabled: (val: boolean) => void;
  setIsDropoffDisabled: (val: boolean) => void;
  setIsDropoffTouched: (val: boolean) => void;
  validationMap: Record<keyof PatientFormData, Rule[]>;
}

const SoldierDetailsSection: React.FC<Props> = ({
  formData,
  errors,
  onChange,
  onPickupChange,
  isPickupDisabled,
  isDropoffDisabled,
  setIsPickupDisabled,
  setIsDropoffDisabled,
  setIsDropoffTouched,
  validationMap,
}) => (

  <FormSection title="פרטי החייל">
    <EditField
      name='fullName'
      title="שם מלא"
      hint="הקלד שם החייל"
      value={formData.fullName}
      onTextChange={onChange("fullName")}
      error={errors.fullName}
      maxLength={20}
      rules={validationMap.fullName}
    />
    <EditField
      name='phone'
      title="טלפון"
      type="tel"
      hint="הקלד מספר"
      value={formData.phone}
      onTextChange={onChange("phone")}
      error={errors.phone}
      maxLength={10}
      rules={validationMap.phone}
    />
    <EditField
      name='pickupStation'
      title="תחנת איסוף"
      showCheckbox
      checked={!isPickupDisabled}
      onCheckChange={(val) => setIsPickupDisabled(!val)}
      options={["שגוב", "סיירים"]}
      hint="בחר תחנה"
      value={formData.pickupStation}
      onTextChange={onPickupChange}
      error={errors.pickupStation}
      rules={validationMap.pickupStation}
    />
    <EditField
      name='dropOffStation'
      title="תחנת פיזור"
      showCheckbox
      autosize={{ minRows: 1, maxRows: 2 }}
      checked={!isDropoffDisabled}
      onCheckChange={(val) => setIsDropoffDisabled(!val)}
      options={["שגוב", "סיירים"]}
      hint="בחר תחנה"
      value={isDropoffDisabled ? "" : formData.dropOffStation}
      onTextChange={(val) => {
        setIsDropoffTouched(true);
        onChange("dropOffStation")(val);
      }}
      error={errors.dropOffStation}
      rules={validationMap.dropOffStation}
    />
  </FormSection>
);

export default SoldierDetailsSection;
