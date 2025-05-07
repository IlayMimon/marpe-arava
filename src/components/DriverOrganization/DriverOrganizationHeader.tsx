import { IconSend } from '@tabler/icons-react';
import { Button } from 'antd';

interface DriverOrganizationHeaderProps {
  paramedic: string;
  isSendDisabled: boolean;
  downloadImages: () => void;
}

// TODO change SVG line to be CSS or save as separate file

const DriverOrganizationHeader = ({ paramedic, isSendDisabled, downloadImages }: DriverOrganizationHeaderProps) => {
  return (
    <div className="driver-organization-header">
      <div className="driver-organization-header__button__container">
        <Button
          className="driver-organization-header__button"
          color="default"
          variant="solid"
          disabled={isSendDisabled}
        >
          שלח לנהגים
          <IconSend className="driver-organization-header__button__icon" />
        </Button>
        <Button
          onClick={downloadImages}
          className="driver-organization-header__button"
          color="default"
          variant="outlined"
        >
          הורד כתמונות
        </Button>
      </div>
      <div className="driver-organization-header__title__container">
        <span className="driver-organization-header__title">סידור עבודה יומי לנהג</span>
        <svg width="2" height="16" viewBox="0 0 2 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L0.999999 15" stroke="#D9D9D9" stroke-linecap="round" />
        </svg>
        <span className="driver-organization-header__title__name">{paramedic}</span>
      </div>
    </div>
  );
};

export default DriverOrganizationHeader;
