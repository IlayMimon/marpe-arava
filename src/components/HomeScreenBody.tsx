import { IconSend, IconSparkles } from "@tabler/icons-react";
import { Button, Tooltip } from "antd";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";

const HomeScreenBody = () => {
  const [isShattlesArranged, setIsShattlesArranged] = useState(false);

  const sendWhatsMessage = (messageInfo: {
    date: string;
    number: string;
    name: string;
  }) => {
    const phone = `972${messageInfo.number}`;
    const message = encodeURIComponent(
      `Hello, ${messageInfo.name}. \n Your appointment for ${messageInfo.date}, `
    );
    window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${message}`, "WhatsApp");
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
                  number: "549465992",
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
