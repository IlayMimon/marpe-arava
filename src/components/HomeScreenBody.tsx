import { IconSend, IconSparkles } from "@tabler/icons-react";
import { Button, message, Tooltip } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";
import { useHomePageContext } from "../contexts/HomePage";
import { addItemToList } from "../functions/postToSharepoint";
import useGetTableColumns from "../hooks/useGetTableColumns";
import useGetTableData from "../hooks/useGetTableData";
import { useStatusManager } from "../hooks/useStatusManager";
import AddPatientModal, { PatientFormValues } from "./AddPatientModal";
import AutomationModal from "./AutomationModal";
import BtnPopUpMsg from "./generic/btnPopUpMsg";
import ShuttleAssignmentModal from "./ShuttleAssignmentModal/ShuttleAssignmentModal";
import ShuttleTableHeader from "./ShuttleTable/ShuttleTableHeader";
import Table from "./Table/Table";
import TravelBar from "./travel-bar/TravelBar";
import GetStatus from "../hooks/data/useGetStatus";

export type TripDirection = "outbound" | "inbound";

const HomeScreenBody = () => {
  const [isShuttlesArranged, setIsShuttlesArranged] = useState(false);
  const [shuttleAssignmentModalVisible, setShuttleAssignmentModalVisible] = useState(false);
  const [automationModalVisible, setAutomationModalVisible] = useState(false);
  const [messagesAlreadySent, setMessagesAlreadySent] = useState(false);
  const [popUpMsgOpen, setPopUpMsgOpen] = useState(false);
  const [tripDirection, setTripDirection] = useState<TripDirection>("outbound");
  const [escortModalOpen, setEscortModalOpen] = useState(false);

  const { data: statusData } = GetStatus();
  const statusItem = statusData?.d.results[0];
  const isToday = dayjs(statusItem?.Modified).isSame(dayjs(), "day");
  const isSucceeded = statusItem?.status === "succeeded";

  useEffect(() => {
    setIsShuttlesArranged(isToday && isSucceeded);
  }, [isToday, isSucceeded]);

  const { selectedDate } = useHomePageContext();
  const tableData = useGetTableData();

  const { onAssignClick, status } = useStatusManager(setAutomationModalVisible);

  const handleEscortSubmit = async (values: PatientFormValues) => {
    const patientFormData = {
      Time: values.appointmentTime.toISOString(),
      StationId: values.pickupStation,
      Phone: values.phone,
      IsReturnShuttleRequired: !!values.dropoffStation,
      ReturnStationId: values.dropoffStation,
      RequestedServicesId: values.appointmentTypes,
      FullName: values.fullName,
    };

    await addItemToList("ShuttleRequests", patientFormData);

    setEscortModalOpen(false);
  };

  const handleChangeDirection = (direction: TripDirection) => {
    setTripDirection(direction);
  };

  const handleSubmit = () => {
    message.success("שיבוץ הנסיעות בוצע בהצלחה");
    setIsShuttlesArranged(true);

    onAssignClick();
  };

  const sendWhatsMessages = async () => {
    const messagesInfo = tableData
      .filter((r) => r.status === "שובץ")
      .map((row) => ({
        phone: `972${row.phone.slice(1)}`, // Remove the leading '0' and add country code
        time: row.pickupTime,
        name: row.fullName,
        station: row.station,
      }));

    const res = await fetch("http://127.0.0.1:5000/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messagesInfo),
    });

    if (res.ok) {
      alert("✅ Message sent!");
    } else {
      alert("❌ Failed to send message");
    }
  };

  const columns = useGetTableColumns(tripDirection);
  const data = useGetTableData();

  const isSelectedDateTomorrow =
    selectedDate.isBefore(dayjs().add(1, "day").endOf("day")) &&
    selectedDate.isAfter(dayjs().endOf("day"));

  return (
    <div className="home-screen-body">
      <div className="home-screen-body__header">
        <div className="home-screen-body__header__right">
          <h1>שאטלים</h1>
        </div>
        <div className="home-screen-body__header__left">
          <BtnPopUpMsg
            title="שיבוץ נסיעות מחדש?"
            msg="שים לב, פעולה זו תאפס את השיבוצים הקיימים."
            btnContent="שבץ מחדש"
            isOpen={popUpMsgOpen}
            onConfirm={() => {
              setShuttleAssignmentModalVisible((prevValue) => !prevValue);
              setPopUpMsgOpen(false);
            }}
            onCancel={() => setPopUpMsgOpen(false)}
          >
            <Tooltip
              key="submit"
              title={
                (messagesAlreadySent && "לא ניתן לשבץ מחדש לאחר הפצת הודעות") ||
                (!isSelectedDateTomorrow && "ניתן לשבץ נסיעות רק למחר") ||
                ""
              }
            >
              <Button
                onClick={() =>
                  isShuttlesArranged
                    ? setPopUpMsgOpen(true)
                    : setShuttleAssignmentModalVisible(true)
                }
                disabled={messagesAlreadySent || !isSelectedDateTomorrow}
                color="default"
                variant="filled"
                icon={<IconSparkles />}
                className="home-screen-body__header__left__button"
              >
                שבץ נסיעות
              </Button>
            </Tooltip>
          </BtnPopUpMsg>
          <Tooltip title={isShuttlesArranged ? "" : "נדרש לשבץ נסיעות"}>
            <Button
              disabled={!isShuttlesArranged}
              color="default"
              variant="filled"
              icon={<IconSend />}
              onClick={() => {
                setPopUpMsgOpen(false);

                sendWhatsMessages();
                setMessagesAlreadySent(true);
              }}
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
            onClick={() => setEscortModalOpen(true)}
          >
            הוספת מטופל
          </Button>
        </div>
      </div>

      <div className="home-screen-body__container">
        <div className="home-screen-body__container__body">
          <ShuttleTableHeader handleChange={handleChangeDirection} tripDirection={tripDirection} />
          {tripDirection === "outbound" ? (
            <Table data={data} columns={columns} rowKey={(row) => row.id} />
          ) : (
            <Table data={data} columns={columns} rowKey={(row) => row.id} />
          )}
        </div>
        <TravelBar />
      </div>
      <ShuttleAssignmentModal
        visible={shuttleAssignmentModalVisible}
        setVisible={setShuttleAssignmentModalVisible}
        setAutomationModalVisible={setAutomationModalVisible}
        onCancel={() => setShuttleAssignmentModalVisible(false)}
        onSubmit={handleSubmit}
        messagesAlreadySent={false}
      />
      <AutomationModal visible={automationModalVisible} status={status} />

      <AddPatientModal
        isOpen={escortModalOpen}
        onClose={() => setEscortModalOpen(false)}
        onSubmit={handleEscortSubmit}
      />
    </div>
  );
};

export default HomeScreenBody;
