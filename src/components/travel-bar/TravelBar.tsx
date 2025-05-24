import { useState } from "react";
import { ChevronDown, ChevronLeft, Users } from "lucide-react";
import { ColorType, TravelItem, TravelBarProps, Driver } from "../../types/travelBar";
import { defaultTravelItems, drivers, kilometersPerColor } from "./dummyData";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { TbChevronsLeft } from "react-icons/tb";
import DriverFilterButton from "./DriverFilterButton";
import classNames from "classnames";
import DriverOrganization from '../DriverOrganization/DriverOrganization';
import driverOrganizationDataMapping from "../../functions/driverOrganizationDataMapping";

const TravelBar = ({ initialItems = defaultTravelItems }: TravelBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [colorFilter, setColorFilter] = useState<ColorType>();
  const [travelItems] = useState<TravelItem[]>(
    initialItems.sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    })
  );
  const [expandedTrips, setExpandedTrips] = useState<number[]>([]);
  const [driverAssignments, setDriverAssignments] = useState<Record<ColorType, number | null>>({
    purple: null,
    teal: null,
    yellow: null,
  });
  const [isShowDailyOrganization, setIsShowDailyOrganization] = useState<boolean>(false);

  const toggleFilter = (color: ColorType): void => {
    setColorFilter((prevColor) => (prevColor === color ? undefined : color));
  };

  const getFilteredItems = (): TravelItem[] => {
    return colorFilter ? travelItems.filter((item) => colorFilter === item.colorType) : travelItems;
  };

  const toggleTripExpansion = (tripId: number): void => {
    setExpandedTrips((prev) =>
      prev.includes(tripId) ? prev.filter((id) => id !== tripId) : [...prev, tripId]
    );
  };

  // Assign driver to a color route
  const assignDriver = (color: ColorType, driverId: number): void => {
    setDriverAssignments((prev) =>
      prev[color] !== driverId
        ? {
            ...prev,
            [color]: driverId,
          }
        : {
            ...prev,
            [color]: null,
          }
    );
  };

  // Get assigned driver name for a color
  const getAssignedDriver = (color: ColorType): Driver | undefined => {
    const driverId = driverAssignments[color];
    const driverFound = drivers.find((driver) => driver.id === driverId);
    return driverFound;
  };

  // Check if driver is already assigned to another color
  const isDriverAssigned = (driverId: number, currentColor: ColorType): boolean => {
    // Allow selection of a driver that's already assigned to the current color
    if (driverAssignments[currentColor] === driverId) return false;

    // Prevent selection if driver is assigned to any other color
    return Object.values(driverAssignments).includes(driverId);
  };

  // Check if a color has a driver assigned
  const hasDriverAssigned = (color: ColorType): boolean => {
    return driverAssignments[color] !== null;
  };

  const getDriverIndexByColor = (color: ColorType) => {
    return `נהג ${colors.indexOf(color) + 1}`;
  };

  const filteredItems = getFilteredItems();

  // Array of colors to render filter buttons
  const colors: ColorType[] = ["purple", "teal", "yellow"];

  return (
    <>
      {isOpen ? (
        <div className="travel-bar">
          <div className="travel-bar__header">
            <div className="travel-bar__header__back-button" onClick={() => setIsOpen(false)}>
              <TbChevronsLeft className="travel-bar__header__back-icon" size={16} />
              <span className="travel-bar__header__back-text">נסיעות</span>
            </div>
            <div onClick={() => setIsShowDailyOrganization(true)} className="travel-bar__header__title">
              הצג סידור יומי
            </div>
          </div>

          <div className="travel-bar__filters">
            {colors.map((color) => (
              <DriverFilterButton
                key={color}
                color={color}
                isActive={color === colorFilter}
                isDriverAssigned={hasDriverAssigned(color)}
                selectedDriver={getAssignedDriver(color)}
                placeholder={getDriverIndexByColor(color)}
                kilometers={kilometersPerColor[color]}
                toggleFilter={toggleFilter}
                assignDriver={assignDriver}
                isDriverAssignedFunc={isDriverAssigned}
                drivers={drivers}
              />
            ))}
          </div>

          <div className="travel-bar__list-container">
            <ul className="travel-bar__list">
              {filteredItems.map((item) => {
                const driverName = drivers.find(
                  (driver) => driver.id === driverAssignments[item.colorType]
                );

                return (
                  <li className="travel-bar__list__item" key={item.id}>
                    <div
                      className="travel-bar__list__item__header"
                      onClick={() => toggleTripExpansion(item.id)}
                    >
                      <div className="travel-bar__list__item__expand-icon">
                        {expandedTrips.includes(item.id) ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronLeft size={16} />
                        )}
                      </div>
                      <div className="travel-bar__list__item__trip-id">{item.tripId}#</div>

                      <div className="travel-bar__list__item__left">
                        <div className="travel-bar__list__item__time">
                          <span>{item.startTime}</span>
                          <span className="travel-bar__list__item__time__separator">
                            <FaLongArrowAltLeft />
                          </span>
                          <span>{item.endTime}</span>
                        </div>
                      </div>

                      <div className="travel-bar__list__item__right">
                        <div className="travel-bar__list__item__type">אזור</div>
                        <div className="travel-bar__list__item__location">{item.code}</div>
                      </div>

                      <div className="travel-bar__list__item__driver">
                        {driverName?.name || getDriverIndexByColor(item.colorType)}
                      </div>
                      <div
                        className={classNames(
                          "travel-bar__list__item__color-indicator",
                          `travel-bar__list__item__color-indicator--${item.colorType}`
                        )}
                      />
                    </div>

                    {expandedTrips.includes(item.id) && item.stations.length > 0 && (
                      <div className="travel-bar__list__item__expanded">
                        <ul
                          className={classNames(
                            "travel-bar__list__item__stations",
                            `travel-bar__list__item__stations--${item.colorType}`
                          )}
                        >
                          {item.stations.map((station, index) => (
                            <li
                              key={index}
                              className={classNames(
                                "travel-bar__list__item__station",
                                `travel-bar__list__item__station--${item.colorType}`
                              )}
                            >
                              <div className="travel-bar__list__item__station__name">
                                {station.name}
                              </div>
                              {station.passengers && (
                                <div className="travel-bar__list__item__station__passengers">
                                  <Users
                                    size={14}
                                    className="travel-bar__list__item__station__passengers__icon"
                                  />
                                  <span className="travel-bar__list__item__station__passengers__count">
                                    {station.passengers}
                                  </span>
                                </div>
                              )}
                              <div className="travel-bar__list__item__station__time">
                                {station.arrivalTime}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div onClick={() => setIsOpen(true)} className="side-bar">
          <div className="side-bar__button-container">
            <TbChevronsLeft className="side-bar__button-container__icon" size={16} />
            <span className="side-bar__button-container__text">נסיעות</span>
          </div>
        </div>
      )}
      <DriverOrganization
        data={driverOrganizationDataMapping(travelItems, drivers, kilometersPerColor)}
        paramedic={"חובש 1"}
        chosenDate={new Date()}
        isModalOpen={isShowDailyOrganization}
        setIsModalOpen={setIsShowDailyOrganization}
      />
    </>
  );
};

export default TravelBar;
