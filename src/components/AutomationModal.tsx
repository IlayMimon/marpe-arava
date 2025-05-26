import { Modal, Spin } from "antd";
import React from "react";
import { useQueryFetchRequest } from "../hooks/useQueryFetch";
import { SharepointQueryResultArray } from "../types/spFetchTypes";
import Lottie from "lottie-react";
import busAnimation from "../../public/assets/busAnimation.json";



interface AutomationModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Status {
  status: string;
  isAssigned: boolean;
  step: number;
  isOver: boolean;
}

const AutomationModal = ({ visible, setVisible }: AutomationModalProps) => {
  const { data } = useQueryFetchRequest<SharepointQueryResultArray<Status>>(
    "/_api/web/lists/getbytitle('Status')/items", 
  );
  console.log("AutomationModal data:", data?.d.results[0]);
  const status = data?.d.results[0];
  
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
            תהליך זה יכול לקחת כמה דקות – ניתן לעבור למסך אחר, היא תמשיך בשקט
            וביעילות, כמו חייל טוב.
          </p>
      </div>

    </Modal>
  );
};

export default AutomationModal;
