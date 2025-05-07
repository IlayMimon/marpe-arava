import React from 'react';
import formatDate from '../../functions/formatDate';
import DriverData from '../../types/DriverOrganizationTypes';
import DriverOrganizationCardContent from './DriverOrganizationCardContent';
import driverOrganizationCardDetails from './driverOrganizationCardDetails';

interface DriverOrganizationCardProps {
  driverData: DriverData;
  index: number;
  chosenDate: Date;
  ref: React.RefObject<HTMLDivElement | null>;
}

const DriverOrganizationCard = ({ driverData, index, chosenDate, ref }: DriverOrganizationCardProps) => {
  const details = driverOrganizationCardDetails(driverData, index);

  return (
    <div ref={ref} className="driver-organization-card">
      <div className="driver-organization-card__date">
        <span className="driver-organization-card__date__text">{formatDate(chosenDate)}</span>
      </div>
      <div className="driver-organization-card__details__container">
        {details.map((detail) => (
          <div className="driver-organization-card__details">
            {detail.icon}
            <span className="driver-organization-card__details__text">{detail.text}</span>
          </div>
        ))}
      </div>
      <div className="driver-organization-card-content__container">
        <DriverOrganizationCardContent driverData={driverData} />
      </div>
    </div>
  );
};

export default DriverOrganizationCard;
