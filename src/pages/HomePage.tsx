import Header from "../components/Header";
import HomeScreenBody from "../components/HomeScreenBody";
import SidebarNavigation from "../components/sidebarNavigation";
import React, { useState } from "react";
import { HomePageContext } from "../contexts/HomePage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

dayjs.extend(utc)

const data = [
  { name: "John Doe", email: "john@example.com", age: 28 },
  { name: "Jane Smith", email: "jane@example.com", age: 34 },
];

const HomePage: React.FC = () => {
  // const [selectedDate, setSelectedDate] = useState(dayjs());

  const exportToPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Name", "Email", "Age"]],
      body: data.map((item) => [item.name, item.email, item.age]),
    });

    doc.save("table-data.pdf");
  };

  return (
    <HomePageContext.Provider value={{ selectedDate, setSelectedDate }}>
      {/* <div className="home-page">
        <div className="home-page__sidebar">
          <SidebarNavigation />
        </div>
        <div className="home-page__content">
          <header className="home-page__content__header">
            <Header />
          </header>
          <div className="home-page__content__body">
            <HomeScreenBody />
          </div>
        </div>
      </div> */}
      <button onClick={exportToPDF} style={{ margin: "20px" }}>
        Export to PDF
      </button>


    </HomePageContext.Provider>
  );
};

export default HomePage;
