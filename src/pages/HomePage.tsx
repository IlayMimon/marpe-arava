import SidebarNavigation from "../components/sidebarNavigation";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <SidebarNavigation />
      <div className="home-page__content">
        <h1>Welcome to the Home Page</h1>
        <p>This is the main page of the application.</p>
      </div>
    </div>
  );
};

export default HomePage;
