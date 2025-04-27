import { useState } from 'react';
import { ChevronRight, ChevronDown, ChevronLeft, Users } from 'lucide-react';
import { ColorType, TravelItem, TravelBarProps } from './types';
import { defaultTravelItems, colorToDriverNumber, availableDrivers, kilometersPerColor } from './dummyData';

const TravelBar = ({ initialItems = defaultTravelItems }: TravelBarProps) => {
  // State
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
  const toggleDropdown = (color: ColorType, event: React.MouseEvent): void => {
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
  const isDriverAssigned = (driverId: number): boolean => {
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

  return (
    <div className="travel-bar" dir="rtl">
      {/* Header */}
      <div className="travel-bar__header">
        <div className="travel-bar__header__back-button">
          <ChevronRight className="travel-bar__header__back-icon" size={16} />
          <span className="travel-bar__header__back-text">נסיעות</span>
        </div>
        <div className="travel-bar__header__title">
          הצג סידור יומי
        </div>
      </div>

      {/* Filters */}
      <div className="travel-bar__filters">
        {/* Purple driver */}
        <div className="travel-bar__filters__driver">
          <div className="travel-bar__filters__driver__dropdown-container">
            <button
              className={`travel-bar__filters__driver__button travel-bar__filters__driver__button--purple ${
                hasDriverAssigned('purple') ? 'travel-bar__filters__driver__button--active--purple' : ''
              }`}
              onClick={() => toggleFilter('purple')}
            >
              {getAssignedDriverName('purple')}
            </button>
            <button 
              className="travel-bar__filters__driver__dropdown-toggle"
              onClick={(e) => toggleDropdown('purple', e)}
            >
              <ChevronDown size={14} />
            </button>
            
            {isDropdownOpen['purple'] && (
              <div className="travel-bar__filters__driver__dropdown">
                {availableDrivers.map(driver => (
                  <div 
                    key={driver.id}
                    className={`travel-bar__filters__driver__dropdown__item ${
                      isDriverAssigned(driver.id) && driverAssignments['purple'] !== driver.id 
                        ? 'travel-bar__filters__driver__dropdown__item--disabled' 
                        : ''
                    }`}
                    onClick={() => {
                      if (!isDriverAssigned(driver.id) || driverAssignments['purple'] === driver.id) {
                        assignDriver('purple', driver.id);
                      }
                    }}
                  >
                    {driver.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="travel-bar__filters__driver__kilometers">
            {kilometersPerColor['purple']}
          </div>
        </div>
        
        {/* Teal driver */}
        <div className="travel-bar__filters__driver">
          <div className="travel-bar__filters__driver__dropdown-container">
            <button
              className={`travel-bar__filters__driver__button travel-bar__filters__driver__button--teal ${
                hasDriverAssigned('teal') ? 'travel-bar__filters__driver__button--active--teal' : ''
              }`}
              onClick={() => toggleFilter('teal')}
            >
              {getAssignedDriverName('teal')}
            </button>
            <button 
              className="travel-bar__filters__driver__dropdown-toggle"
              onClick={(e) => toggleDropdown('teal', e)}
            >
              <ChevronDown size={14} />
            </button>
            
            {isDropdownOpen['teal'] && (
              <div className="travel-bar__filters__driver__dropdown">
                {availableDrivers.map(driver => (
                  <div 
                    key={driver.id}
                    className={`travel-bar__filters__driver__dropdown__item ${
                      isDriverAssigned(driver.id) && driverAssignments['teal'] !== driver.id 
                        ? 'travel-bar__filters__driver__dropdown__item--disabled' 
                        : ''
                    }`}
                    onClick={() => {
                      if (!isDriverAssigned(driver.id) || driverAssignments['teal'] === driver.id) {
                        assignDriver('teal', driver.id);
                      }
                    }}
                  >
                    {driver.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="travel-bar__filters__driver__kilometers">
            {kilometersPerColor['teal']}
          </div>
        </div>
        
        {/* Yellow driver */}
        <div className="travel-bar__filters__driver">
          <div className="travel-bar__filters__driver__dropdown-container">
            <button
              className={`travel-bar__filters__driver__button travel-bar__filters__driver__button--yellow ${
                hasDriverAssigned('yellow') ? 'travel-bar__filters__driver__button--active--yellow' : ''
              }`}
              onClick={() => toggleFilter('yellow')}
            >
              {getAssignedDriverName('yellow')}
            </button>
            <button 
              className="travel-bar__filters__driver__dropdown-toggle"
              onClick={(e) => toggleDropdown('yellow', e)}
            >
              <ChevronDown size={14} />
            </button>
            
            {isDropdownOpen['yellow'] && (
              <div className="travel-bar__filters__driver__dropdown">
                {availableDrivers.map(driver => (
                  <div 
                    key={driver.id}
                    className={`travel-bar__filters__driver__dropdown__item ${
                      isDriverAssigned(driver.id) && driverAssignments['yellow'] !== driver.id 
                        ? 'travel-bar__filters__driver__dropdown__item--disabled' 
                        : ''
                    }`}
                    onClick={() => {
                      if (!isDriverAssigned(driver.id) || driverAssignments['yellow'] === driver.id) {
                        assignDriver('yellow', driver.id);
                      }
                    }}
                  >
                    {driver.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="travel-bar__filters__driver__kilometers">
            {kilometersPerColor['yellow']}
          </div>
        </div>
      </div>

      {/* List of travel items */}
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
                      <span className="travel-bar__list__item__time__separator">→</span>
                      <span>{item.endTime}</span>
                    </div>
                  </div>
                  
                  <div className="travel-bar__list__item__right">
                    <div className="travel-bar__list__item__location">
                      {item.type}
                    </div>
                    <div className="travel-bar__list__item__type">
                      {item.location}
                    </div>
                  </div>
                  {driverName && (
                      <div className="travel-bar__list__item__driver">
                        {driverName}
                      </div>
                    )}
                <div className={`travel-bar__list__item__color-indicator travel-bar__list__item__color-indicator--${item.colorType}`}></div>
              </div>
              
              {/* Expanded details with stations */}
              {expandedTrips.includes(item.id) && item.stations.length > 0 && (
                <div className="travel-bar__list__item__expanded">
                  <ul className="travel-bar__list__item__stations">
                    {item.stations.map((station, idx) => (
                      <li key={idx} className="travel-bar__list__item__station">
                        <div className="travel-bar__list__item__station__time">
                          {station.arrivalTime}
                        </div>
                        
                        {station.passengers && (
                          <div className="travel-bar__list__item__station__passengers">
                            <Users size={14} className="travel-bar__list__item__station__passengers__icon" />
                            <span className="travel-bar__list__item__station__passengers__count">
                              {station.passengers}
                            </span>
                          </div>
                        )}
                        
                        <div className="travel-bar__list__item__station__name">
                          {station.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          )})}
        </ul>
      </div>
    </div>
  );
};

export default TravelBar;