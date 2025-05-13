import React from 'react';
import EditField from "../EditField/EditField.tsx";
import { FormErrors, PatientFormData } from "../../types/PatientForm.types.ts";
import FormSection from './FormSection.tsx';
import { Rule } from 'antd/es/form/index';
import { Form } from "antd";
import { FormInstance } from 'antd/lib/index';

interface Props {
  formData: FormInstance<PatientFormData>;
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
}) =>{ 
  
  const fullName = Form.useWatch("fullName", formData);
  const phone = Form.useWatch("phone", formData);
  const pickupStation = Form.useWatch("pickupStation", formData);
  const dropOffStation = Form.useWatch("dropOffStation", formData);

  return(
  <FormSection title="פרטי החייל">
    <EditField
      name='fullName'
      title="שם מלא"
      hint="הקלד שם החייל"
      value={fullName}
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
      value={phone}
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
      value={pickupStation}
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
      value={isDropoffDisabled ? "" : dropOffStation}
      onTextChange={(val) => {
        setIsDropoffTouched(true);
        onChange("dropOffStation")(val);
      }}
      error={errors.dropOffStation}
      rules={validationMap.dropOffStation}
    />
  </FormSection>
)
};

export default SoldierDetailsSection;
