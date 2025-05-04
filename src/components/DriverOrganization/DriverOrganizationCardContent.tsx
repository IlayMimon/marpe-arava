import DriverData, { Path } from '../../types/DriverOrganizationTypes';

interface DriverOrganizationCardContentProps {
  driverData: DriverData;
}

const DriverOrganizationCardPath = ({ path }: { path: Path }) => {
  return path.stations.map((station) => <div key={station.stationName}>{station.stationName}</div>);
};

const DriverOrganizationCardContent = ({ driverData }: DriverOrganizationCardContentProps) => {
  return (
    <div className="driver-organization-card-content">
      {driverData.paths.map((path) => {
        if ('pathId' in path) {
          return <DriverOrganizationCardPath path={path} />;
        } else return <div>this is a break</div>;
      })}
    </div>
  );
};

export default DriverOrganizationCardContent;
