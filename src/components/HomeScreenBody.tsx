import { IconSend, IconSparkles } from "@tabler/icons-react";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";

const HomeScreenBody = () => {
  const [isShattlesArranged, setIsShattlesArranged] = useState(false);

  const sendWhatsMessage = async (messageInfo: {
    date: string;
    number?: string;
    name: string;
    contact?: string;
  }) => {
    const phone = `972${messageInfo.number}`;
    const message = `Hello, ${messageInfo.name}. \n Your appointment for ${messageInfo.date}, `;
    const { contact } = messageInfo;

    const body = { message, phone, contact };
    if (phone) body.phone = phone;
    else if (contact) body.contact = contact;

    const res = await fetch("http://127.0.0.1:5000/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("✅ Message sent!");
    } else {
      alert("❌ Failed to send message");
    }
  };

  return (
    <div className="home-screen-body">
      <div className="home-screen-body__header">
        <div className="home-screen-body__header__right">
          <h1>שאטלים</h1>
        </div>
        <div className="home-screen-body__header__left">
          <Button
            color="default"
            variant="filled"
            icon={<IconSparkles />}
            className="home-screen-body__header__left__button"
          >
            שבץ נסיעות
          </Button>
          <Tooltip title={isShattlesArranged ? undefined : "נדרש לשבץ נסיעות"}>
            <Button
              color="default"
              variant="filled"
              icon={<IconSend />}
              onClick={() =>
                sendWhatsMessage({
                  date: new Date().toDateString(),
                  name: "אגטסיו",
                  number: "523064674",
                })
              }
              className="home-screen-body__header__left__button"
            >
              שליחת הודעות
            </Button>
          </Tooltip>
          <Button
            color="default"
            variant="solid"
            icon={<TbPlus />}
            className="home-screen-body__header__left__button"
          >
            הוספת מטופל
          </Button>
        </div>
      </div>
      <div className="home-screen-body__body">table</div>
    </div>
  );
};

export default HomeScreenBody;
