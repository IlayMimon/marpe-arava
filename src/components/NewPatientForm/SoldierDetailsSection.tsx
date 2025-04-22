// 📁 SoldierDetailsSection.tsx


import EditField from "../EditField/EditField.tsx";
import {FormErrors, PatientFormData} from "../../types/PatientForm.types.ts";

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
}

export default function SoldierDetailsSection({
                                                  formData,
                                                  errors,
                                                  onChange,
                                                  onPickupChange,
                                                  isPickupDisabled,
                                                  isDropoffDisabled,
                                                  setIsPickupDisabled,
                                                  setIsDropoffDisabled,
                                                  setIsDropoffTouched,
                                              }: Props) {
    return (
        <div className="patient-form__section">
            <p className="patient-form__section-title">פרטי החייל</p>
            <div className="patient-form__section-feilds">
                <EditField
                    title="שם מלא"
                    hint="הקלד שם החייל"
                    value={formData.fullName}
                    onTextChange={onChange("fullName")}
                    error={errors.fullName}
                    maxLength={20}
                />
                <EditField
                    title="טלפון"
                    type="tel"
                    hint="הקלד מספר"
                    value={formData.phone}
                    onTextChange={onChange("phone")}
                    error={errors.phone}
                />
                <EditField
                    title="תחנת איסוף"
                    showCheckbox
                    checked={!isPickupDisabled}
                    onCheckChange={(val) => setIsPickupDisabled(!val)}
                    options={["שגוב", "סיירים"]}
                    hint="בחר תחנה"
                    value={formData.pickupStation}
                    onTextChange={onPickupChange}
                    error={errors.pickupStation}
                />
                <EditField
                    title="תחנת פיזור"
                    showCheckbox
                    autoSize={{minRows: 1, maxRows: 2}}
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
                />
            </div>
        </div>
    );
}
