import { Menu } from "antd";
import { useState } from "react";
import { TbDotsVertical, TbEyeOff, TbPencil } from "react-icons/tb";
import EditPatientModal, { PatientFormValues } from "./EditPatientModal";
import { TableRow } from "./Table/TableTypes";

interface RowActionsProps {
    rowData: TableRow;
}

const RowActions = ({ rowData }: RowActionsProps) => {
    const [isEditPatientModalOpen, setisEditPatientModalOpen] = useState(false);

    const handleStopTracking = () => {
        console.log("Stop tracking clicked");
    };

    const hendleEditColumn = () => {
        setisEditPatientModalOpen(true);
        console.log("Edit column clicked", rowData);
    };

    const handleSubmitForm = (values: PatientFormValues) => {
        console.log('formValues', values)
    }

    const items = [
        {
            key: "options",
            icon: <TbDotsVertical />,
            children: [
                {
                    key: "3",
                    label: "ערוך מטופל",
                    icon: <TbPencil />,
                    onClick: hendleEditColumn,
                },
                {
                    key: "4",
                    label: "הפסק מעקב",
                    icon: <TbEyeOff />,
                    onClick: handleStopTracking,
                },
            ],
        },
    ];

    return <>
        <Menu
            style={{ width: 0, height: 50, backgroundColor: "transparent" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode={"vertical"}
            theme={"light"}
            items={items}
        />

        <EditPatientModal
            isOpen={isEditPatientModalOpen}
            onClose={() => setisEditPatientModalOpen(false)}
            onSubmit={handleSubmitForm}
            initialValues={rowData}
        />
    </>
}

export default RowActions;