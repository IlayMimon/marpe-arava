import { useState } from 'react';
import {  ChevronDown, ChevronLeft, Users } from 'lucide-react';
import { ColorType, TravelItem, TravelBarProps } from './types';
import { defaultTravelItems, colorToDriverNumber, availableDrivers, kilometersPerColor } from './dummyData';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { TbChevronsLeft } from "react-icons/tb";
import DriverFilterButton from './DriverFilterButton';

const TravelBar = ({ initialItems = defaultTravelItems }: TravelBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<ColorType[]>([]);
  const [travelItems] = useState<TravelItem[]>(initialItems.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  }));
  const [expandedTrips, setExpandedTrips] = useState<number[]>([1123]); // Pre-expanded trip 1123
  const [driverAssignments, setDriverAssignments] = useState<Record<ColorType, number | null>>({
    'purple': null, // Changed to null for no initial selection
    'teal': null,   // Changed to null for no initial selection
    'yellow': null  // Changed to null for no initial selection
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<Record<ColorType, boolean>>({
    'purple': false,
    'teal': false,
    'yellow': false
  });

  // Toggle filter for a color
  const toggleFilter = (color: ColorType): void => {
    // Simple toggle behavior whether driver is assigned or not
    setActiveFilters(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  // Get filtered items based on active filters
  const getFilteredItems = (): TravelItem[] => {
    if (activeFilters.length === 0) {
      return travelItems;
    } else {
      return travelItems.filter(item => activeFilters.includes(item.colorType));
    }
  };

  // Toggle trip expansion
  const toggleTripExpansion = (tripId: number): void => {
    setExpandedTrips(prev =>
      prev.includes(tripId)
        ? prev.filter(id => id !== tripId)
        : [...prev, tripId]
    );
  };

  // Toggle dropdown for driver selection
  const toggleDropdown = (color: ColorType, event: React.MouseEvent<HTMLButtonElement>): void => {
    // Prevent the click from reaching the button and toggling the filter
    event.stopPropagation();

    // Close all other dropdowns first
    const newDropdownState: Record<ColorType, boolean> = {
      'purple': false,
      'teal': false,
      'yellow': false
    };

    // Toggle the clicked dropdown
    newDropdownState[color] = !isDropdownOpen[color];

    setIsDropdownOpen(newDropdownState);
  };

  // Assign driver to a color route
  const assignDriver = (color: ColorType, driverId: number): void => {
    setDriverAssignments(prev => ({
      ...prev,
      [color]: driverId
    }));

    // Add this color to active filters when a driver is assigned
    if (!activeFilters.includes(color)) {
      setActiveFilters(prev => [...prev, color]);
    }

    // Close the dropdown after selection
    setIsDropdownOpen(prev => ({
      ...prev,
      [color]: false
    }));
  };

  // Get assigned driver name for a color
  const getAssignedDriverName = (color: ColorType): string => {
    const driverId = driverAssignments[color];
    if (driverId === null) return colorToDriverNumber[color]; // Just returns "נהג" if no driver assigned
    const driverFound = availableDrivers.find(driver => driver.id === driverId);
    return driverFound ? driverFound.name : 'נהג';
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

  // Get the assigned driver name for a specific travel item
  const getDriverNameForItem = (item: TravelItem): string | null => {
    const driverId = driverAssignments[item.colorType];
    if (driverId === null) return null;

    const driverFound = availableDrivers.find(driver => driver.id === driverId);
    return driverFound ? driverFound.name : null;
  };

  const filteredItems = getFilteredItems();
  
  // Array of colors to render filter buttons
  const colors: ColorType[] = ['purple', 'teal', 'yellow'];

  return (
    <>
      {isOpen ? (
        <div className="travel-bar" dir="rtl">
          <div className="travel-bar__header">
            <div className="travel-bar__header__back-button" onClick={() => setIsOpen(false)}>
              <TbChevronsLeft className="travel-bar__header__back-icon" size={16} />
              <span className="travel-bar__header__back-text">נסיעות</span>
            </div>
            <div className="travel-bar__header__title">
              הצג סידור יומי
            </div>
          </div>

          <div className="travel-bar__filters">
            {/* Use the new DriverFilterButton component for each color */}
            {colors.map(color => (
              <DriverFilterButton
                key={color}
                color={color}
                isActive={hasDriverAssigned(color)}
                isDropdownOpen={isDropdownOpen[color]}
                driverName={getAssignedDriverName(color)}
                kilometers={kilometersPerColor[color]}
                toggleFilter={toggleFilter}
                toggleDropdown={toggleDropdown}
                assignDriver={assignDriver}
                isDriverAssigned={isDriverAssigned} availableDrivers={availableDrivers}              />
            ))}
          </div>

          <div className="travel-bar__list-container">
            <ul className="travel-bar__list">
              {filteredItems.map(item => {
                const driverName = getDriverNameForItem(item);

                return (
                  <li className="travel-bar__list__item" key={item.id}>
                    <div
                      className="travel-bar__list__item__header"
                      onClick={() => toggleTripExpansion(item.id)}
                    >
                      <div className="travel-bar__list__item__expand-icon">
                        {expandedTrips.includes(item.id) ?
                          <ChevronDown size={16} /> :
                          <ChevronLeft size={16} />
                        }
                      </div>
                      <div className="travel-bar__list__item__trip-id">
                        {item.tripId}#
                      </div>

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
                        <div className="travel-bar__list__item__type">
                          אזור
                        </div>
                        <div className="travel-bar__list__item__location">
                          {item.code}
                        </div>
                      </div>
                      
                      {driverName && (
                        <div className="travel-bar__list__item__driver">
                          {driverName}
                        </div>
                      )}
                      <div className={`travel-bar__list__item__color-indicator travel-bar__list__item__color-indicator--${item.colorType}`}></div>
                    </div>

                    {expandedTrips.includes(item.id) && item.stations.length > 0 && (
                      <div className="travel-bar__list__item__expanded">
                        <ul className={`travel-bar__list__item__stations travel-bar__list__item__stations--${item.colorType}`}>
                          {item.stations.map((station, idx) => (
                            <li
                              key={idx}
                              className={`travel-bar__list__item__station travel-bar__list__item__station--${item.colorType}`}
                            >
                              <div className="travel-bar__list__item__station__name">
                                {station.name}
                              </div>
                              {station.passengers && (
                                <div className="travel-bar__list__item__station__passengers">
                                  <Users size={14} className="travel-bar__list__item__station__passengers__icon" />
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
                )
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div onClick={() => setIsOpen(true)} className='side-bar'>
          <div className="side-bar__button-container">
            <TbChevronsLeft className="side-bar__button-container__icon" size={16} />
            <span className="side-bar__button-container__text">נסיעות</span>
          </div>
        </div>
      )}
    </>
  );
};


export default TravelBar;