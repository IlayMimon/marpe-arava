// NewPatientFormContent.tsx
import {useState} from "react";
import {Button} from "antd";
import SoldierDetailsSection from "./SoldierDetailsSection.tsx";
import AppointmentDetailsSection from "./AppointmentDetailsSection.tsx";
import dayjs from "dayjs";
import {FormErrors, PatientFormData} from "../../types/PatientForm.types.ts";

interface Props {
    closeModal: () => void;
}

export default function NewPatientFormContent({closeModal}: Props) {
    const initialForm: PatientFormData = {
        fullName: "",
        phone: "",
        pickupStation: "",
        dropOffStation: "",
        appointmentTypes: [],
        desiredDate: "",
        desiredTime: "",
        notes: "",
    };

    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState<FormErrors>({
        fullName: "",
        phone: "",
        pickupStation: "",
        dropOffStation: "",
        appointmentTypes: "",
        desiredDate: "",
        desiredTime: "",
        notes: "",
    });

    const [isDropOffTouched, setIsDropOffTouched] = useState(false);
    const [isPickupDisabled, setIsPickupDisabled] = useState(false);
    const [isDropOffDisabled, setIsDropOffDisabled] = useState(true);

    const validateField = (key: keyof PatientFormData, value: string | string[]) => {
        let error = "";

        const dateStr = key === "desiredDate" ? value as string : formData.desiredDate;
        const timeStr = key === "desiredTime" ? value as string : formData.desiredTime;

        const selectedDate = dayjs(dateStr, "DD/MM/YYYY");
        const selectedTime = dayjs(timeStr, "HH:mm");
        const now = dayjs();

        const isToday = selectedDate.isValid() && selectedDate.isSame(now, "day");
        const isTimePast = selectedTime.isValid() && selectedTime.isBefore(now, "minute");

        switch (key) {
            case "fullName":
                if ((value as string).length > 20) error = "שם המטופל לא יכול להכיל יותר מ-20 תווים";
                if ((value as string).trim() === "") error = "שדה חובה";
                break;

            case "phone": {
                let phone = (value as string).trim();

                if (phone === "") {
                    error = "מספר טלפון הוא שדה חובה";
                    break;
                }

                if (phone.startsWith("+972")) {
                    phone = phone.replace("+972", "0");
                    setFormData(prev => ({...prev, phone}));
                }

                if (!phone.startsWith("05")) {
                    error = "מספר טלפון חייב להתחיל בקידומת 05";
                } else if (!/^[0-9]+$/.test(phone)) {
                    error = "מספר טלפון חייב להכיל ספרות בלבד";
                } else if (phone.length !== 10) {
                    error = "מספר טלפון חייב להכיל בדיוק 10 ספרות";
                }
                break;
            }

            case "pickupStation":
                if (!isPickupDisabled && (value as string).trim() === "") error = "שדה חובה";
                break;

            case "dropOffStation":
                if (!isDropOffDisabled && (value as string).trim() === "") error = "שדה חובה";
                break;

            case "desiredDate":
                if (!selectedDate.isValid()) error = "תאריך לא תקין";
                else if (selectedDate.isBefore(now, "day")) error = "לא ניתן לבחור תאריך עבר";
                else if ((value as string).trim() === "") error = "שדה חובה";

                // ✅ בדיקה חוצה – שים שגיאה על השעה אם נבחר היום והשעה עברה
                if (isToday && isTimePast) {
                    setErrors(prev => ({...prev, desiredTime: "לא ניתן לבחור שעה שכבר עברה"}));
                } else {
                    // ✅ אם זה לא היום – הסר שגיאה מהשעה
                    setErrors(prev => ({...prev, desiredTime: ""}));
                }
                break;

            case "desiredTime":
                if (!selectedTime.isValid()) error = "שעה לא תקינה";
                else if ((value as string).trim() === "") error = "שדה חובה";
                else if (isToday && isTimePast) {
                    error = "לא ניתן לבחור שעה שכבר עברה";
                }
                break;

            case "appointmentTypes":
                if ((value as string[]).length === 0) error = "יש לבחור לפחות סוג תור אחד";
                break;

            case "notes":
                if ((value as string).length > 300) error = "ההערה ארוכה מדי (מקסימום 300 תווים)";
                break;
        }

        setErrors(prev => ({...prev, [key]: error}));
    };


    const isFormValid =
        Object.values(errors).every(e => e === "") &&
        formData.fullName.trim() !== "" &&
        /^05\d{8}$/.test(formData.phone) &&
        (!isPickupDisabled ? formData.pickupStation.trim() !== "" : true) &&
        (!isDropOffDisabled ? formData.dropOffStation.trim() !== "" : true) &&
        formData.appointmentTypes.length > 0 &&
        formData.desiredDate.trim() !== "" &&
        formData.desiredTime.trim() !== "";

    const handleSubmit = () => {
        if (!isFormValid) return;
        console.log("Submit patient", formData);
        closeModal();
    };


    const handleClear = () => {
        setFormData(initialForm);
        setErrors({
            fullName: "",
            phone: "",
            pickupStation: "",
            dropOffStation: "",
            appointmentTypes: "",
            desiredDate: "",
            desiredTime: "",
            notes: "",
        });
        setIsDropOffDisabled(true);
        setIsPickupDisabled(false)
        setIsDropOffTouched(false);
    };

    const handleChange = (key: keyof PatientFormData) => (val: string | string[]) => {
        setFormData(prev => ({...prev, [key]: val}));
        validateField(key, val);
    };

    const handlePickupChange = (val: string | string[]) => {
        const dropVal = isDropOffTouched ? formData.dropOffStation : (val as string);
        setFormData(prev => ({
            ...prev,
            pickupStation: val as string,
            dropOffStation: dropVal,
        }));
        validateField("pickupStation", val);
        if (!isDropOffTouched) validateField("dropOffStation", val);
    };

    return (
        <div className="patient-form">
            <p className="patient-form__title">הוספת מטופל ידנית</p>

            <SoldierDetailsSection
                formData={formData}
                onChange={handleChange}
                onPickupChange={handlePickupChange}
                isPickupDisabled={isPickupDisabled}
                isDropoffDisabled={isDropOffDisabled}
                setIsPickupDisabled={setIsPickupDisabled}
                setIsDropoffDisabled={setIsDropOffDisabled}
                setIsDropoffTouched={setIsDropOffTouched}
                errors={errors}
            />

            <AppointmentDetailsSection
                formData={formData}
                onChange={handleChange}
                isPickupDisabled={isPickupDisabled}
                errors={errors}
            />

            <div className="patient-form__footer">
                <Button key="clear" onClick={handleClear}>
                    נקה טופס
                </Button>
                <Button
                    color="default"
                    variant="solid"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    הוסף מטופל
                </Button>
            </div>
        </div>
    );
}