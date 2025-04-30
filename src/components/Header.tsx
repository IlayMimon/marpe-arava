import HeaderDatePicker from "./HeaderDatePicker";
import Kpies from "./Kpies";

const Header = () => {
  return (
    <div className="header">
      <div className="header__right">
        <HeaderDatePicker/>
        <div className="header__right__medic">medic</div>
      </div>
      <div className="header__left">
        <Kpies />
      </div>
    </div>
  );
};

export default Header;
