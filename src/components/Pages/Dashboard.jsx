import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // To redirect to the login page
import CreateMarathon from '../Pages/CreateMarathon'; // Component to add a marathon
import MyMarathon from '../Pages/MyMarathon'; // Marathon list management
import MyApplyList from '../Pages/MyApplyList'; // User's applied marathons
import useDynamicTitle from '../useDynamicTitle';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // Default active tab

  // Components to render based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <h1>Welcome to your Dashboard</h1>;
      case 'add':
        return <CreateMarathon />;
      case 'marathon':
        return <MyMarathon />;
      case 'apply':
        return <MyApplyList />;
      default:
        return <h1>Page not found</h1>; // Default fallback content
    }
  };

  useDynamicTitle();

  return (
    <div className="dashboard-container flex flex-col lg:flex-row text-white min-h-screen">
      {/* Left Sidebar with Tab Navigation */}
      <div className="w-full lg:w-1/4 p-4">
        {/* <h2 className="text-xl font-bold mb-4">Dashboard</h2> */}
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab('Dashboard')}
              className={`block py-2 px-4 rounded ${
                activeTab === 'dashboard' ? 'bg-customOrange text-white' : 'text-gray-300'
              }`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('add')}
              className={`block py-2 px-4 rounded ${
                activeTab === 'add' ? 'bg-customOrange text-white' : 'text-gray-300'
              }`}
            >
              Add Marathon
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('marathon')}
              className={`block py-2 px-4 rounded ${
                activeTab === 'marathon' ? 'bg-customOrange text-white' : 'text-gray-300'
              }`}
            >
              My Marathons List
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('apply')}
              className={`block py-2 px-4 rounded ${
                activeTab === 'apply' ? 'bg-customOrange text-white' : 'text-gray-300'
              }`}
            >
              My Apply List
            </button>
          </li>
        </ul>
      </div>

      {/* Right Section for Rendering Components */}
      <div className="content w-full lg:w-3/4 p-6 ">
        {/* Display the corresponding component based on activeTab */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;





