import { Menu } from 'antd';
import { TableColumn, TableRow } from '../components/Table/TableTypes';
import { TbDotsVertical, TbPencil, TbEyeOff } from 'react-icons/tb';
const useGetTableColumns = () => {
  const items = [
    {
      key: 'options',
      icon: <TbDotsVertical />,
      children: [
        { key: '3', label: 'ערוך עמודה', icon: <TbPencil /> },
        { key: '4', label: 'הפסק מעקב', icon: <TbEyeOff /> },
      ],
    },
  ];
  const columns: TableColumn<TableRow>[] = [
    {
      key: 'fullName',
      title: 'שם מלא',
      dataIndex: 'fullName',
      sorter: true,
    },
    {
      key: 'status',
      title: 'סטטוס',
      dataIndex: 'status',
      filters: [
        { text: 'מאושר', value: 'מאושר' },
        { text: 'ממתין לאישור', value: 'ממתין לאישור' },
        { text: 'בוטל', value: 'בוטל' },
      ],
      sorter: true,
    },
    {
      key: 'phone',
      title: 'טלפון',
      dataIndex: 'phone',
    },
    {
      key: 'appointmentType',
      title: 'סוג תור',
      dataIndex: 'appointmentType',
    },
    {
      key: 'rideId',
      title: 'מס״ד נסיעה',
      dataIndex: 'rideId',
      sorter: true,
    },
    {
      key: 'station',
      title: 'תחנה',
      dataIndex: 'station',
    },
    {
      key: 'area',
      title: 'אזור',
      dataIndex: 'area',
      filters: [
        { text: 'מרכז', value: 'מרכז' },
        { text: 'צפון', value: 'צפון' },
        { text: 'דרום', value: 'דרום' },
      ],
      sorter: true,
    },
    {
      key: 'pickupTime',
      title: 'שעת איסוף',
      dataIndex: 'pickupTime',
    },
    {
      key: 'estimatedArrival',
      title: 'הגעה משוערת',
      dataIndex: 'estimatedArrival',
    },
    {
      key: 'desiredArrival',
      title: 'הגעה רצויה',
      dataIndex: 'desiredArrival',
    },
    {
      key: 'gap',
      title: 'פער',
      dataIndex: 'gap',
    },
    {
      key: 'driver',
      title: 'נהג',
      dataIndex: 'driver',
    },
    {
      key: 'notes',
      title: 'הערות',
      dataIndex: 'notes',
    },
    {
      key: 'actions',
      title: 'פעולות',
      dataIndex: 'actions',
      render: () => (
        <div>
          <Menu
            style={{ width: 100 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={'vertical'}
            theme={'light'}
            items={items}
          />
        </div>
      ),
    },
  ];

  return columns;
};

export default useGetTableColumns;
