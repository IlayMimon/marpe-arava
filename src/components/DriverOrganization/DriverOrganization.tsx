import { useRef } from 'react';
import DriverData from '../../types/DriverOrganizationTypes';
import DriverOrganizationCard from './DriverOrganizationCard';
import DriverOrganizationHeader from './DriverOrganizationHeader';
import downloadDom from '../../functions/downloadDom';

interface DriverOrganizationProps {
  // explicitly defined 3 times so if given less/more it will show a type error
  data: [DriverData, DriverData, DriverData];
  paramedic: string;
  chosenDate: Date;
}

const DriverOrganization = ({ data, paramedic, chosenDate }: DriverOrganizationProps) => {
  const [allCards, ...rest] = Array.from({ length: 4 }, () => useRef<HTMLDivElement>(null));

  const downloadImages = () => {
    [allCards, ...rest].forEach((ref, index) => {
      const fileName = index === 0 ? 'all-drivers' : 'driver-' + index.toString();
      downloadDom(ref, fileName);
    });
  };

  return (
    <div className="driver-organization">
      <DriverOrganizationHeader
        downloadImages={downloadImages}
        isSendDisabled={data.every((driver) => driver.name)}
        paramedic={paramedic}
      />
      <div ref={allCards} className="driver-organization-card__container">
        {data.map((driverData, index) => (
          <DriverOrganizationCard ref={rest[index]} driverData={driverData} index={index} chosenDate={chosenDate} />
        ))}
      </div>
    </div>
  );
};

export default DriverOrganization;
