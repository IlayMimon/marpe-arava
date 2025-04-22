import SidebarNavigation from '../components/sidebarNavigation';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="sidebar-navigation">
        <SidebarNavigation />
      </div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
    </div>
  );
};

export default HomePage;
