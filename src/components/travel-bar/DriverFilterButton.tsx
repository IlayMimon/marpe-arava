import { ChevronDown } from "lucide-react";
import { ColorType } from "./types";
import DriverDropdown from "./DriverDropdown";

interface DriverFilterButtonProps {
    color: ColorType;
    isActive: boolean;
    isDropdownOpen: boolean;
    driverName: string;
    kilometers: string;
    toggleFilter: (color: ColorType) => void;
    toggleDropdown: (color: ColorType, event: React.MouseEvent<HTMLButtonElement>) => void;
    assignDriver: (color: ColorType, driverId: number) => void;
    isDriverAssigned: (driverId: number, currentColor: ColorType) => boolean;
    availableDrivers: Array<{ id: number; name: string }>;
  }
  const DriverFilterButton: React.FC<DriverFilterButtonProps> = ({
    color, 
    isActive, 
    isDropdownOpen, 
    driverName, 
    kilometers, 
    toggleFilter, 
    toggleDropdown, 
    assignDriver, 
    isDriverAssigned,
    availableDrivers
  }) => {
    return (
      <div className="travel-bar__filters__driver">
        <div className="travel-bar__filters__driver__dropdown-container">
          <button
            className={`travel-bar__filters__driver__button travel-bar__filters__driver__button--${color} ${
              isActive ? `travel-bar__filters__driver__button--active--${color}` : ''
            }`}
            onClick={() => toggleFilter(color)}
          >
            {driverName}
          </button>
          <button
            className="travel-bar__filters__driver__dropdown-toggle"
            onClick={(e) => toggleDropdown(color, e)}
          >
            <ChevronDown size={14} />
          </button>
  
          <DriverDropdown
            color={color}
            isOpen={isDropdownOpen}
            availableDrivers={availableDrivers}
            assignDriver={assignDriver}
            isDriverAssigned={isDriverAssigned}
          />
        </div>
        <div className="travel-bar__filters__driver__kilometers">
          {kilometers}
        </div>
      </div>
    );
  };
  
  export default DriverFilterButton;