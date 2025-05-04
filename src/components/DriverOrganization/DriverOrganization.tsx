import DriverData from '../../types/DriverOrganizationTypes';
import DriverOrganizationCard from './DriverOrganizationCard';
import DriverOrganizationHeader from './DriverOrganizationHeader';

interface DriverOrganizationProps {
  // explicitly defined 3 times so if given less/more it will show a type error
  data: [DriverData, DriverData, DriverData];
  paramedic: string;
  chosenDate: Date;
}

const DriverOrganization = ({ data, paramedic, chosenDate }: DriverOrganizationProps) => {
  return (
    <div className="driver-organization">
      <DriverOrganizationHeader isSendDisabled={data.every((driver) => driver.name)} paramedic={paramedic} />
      <div className="driver-organization-card__container">
        {data.map((driverData, index) => (
          <DriverOrganizationCard driverData={driverData} index={index} chosenDate={chosenDate} />
        ))}
      </div>
    </div>
  );
};

export default DriverOrganization;
