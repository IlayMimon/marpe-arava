import Kpies from "./Kpies";

const Header = () => {
  return (
    <div className="header">
      <div className="header__right">
        <div className="header__right__date">date</div>
        <div className="header__right__medic">medic</div>
      </div>
      <div className="header__left">
        <Kpies />
      </div>
    </div>
  );
};

export default Header;
