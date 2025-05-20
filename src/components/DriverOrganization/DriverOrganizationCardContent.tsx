import DriverData from "../../types/DriverOrganizationTypes";
import DriverOrganizationCardBreak from "./DriverOrganizationCardBreak";
import DriverOrganizationCardPath from "./DriverOrganizationCardPath";

interface DriverOrganizationCardContentProps {
  driverData: DriverData;
}

const DriverOrganizationCardContent = ({ driverData }: DriverOrganizationCardContentProps) => {
  const paths = driverData.paths.filter((path) => 'pathId' in path);

  return (
    <div className="driver-organization-card-content">
      {driverData.paths.map((path) => {
        if ('pathId' in path) {
          return (
            <DriverOrganizationCardPath color={driverData.color} path={path} pathIndex={paths.indexOf(path) + 1} />
          );
        } else return <DriverOrganizationCardBreak pathBreak={path} />;
      })}
    </div>
  );
};

export default DriverOrganizationCardContent;
