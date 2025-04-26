import { useState } from 'react';
import { ChevronRight, ChevronDown, ChevronLeft, Users,} from 'lucide-react';

// Type definitions
type ColorType = 'purple' | 'teal' | 'yellow';

interface StationInfo {
  name: string;
  arrivalTime: string;
  passengers?: number;
  isOrigin?: boolean;
  isDestination?: boolean;
}

interface TravelItem {
  id: number;
  tripId: string;
  location: string;
  type: string;
  startTime: string;
  endTime: string;
  code: string;
  colorType: ColorType;
  stations: StationInfo[];
  driverId?: number;
}

interface TravelBarProps {
  title?: string;
  initialItems?: TravelItem[];
}

interface Driver {
  id: number;
  name: string;
}

// Driver database
const availableDrivers: Driver[] = [
  { id: 1, name: "אלכס" },
  { id: 2, name: "באסם" },
  { id: 3, name: "שמואל" },
];

// Color to driver mapping
const colorToDriverNumber: Record<ColorType, string> = {
  'purple': 'נהג',
  'teal': 'נהג',
  'yellow': 'נהג'
};

// Kilometers per color/driver
const kilometersPerColor: Record<ColorType, string> = {
  'purple': '251 ק"מ',
  'teal': '283 ק"מ',
  'yellow': '244 ק"מ'
};

// Default data for bus drives
const defaultTravelItems: TravelItem[] = [
  { 
    id: 1121, 
    tripId: "1121",
    location: 'מרכ"א עמק', 
    type: 'ירושלים', 
    startTime: '07:30', 
    endTime: '08:20', 
    code: 'אזור א', 
    colorType: 'purple',
    driverId: 1,
    stations: [
      { name: 'מרכ"א עמק', arrivalTime: '07:30', isOrigin: true },
      { name: 'מרכ"א עמק', arrivalTime: '08:20', isDestination: true }
    ]
  },
  { 
    id: 1122, 
    tripId: "1122",
    location: 'אזור ב', 
    type: 'תחנה מרכזית', 
    startTime: '07:30', 
    endTime: '08:35', 
    code: 'אזור ב', 
    colorType: 'purple',
    driverId: 3,
    stations: [
      { name: 'מרכ"א עמק', arrivalTime: '07:30', isOrigin: true },
      { name: 'תחנה מרכזית', arrivalTime: '08:35', isDestination: true }
    ]
  },
  { 
    id: 1123, 
    tripId: "1122",
    location: 'מרכ"א עמק', 
    type: 'בסיס חצבה תא 10', 
    startTime: '08:50', 
    endTime: '10:00', 
    code: 'אזור ב', 
    colorType: 'purple',
    driverId: 3,
    stations: [
      { name: 'מרכ"א עמק', arrivalTime: '08:50', isOrigin: true },
      { name: 'תחנה מרכזית', arrivalTime: '09:20', passengers: 2 },
      { name: 'בסיס חצבה תא 10', arrivalTime: '09:50', passengers: 5 },
      { name: 'מרכ"א עמק', arrivalTime: '10:00', isDestination: true }
    ]
  },
  { 
    id: 1125, 
    tripId: "1125",
    location: 'אזור א', 
    type: 'חיפה', 
    startTime: '09:30', 
    endTime: '09:55', 
    code: 'אזור א', 
    colorType: 'teal',
    driverId: 2,
    stations: []
  },
  { 
    id: 1126, 
    tripId: "1125",
    location: 'אזור ב', 
    type: 'באר שבע', 
    startTime: '10:05', 
    endTime: '10:55', 
    code: 'אזור ב', 
    colorType: 'teal',
    driverId: 2,
    stations: []
  },
  { 
    id: 1127, 
    tripId: "1126",
    location: 'אזור א', 
    type: 'נתניה', 
    startTime: '10:30', 
    endTime: '12:00', 
    code: 'אזור א', 
    colorType: 'yellow',
    driverId: 1,
    stations: []
  },
  { 
    id: 1128, 
    tripId: "1127",
    location: 'אזור א', 
    type: 'אשדוד', 
    startTime: '10:45', 
    endTime: '11:50', 
    code: 'אזור א', 
    colorType: 'purple',
    driverId: 3,
    stations: []
  },
  { 
    id: 1129, 
    tripId: "1128",
    location: 'אזור א', 
    type: 'אילת', 
    startTime: '12:00', 
    endTime: '13:30', 
    code: 'אזור א', 
    colorType: 'teal',
    driverId: 2,
    stations: []
  },
];

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
          {filteredItems.map(item => (
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
                    {item.tripId}
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TravelBar;