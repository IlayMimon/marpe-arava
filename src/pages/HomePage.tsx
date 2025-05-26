import React from "react";
import EditPatientModal, { PatientFormValues } from "../components/EditPatientModal";
import Header from "../components/Header";
import SidebarNavigation from "../components/sidebarNavigation";

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
          <EditPatientModal isOpen={true} handleChange={() => {}} onClose={function (): void {
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
