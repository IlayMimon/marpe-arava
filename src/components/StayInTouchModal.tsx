import { Modal } from "antd";
import { PhoneFilled } from "@ant-design/icons";
import stayInTouch from "../assets/stayInTouch.svg";
import BIDataLogo from "../assets/BIDataLogo.png";

type StayInTouchProps = {
  setStayInTouchOpen: (open: boolean) => void;
  stayInTouchOpen: boolean;
};
const StayInTouchModal: React.FC<StayInTouchProps> = ({
  setStayInTouchOpen,
  stayInTouchOpen,
}) => {
  return (
    <Modal
      className="stay-in-touch-modal"
      title={<span className="stay-in-touch-modal__main-title">דברו איתנו</span>}
      open={stayInTouchOpen}
      onCancel={() => setStayInTouchOpen(false)}
      centered
      footer={null}
    >
      <div className="stay-in-touch-modal__content">
        <img src={stayInTouch} />
        <div >
          <h4 className="stay-in-touch-modal__content__title">נתקלת בבעיה? צריך עזרה?</h4>
          <p className="stay-in-touch-modal__content__txt">פנה אלינו ואנחנו נשמח לעמוד לרשותך.</p>
        </div>
        <div className="stay-in-touch-modal__contacts">
          <div className="stay-in-touch-modal__contacts__phone">
            <PhoneFilled style={{ color: '#F5222D' }}/>
            <p> 681-3890 </p>
          </div>
          <p>או </p>
          <div className="stay-in-touch-modal__contacts__phone">
            <PhoneFilled style={{ color:"#1677FF"}}/>
            <p> 08-990-2397</p>
          </div>
        </div>
      </div>
      <div className="stay-in-touch-modal__footer">
        <img src={BIDataLogo} />
        <p>המערכת פותחה ע”י פלוגת BI Data</p>
      </div>
    </Modal>
  );
};

export default StayInTouchModal;
