import { Menu } from "antd";
import { TableColumn, TableRow } from "../components/Table/TableTypes";
import { TbDotsVertical, TbPencil, TbEyeOff } from "react-icons/tb";
import { TripDirection } from "../components/HomeScreenBody";
import TimeDeviation from "../components/TimeDeviation";

const useGetTableColumns = (tripDirection: TripDirection) => {
  const handleStopTracking = () => {
    console.log("Stop tracking clicked");
  };
  const hendleEditColumn = () => {
    console.log("Edit column clicked");
  };

  const items = [
    {
      key: "options",
      icon: <TbDotsVertical />,
      children: [
        {
          key: "3",
          label: "ערוך עמודה",
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

  const directionColumns: TableColumn<TableRow>[] =
    tripDirection === "outbound"
      ? [
          {
            key: "pickupTime",
            title: "שעת איסוף",
            dataIndex: "pickupTime",
          },
          {
            key: "estimatedArrival",
            title: "הגעה משוערת",
            dataIndex: "estimatedArrival",
          },
          {
            key: "desiredArrival",
            title: "הגעה רצויה",
            dataIndex: "desiredArrival",
          },
          {
            key: "outboundGap",
            title: "פער",
            dataIndex: "outboundGap",
            render: (value: number) => <TimeDeviation value={value} />,
          },
        ]
      : [
          {
            key: "estimatedFinish",
            title: "סיום משוער",
            dataIndex: "estimatedFinish",
          },
          {
            key: "finishTime",
            title: "שעת סיום",
            dataIndex: "finishTime",
          },
          {
            key: "inboundTime",
            title: "שעת חזרה",
            dataIndex: "inboundTime",
          },
          {
            key: "inboundGap",
            title: "פער",
            dataIndex: "inboundGap",
            render: (value: number) => <TimeDeviation value={value} />,
          },
        ];

  const columns: TableColumn<TableRow>[] = [
    {
      key: "fullName",
      title: "שם מלא",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      key: "status",
      title: "סטטוס",
      dataIndex: "status",
      filters: [
        { text: "מאושר", value: "מאושר" },
        { text: "ממתין לאישור", value: "ממתין לאישור" },
        { text: "בוטל", value: "בוטל" },
      ],
      sorter: true,
    },
    {
      key: "phone",
      title: "טלפון",
      dataIndex: "phone",
    },
    {
      key: "appointmentType",
      title: "סוג תור",
      dataIndex: "appointmentType",
    },
    {
      key: "rideId",
      title: "מס״ד נסיעה",
      dataIndex: "rideId",
      sorter: true,
    },
    {
      key: "station",
      title: "תחנה",
      dataIndex: "station",
    },
    {
      key: "area",
      title: "אזור",
      dataIndex: "area",
      filters: [
        { text: "מרכז", value: "מרכז" },
        { text: "צפון", value: "צפון" },
        { text: "דרום", value: "דרום" },
      ],
      sorter: true,
    },
    ...directionColumns,
    {
      key: "driver",
      title: "נהג",
      dataIndex: "driver",
    },
    {
      key: "notes",
      title: "הערות",
      dataIndex: "notes",
    },
    {
      key: "actions",
      title: "פעולות",
      dataIndex: "actions",
      render: () => (
        <div>
          <Menu
            style={{ width: 0, height: 50, backgroundColor: "transparent" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode={"vertical"}
            theme={"light"}
            items={items}
          />
        </div>
      ),
    },
  ];

  return columns;
};

export default useGetTableColumns;
