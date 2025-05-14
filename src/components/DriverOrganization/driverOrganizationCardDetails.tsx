import getTimeDifference from "../../functions/getTimeDifference";
import { IconUserCircle, IconRoute, IconRoute2, IconClock } from "@tabler/icons-react";
import DriverData from "../../types/DriverOrganizationTypes";

interface DriverOrganizationCardDetailsProps {
  driverData: DriverData;
  index: number;
}

const DriverOrganizationCardDetails = ({ driverData, index }: DriverOrganizationCardDetailsProps) => {
  const details = [
    {
      icon: <IconUserCircle className="driver-organization-card__details__icon" />,
      text: driverData.name || "נהג " + (index + 1).toString(),
    },
    {
      icon: <IconRoute className="driver-organization-card__details__icon" />,
      text: driverData.paths.filter((path) => "pathId" in path).length.toString(),
    },
    {
      icon: <IconRoute2 className="driver-organization-card__details__icon" />,
      text: `${driverData.distance.toString()} ק"מ`,
    },
    {
      icon: <IconClock className="driver-organization-card__details__icon" />,
      text: getTimeDifference(
        driverData.paths
          .filter((path) => "pathId" in path)
          .map((path) => path.stations.map((station) => station.arrivalTime))
          .flat()
      ),
    },
  ];

  return (
    <div className="driver-organization-card__details__container">
      {details.map((detail) => (
        <div key={detail.text} className="driver-organization-card__details">
          {detail.icon}
          <span className="driver-organization-card__details__text">{detail.text}</span>
        </div>
      ))}
    </div>
  );
};

export default DriverOrganizationCardDetails;
