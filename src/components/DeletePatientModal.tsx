import { Modal } from "antd";
import { patchItemInList, removeItemFromList } from "../functions/postToSharepoint";
import { TableRow } from "./Table/TableTypes";
import useGetShuttles from "../hooks/data/useGetShuttles";
import { useState } from "react";

interface DeletePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: TableRow;
}

const DeletePatientModal = ({
  isOpen,
  onClose,
  rowData,
}: DeletePatientModalProps) => {
  const { shuttles } = useGetShuttles();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    // Validation before starting deletion
    if (!rowData.id || rowData.id <= 0) {
      Modal.error({
        title: 'שגיאת נתונים',
        content: 'מזהה הבקשה לא תקין',
        centered: true,
      });
      return;
    }

    setIsDeleting(true);

    try {
 
      // Find the shuttle that contains this request
      const currentShuttle = shuttles?.find((shuttle) =>
        shuttle.RequestsId.results.includes(rowData.requestDetailsId)
      );

      // Step 1: Remove from shuttle's RequestsId array first (if assigned to a shuttle)
      if (currentShuttle) {
        const updatedShuttleData = {
          RequestsId: currentShuttle.RequestsId.results.filter(
            (requestId) => requestId !== rowData.requestDetailsId
          ),
        };
        await patchItemInList("Shuttles", updatedShuttleData, currentShuttle.ID, "*");
      }

      // Step 2: Delete from ShuttleRequests (main record)
      await removeItemFromList("ShuttleRequests", rowData.id, "*");

      // Close modal
      onClose();

      // Show success message
      Modal.success({
        title: 'הצלחה',
        content: `המטופל ${rowData.fullName} נמחק בהצלחה`,
        centered: true,
      });

    } catch (error) {

      // Type guard to safely access error properties
      const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
          return error.message;
        }
        if (typeof error === 'string') {
          return error;
        }
        return 'שגיאה לא ידועה';
      };

      Modal.error({
        title: 'שגיאה',
        content: (
          <div>
            <p>אירעה שגיאה במחיקת המטופל {rowData.fullName}</p>
            <p className="error-message">
              {getErrorMessage(error)}
            </p>
            <p>נסה שנית או פנה לתמיכה טכנית</p>
          </div>
        ),
        centered: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      title="מחיקת מטופל"
      onOk={handleConfirmDelete}
      onCancel={onClose}
      okText="מחק"
      cancelText="ביטול"
      okType="danger"
      centered={true}
      destroyOnClose={true}
      confirmLoading={isDeleting}
    >
      <div>
        <p>
          האם אתה בטוח שברצונך למחוק את{' '}
          <strong>{rowData.fullName}</strong>?
        </p>
        <p className="error-text">
          ⚠️ פעולה זו לא ניתנת לביטול
        </p>
        {/* Remove debug info in production */}
      </div>
    </Modal>
  );
};

export default DeletePatientModal;