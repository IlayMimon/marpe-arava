import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function FormSection({ title, children }:FormSectionProps) {
return (
  <div className="patient-form__section">
    <p className="patient-form__section-title">{title}</p>
    <div className="patient-form__section-feilds">
      {children}
    </div>
  </div>
);
}
