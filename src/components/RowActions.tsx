import { Menu } from "antd";
import { useState } from "react";
import { TbDotsVertical, TbPencil } from "react-icons/tb";
import { patchItemInList } from "../functions/postToSharepoint";
import EditPatientModal, { PatientFormValues } from "./EditPatientModal";
import { TableRow } from "./Table/TableTypes";
import { TripDirection } from "./HomeScreenBody";

interface RowActionsProps {
    rowData: TableRow;
    tripDirection: TripDirection;
}

const RowActions = ({ rowData, tripDirection }: RowActionsProps) => {
    const [isEditPatientModalOpen, setisEditPatientModalOpen] = useState(false);
    
    const handleEditColumn = () => {
        setisEditPatientModalOpen(true);
    };

    const handleSubmitForm = async (values: PatientFormValues) => {
        const requestData = {
            Time: values.desiredArrival.toISOString(),
            StationId: values.pickupStation,
            Phone: values.phone,
            IsReturnShuttleRequired: !!values.dropoffStation,
            ReturnStationId: values.dropoffStation,
            RequestedServicesId: values.appointmentType,
            FullName: values.fullName,
        };

        const requestDetailsData = {
            ReturnDriverId: values.driver,
            PickupTime: values.pickupTime.toISOString(),
            FinishTime: values.finishTime.toISOString(),
            InboundTime: values.inboundTime.toISOString(),
        };
        
        try {
            await patchItemInList("ShuttleDetailsPerRequest", requestDetailsData, rowData.requestDetailsId, "*");

        } catch (error) {
            console.error("Error updating request details:", error);
        }

        try {
            await patchItemInList("ShuttleRequests", requestData, rowData.id, "*");

        } catch (error) {
            console.error("Error updating request:", error);
        }

        setisEditPatientModalOpen(false);
    }

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
                },
            ],
        },
    ];

    return <>
        <Menu style={{ width: 0 }} items={items} />
        <EditPatientModal
            isOpen={isEditPatientModalOpen}
            onClose={() => setisEditPatientModalOpen(false)}
            onSubmit={handleSubmitForm}
            initialValues={rowData}
            tripDirection={tripDirection}
        />
    </>
}

export default RowActions;