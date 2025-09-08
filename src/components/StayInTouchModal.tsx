import { Modal } from "antd";
import { PhoneFilled } from "@ant-design/icons";
import stayInTouch from "../assets/stayInTouch.svg";
import BIDataLogo from "../assets/BIDataLogo.png";

type IstayInTouchProps = {
  setStayInTouchOpen: (open: boolean) => void;
  stayInTouchOpen: boolean;
};
const StayInTouchModal: React.FC<IstayInTouchProps> = ({
  setStayInTouchOpen,
  stayInTouchOpen,
}) => {
  return (
    <Modal
      className="stay-in-touch-modal"
      title={<span className="stay-in-touch-modal--main-title">דברו איתנו</span>}
      open={stayInTouchOpen}
      onCancel={() => setStayInTouchOpen(false)}
      centered
      footer={null}
    >
      <div className="stay-in-touch-modal__content">
        <img src={stayInTouch} />
        <div >
          <h4 className="stay-in-touch-modal__content--title">נתקלת בבעיה? צריך עזרה?</h4>
          <p className="stay-in-touch-modal__content--txt">פנה אלינו ואנחנו נשמח לעמוד לרשותך.</p>
        </div>
        <div className="stay-in-touch-modal__contacts">
          <div className="stay-in-touch-modal__contacts__phone">
            <PhoneFilled className="stay-in-touch-modal__contacts__phone--red"/>
            <p> 681-3890 </p>
          </div>
          <p>או </p>
          <div className="stay-in-touch-modal__contacts__phone">
            <PhoneFilled className="stay-in-touch-modal__contacts__phone--blue"/>
            <p> 08-990-2397</p>
          </div>
        </div>
      </div>
      <div className="stay-in-touch-modal--footer">
        <img src={BIDataLogo} />
        <p>המערכת פותחה ע”י פלוגת BI Data</p>
      </div>
    </Modal>
  );
};

export default StayInTouchModal;
