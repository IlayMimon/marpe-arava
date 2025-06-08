import { Modal } from "antd";
import Lottie from "lottie-react";
import busAnimation from "../assets/busAnimation.json";

interface AutomationModalProps {
  visible: boolean;
}

const AutomationModal = ({ visible }: AutomationModalProps) => {
  return (
    <Modal className="automation-modal" open={visible} centered footer={null} closable={false}>
      <div className="automation-modal__content">
        <Lottie
          animationData={busAnimation}
          loop
          className="automation-modal__content__animation"
        />
        <h3 style={{ marginTop: 24 }}>האוטומציה יצאה לריצה מבצעית</h3>
        <p style={{ color: "#666" }}>
          המערכת עובדת מאחורי הקלעים על פעולות מדויקות במיוחד.
          <br />
          תהליך זה יכול לקחת כמה דקות – ניתן לעבור למסך אחר, היא תמשיך בשקט וביעילות, כמו חייל טוב.
        </p>
      </div>
    </Modal>
  );
};

export default AutomationModal;
