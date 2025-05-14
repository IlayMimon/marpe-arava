import classNames from "classnames";
import DriverData, { Break, Path } from "../../types/DriverOrganizationTypes";

interface DriverOrganizationCardContentProps {
  driverData: DriverData;
  cardIndex: number;
}

interface DriverOrganizationCardPathProps {
  path: Path;
  pathIndex: number;
  cardIndex: number;
}

const DriverOrganizationCardPath = ({ path, pathIndex, cardIndex }: DriverOrganizationCardPathProps) => {
  return (
    <div key={path.pathId} className={classNames("driver-organization-card-content__path", `index-${cardIndex + 1}`)}>
      <div className="driver-organization-card-content__path__id__container">
        <span className="driver-organization-card-content__path__id__index">{pathIndex.toString()}</span>
        <span className="driver-organization-card-content__path__id">{"# " + path.pathId}</span>
      </div>
      {path.stations.map(({ stationName, arrivalTime, participants }, index) => (
        <div
          className={classNames(
            "driver-organization-card-content__path__station",
            stationName === 'מרפ"א ערבה' && "marpe"
          )}
          key={arrivalTime}
        >
          <div className="driver-organization-card-content__path__station__details">
            <span className="driver-organization-card-content__path__station__details__arrival-time">
              {arrivalTime}
            </span>
            <div className="driver-organization-card-content__path__station__details__name-and-participants">
              <span>{stationName}</span>
              <span className="driver-organization-card-content__path__station__details__name-and-participants__participants">
                {participants && participants.join(", ") + ` (${participants.length.toString()})`}
              </span>
            </div>
          </div>
          <div className="driver-organization-card-content__path__station__circle-and-line__container">
            <div className="driver-organization-card-content__path__station__circle-and-line__circle circle"></div>
            {!(path.stations.length === index + 1) && (
              <div className="driver-organization-card-content__path__station__circle-and-line__line line"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const DriverOrganizationCardBreak = ({ pathBreak: { startTime, endTime, title } }: { pathBreak: Break }) => {
  return (
    <div className="driver-organization-card-content__break">
      <span className="driver-organization-card-content__break__times">{`${endTime} - ${startTime}`}</span>
      <span className="driver-organization-card-content__break__title">{title}</span>
      <span></span>
    </div>
  );
};

const DriverOrganizationCardContent = ({ driverData, cardIndex }: DriverOrganizationCardContentProps) => {
  const paths = driverData.paths.filter((path) => "pathId" in path);

  return (
    <div className="driver-organization-card-content">
      {driverData.paths.map((path) => {
        if ("pathId" in path) {
          return <DriverOrganizationCardPath path={path} pathIndex={paths.indexOf(path) + 1} cardIndex={cardIndex} />;
        } else return <DriverOrganizationCardBreak pathBreak={path} />;
      })}
    </div>
  );
};

export default DriverOrganizationCardContent;
