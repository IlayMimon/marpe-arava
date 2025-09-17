import { Menu } from "antd";
import { useState } from "react";
import { TbDotsVertical, TbPencil, TbSend, TbTrash } from "react-icons/tb";
import dayjs from "dayjs";
import { patchItemInList } from "../functions/postToSharepoint";
import EditPatientModal, { PatientFormValues } from "./EditPatientModal";
import { TableRow } from "./Table/TableTypes";
import { TripDirection } from "./HomeScreenBody";
import useGetShuttles from "../hooks/data/useGetShuttles";
import DeletePatientModal from "./DeletePatientModal";
import sendWhatsMessages from "../functions/sendWhatsAppMessages";

interface RowActionsProps {
  rowData: TableRow;
  tripDirection: TripDirection;
}

const RowActions = ({ rowData, tripDirection }: RowActionsProps) => {
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] = useState(false);
  const { shuttles } = useGetShuttles();

  // Check if actions should be disabled
  const isActionsDisabled = () => {
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');
    
    // Get the date from rowData - adjust this based on which date field you want to use
    // This could be pickupTime, desiredArrival, or any other date field from your row
    const rowDate = dayjs(rowData.pickupTime || rowData.desiredArrival);
    
    // Actions are enabled only if the row date is yesterday
    return !rowDate.isSame(yesterday, 'day');
  };

  const actionsDisabled = isActionsDisabled();

  const handleEditColumn = () => {
    if (actionsDisabled) return;
    setIsEditPatientModalOpen(true);
  };

  const handleDeletePatient = () => {
    if (actionsDisabled) return;
    setIsDeletePatientModalOpen(true);
  };

  const handleSendMessage = () => {
    if (actionsDisabled) return;
    sendWhatsMessages([rowData]);
  };

  const handleSubmitForm = async (values: PatientFormValues) => {
    let oldShuttle;
    const newShuttle = shuttles?.find((shuttle) => values.rideId === shuttle.ID);

    if (!newShuttle?.RequestsId.results.includes(values.requestDetailsId)) {
      oldShuttle = shuttles?.find((shuttle) =>
        shuttle.RequestsId.results.includes(values.requestDetailsId)
      );
    }

    const requestData = {
      Time: values.desiredArrival.toISOString(),
      StationId: values.pickupStation,
      Phone: values.phone,
      IsReturnShuttleRequired: !!values.dropoffStation,
      ReturnStationId: values.dropoffStation,
      RequestedServicesId: values.appointmentType,
      FullName: values.fullName,
      notes: values.notes,
      ReturnDriverId: values.driver,
      PickupTime: values.pickupTime.toISOString(),
      FinishTime: values.finishTime.toISOString(),
      InboundTime: values.inboundTime.toISOString(),
    };

    const oldShuttleData = {
      RequestsId: oldShuttle?.RequestsId.results.filter(
        (RequestId) => RequestId !== values.requestDetailsId
      ),
    };
    const newShuttleData = {
      RequestsId: [...(newShuttle?.RequestsId.results || []), values.requestDetailsId],
    };

    try {
      await patchItemInList("ShuttleRequests", requestData, rowData.id, "*");
    } catch (error) {
      console.error("Error updating request:", error);
    }

    if (oldShuttle && newShuttle) {
      try {
        await patchItemInList("Shuttles", oldShuttleData, oldShuttle.ID, "*");
      } catch (error) {
        console.error("Error updating the old shuttle:", error);
      }

      try {
        await patchItemInList("Shuttles", newShuttleData, newShuttle.ID, "*");
      } catch (error) {
        console.error("Error updating the new shuttle:", error);
      }
    }

    setIsEditPatientModalOpen(false);
  };

  const items = [
    {
      key: "options",
      icon: <TbDotsVertical />,
      children: [
        {
          key: "1",
          label: "ערוך מטופל",
          icon: <TbPencil />,
          onClick: handleEditColumn,
          disabled: actionsDisabled,
        },
        {
          key: "2",
          label: "שליחת הודעה",
          icon: <TbSend />,
          onClick: handleSendMessage,
          disabled: actionsDisabled,
        },
        {
          key: "delete",
          label: "מחק מטופל",
          icon: <TbTrash />,
          onClick: handleDeletePatient,
          danger: true,
          disabled: actionsDisabled,
        },
      ],
    },
  ];

  return (
    <>
      <Menu style={{ width: 0 }} items={items} />

      <EditPatientModal
        isOpen={isEditPatientModalOpen}
        onClose={() => setIsEditPatientModalOpen(false)}
        onSubmit={handleSubmitForm}
        initialValues={rowData}
        tripDirection={tripDirection}
      />

      <DeletePatientModal
        isOpen={isDeletePatientModalOpen}
        onClose={() => setIsDeletePatientModalOpen(false)}
        rowData={rowData}
      />
    </>
  );
};

export default RowActions;