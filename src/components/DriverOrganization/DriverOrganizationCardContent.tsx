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
      {driverData.paths.map((path, index) => {
        if ('pathId' in path) {
          return (
            <div className="driver-organization-card-content__path">
              <div className="driver-organization-card-content__path__id__container">
                <span>{(index + 1).toString()}</span>
                <span>{'# ' + path.pathId}</span>
              </div>
              <DriverOrganizationCardPath path={path} />
            </div>
          );
        } else return <div>this is a break</div>;
      })}
    </div>
  );
};

export default DriverOrganizationCardContent;
