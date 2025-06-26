import { Modal, Progress } from "antd";
import Lottie from "lottie-react";
import busAnimation from "../assets/busAnimation.json";
import { useEffect, useState } from "react";
import { Status } from "./types/Status";

interface AutomationModalProps {
  visible: boolean;
  status: Status | null;
}

const AutomationModal = ({ visible, status }: AutomationModalProps) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(0);
  }, [visible]);

  useEffect(() => {
    if (percent === 0 && (status === null || status.step === 8)) {
      return;
    }

    if (status?.step == 0 || !status) {
      return;
    }

    const newPercent = Math.min(Math.round((status.step / 8) * 100), 100);
    setPercent(newPercent);
  }, [percent, status]);

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
        <Progress percent={percent} />
      </div>
    </Modal>
  );
};

export default AutomationModal;
