import { ColorType } from "./types";

interface DriverDropdownProps {
    color: ColorType;
    isOpen: boolean;
    availableDrivers: Array<{ id: number; name: string }>;
    assignDriver: (color: ColorType, driverId: number) => void;
    isDriverAssigned: (driverId: number, currentColor: ColorType) => boolean;
  }
  
  // Separate component for the driver dropdown
  const DriverDropdown: React.FC<DriverDropdownProps> = ({
    color,
    isOpen,
    availableDrivers,
    assignDriver,
    isDriverAssigned
  }) => {
    if (!isOpen) return null;
    
    return (
      <div className="travel-bar__filters__driver__dropdown">
        {availableDrivers.map(driver => (
          <div
            key={driver.id}
            className={`travel-bar__filters__driver__dropdown__item ${
              isDriverAssigned(driver.id, color)
                ? 'travel-bar__filters__driver__dropdown__item--disabled'
                : ''
            }`}
            onClick={() => {
              if (!isDriverAssigned(driver.id, color)) {
                assignDriver(color, driver.id);
              }
            }}
          >
            {driver.name}
          </div>
        ))}
      </div>
    );
  };
  export default DriverDropdown