import EditPatientModal, { PatientFormValues } from "../components/EditPatientModal";
import Header from "../components/Header";
import HomeScreenBody from "../components/HomeScreenBody";
import SidebarNavigation from "../components/sidebarNavigation";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-page__sidebar">
        <SidebarNavigation />
      </div>
      <div className="home-page__content">
        <header className="home-page__content__header">
          <Header />
        </header>
        <div className="home-page__content__body">
          <EditPatientModal isOpen={true} onClose={function (): void {
            throw new Error("Function not implemented.");
          } } onSubmit={function (values: PatientFormValues): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
