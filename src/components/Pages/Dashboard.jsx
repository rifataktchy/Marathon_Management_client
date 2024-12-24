import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // To redirect to the login page
import CreateMarathon from '../Pages/CreateMarathon'; // Component to add a marathon
import MyMarathon from '../Pages/MyMarathon'; // Marathon list management
import MyApplyList from '../Pages/MyApplyList'; // User's applied marathons

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('add'); // Default active tab

  // Check if user is authenticated (you can change this logic depending on how you're handling authentication)
  const isAuthenticated = localStorage.getItem('token'); // Assuming token is stored in localStorage

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Components to render based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'add':
        return <CreateMarathon />;
      case 'marathon':
        return <MyMarathon />;
      case 'apply':
        return <MyApplyList />;
      default:
        return <CreateMarathon />;
    }
  };

  return (
    <div className="dashboard-container flex">
      {/* Left Sidebar with Tab Navigation */}
      <div className="tabs w-1/4 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab('add')}
              className={`block py-2 px-4 rounded ${activeTab === 'add' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
            >
              Add Marathon
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('marathon')}
              className={`block py-2 px-4 rounded ${activeTab === 'marathon' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
            >
              My Marathons
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('apply')}
              className={`block py-2 px-4 rounded ${activeTab === 'apply' ? 'bg-blue-500 text-white' : 'text-gray-700'}`}
            >
              My Applications
            </button>
          </li>
        </ul>
      </div>

      {/* Right Section for Rendering Components */}
      <div className="content w-3/4 p-6">
        {/* Display the corresponding component based on activeTab */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;




