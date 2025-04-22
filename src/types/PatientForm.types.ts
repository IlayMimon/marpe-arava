export interface PatientFormData {
    fullName: string;
    phone: string;
    pickupStation: string;
    dropOffStation: string;
    appointmentTypes: string[];
    desiredDate: string;
    desiredTime: string;
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