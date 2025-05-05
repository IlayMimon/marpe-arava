import { useState } from 'react';
import TravelBar from './TravelBar'; // Assuming TravelBar is in the same directory

const Sidebar = () => {
  const [isTravelBarOpen, setIsTravelBarOpen] = useState(false);

  const toggleTravelBar = () => {
    setIsTravelBarOpen(!isTravelBarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white w-16 border-r border-gray-200 flex flex-col items-center pt-4">
        {/* Top part of sidebar */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-gray-600 text-xs">סדר</div>
          
          {/* Travel button that toggles the TravelBar */}
          <button 
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${isTravelBarOpen ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}
            onClick={toggleTravelBar}
          >
            <div className="flex flex-col items-center">
              <span className="text-xl">48</span>
              <div className="flex items-center">
                <span>→</span>
                <span>←</span>
              </div>
            </div>
          </button>
          
          {/* Other sidebar buttons would go here */}
        </div>
      </div>
      
      {/* Travel Bar - only shown when open */}
      <div className={`transition-all duration-300 ${isTravelBarOpen ? 'w-96 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
        {isTravelBarOpen && <TravelBar />}
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Your main content goes here */}
        <div className="text-center mt-8 text-gray-600">
          {isTravelBarOpen 
            ? 'הדף המרכזי (דחוף הצידה כשתיבת הנסיעות פתוחה)' 
            : 'הדף המרכזי'}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;