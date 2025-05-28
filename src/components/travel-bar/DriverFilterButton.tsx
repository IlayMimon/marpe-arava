import { Dropdown } from "antd";
import classNames from "classnames";
import { ChevronDown } from "lucide-react";
import { DriverFilterButtonProps } from "../../types/travelBar";

const DriverFilterButton: React.FC<DriverFilterButtonProps> = ({
  color,
  isDriverAssigned,
  isActive,
  selectedDriver,
  placeholder,
  kilometers,
  toggleFilter,
  assignDriver,
  isDriverAssignedFunc,
  drivers,
}) => {
  const items = drivers.map((driver) => ({
    key: driver.id,
    disabled: isDriverAssignedFunc(driver.id, color),
    label: (
      <div
        style={{ height: "100%", width: "100%" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isDriverAssignedFunc(driver.id, color)) {
            assignDriver(color, driver.id);
          }
        }}
      >
        {driver.name}
      </div>
    ),
  }));

  return (
    <div
      className={classNames("driver-filter-button", { ["driver-filter-button--active"]: isActive })}
      onClick={() => toggleFilter(color)}
    >
      <Dropdown className="driver-filter-button__dropdown" menu={{ items }} trigger={["click"]}>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className={classNames(
            "driver-filter-button__button",
            `driver-filter-button__button--${color}`,
            {
              [`driver-filter-button__button--active`]: isDriverAssigned,
              [`driver-filter-button__button--active--${color}`]: isDriverAssigned,
            }
          )}
        >
          <span className="driver-filter-button__button__text">
            {selectedDriver?.name || placeholder}
          </span>
          <ChevronDown className="driver-filter-button__button__dropdown-icon" />
        </button>
      </Dropdown>

      <div className="driver-filter-button__kilometers">{kilometers}</div>
    </div>
  );
};

export default DriverFilterButton;
