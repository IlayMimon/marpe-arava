import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DriverOrganization from './components/DriverOrganization/DriverOrganization';
import DriverData from './types/DriverOrganizationTypes';
import { Modal as AntModal } from 'antd';
import { useState } from 'react';

const driverData: [DriverData, DriverData, DriverData] = [
  {
    distance: 100,
    name: 'test',
    paths: [
      {
        pathId: 1003,
        stations: [
          {
            stationName: 'מחנה שיזפון',
            arrivalTime: '07:30',
            participants: ['john', 'doe'],
          },
          {
            stationName: 'משהו',
            arrivalTime: '08:30',
            participants: ['john', 'doe'],
          },
        ],
      },
      {
        pathId: 1004,
        stations: [
          {
            stationName: 'מחנה אש',
            arrivalTime: '09:30',
            participants: ['john', 'doe'],
          },
          {
            stationName: 'משהו',
            arrivalTime: '10:00',
            participants: ['john', 'doe'],
          },
        ],
      },
      { startTime: '10:30', endTime: '11:30', title: 'הפסקת צהריים' },
      {
        pathId: 1005,
        stations: [
          {
            stationName: 'מחנה אש',
            arrivalTime: '13:30',
            participants: ['john', 'doe'],
          },
          {
            stationName: 'משהו',
            arrivalTime: '16:00',
            participants: ['john', 'doe'],
          },
        ],
      },
    ],
  },
  {
    distance: 300,
    paths: [],
  },
  { distance: 500, paths: [] },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="*"
          element={
            <>
              <AntModal
                open={isModalOpen}
                footer={null}
                closeIcon={false}
                onCancel={() => setIsModalOpen(false)}
                width="131.5rem"
                centered
                className="driver-organization__modal"
              >
                <DriverOrganization paramedic="שקד דנון" data={driverData} chosenDate={new Date()} />
              </AntModal>
              <button onClick={() => setIsModalOpen(true)}>open</button>
            </>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
