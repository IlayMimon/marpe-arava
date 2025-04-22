// 📁 types/PatientForm.types.ts

export interface PatientFormData {
    fullName: string;
    phone: string;
    pickupStation: string;
    dropOffStation: string;
    appointmentTypes: string[];
    desiredDate: string;  // תאריך נפרד
    desiredTime: string;  // שעה נפרד
    notes: string;
}

export interface FormErrors {
    fullName: string;
    phone: string;
    pickupStation: string;
    dropOffStation: string;
    appointmentTypes: string;
    desiredDate: string;
    desiredTime: string;
    notes: string;
}