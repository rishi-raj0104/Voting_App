import React, { useState ,useEffect} from 'react';
import { FaVoteYea, FaUserEdit, FaTrophy } from 'react-icons/fa';
import Vote from './Vote';
import Profile from './Profile';
import Leaderboard from './Leaderboard';


const UserDashboard = () => {
  const token = localStorage.getItem('token');

  
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <ul>
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-md mb-3 hover:bg-blue-700 transition ${
              activeSection === 'profile' ? 'bg-blue-800' : ''
            }`}
            onClick={() => setActiveSection('profile')}
          >
            <FaUserEdit className="text-xl" />
            <span>Update Profile</span>
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-md mb-3 hover:bg-blue-700 transition ${
              activeSection === 'vote' ? 'bg-blue-800' : ''
            }`}
            onClick={() => setActiveSection('vote')}
          >
            <FaVoteYea className="text-xl" />
            <span>Vote</span>
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-md mb-3 hover:bg-blue-700 transition ${
              activeSection === 'leaderboard' ? 'bg-blue-800' : ''
            }`}
            onClick={() => setActiveSection('leaderboard')}
          >
            <FaTrophy className="text-xl" />
            <span>Leaderboard</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        {/* Vote Section */}
        {activeSection === 'vote' && (
          <Vote></Vote>
        )}

        {/* Update Profile Section */}
        {activeSection === 'profile' && (
          <Profile />
        )}


        {/* Leaderboard Section */}
        {activeSection === 'leaderboard' && (
          <Leaderboard></Leaderboard>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
