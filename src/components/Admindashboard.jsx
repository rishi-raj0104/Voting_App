import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserEdit, FaVoteYea, FaList } from 'react-icons/fa';
import Profile from './Profile';
import Leaderboard from './Leaderboard';
import UpdateCandidate from './UpdateCandidate';
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('updateProfile');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <ul>
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-md mb-3 hover:bg-blue-700 transition ${
              activeSection === 'updateProfile' ? 'bg-blue-800' : ''
            }`}
            onClick={() => setActiveSection('updateProfile')}
          >
            <FaUserEdit className="text-xl" />
            <span>Update Profile</span>
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-md mb-3 hover:bg-blue-700 transition ${
              activeSection === 'updateCandidates' ? 'bg-blue-800' : ''
            }`}
            onClick={() => setActiveSection('updateCandidates')}
          >
            <FaVoteYea className="mr-2" />
            <span>Update Candidates</span>
          </li>
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-md mb-3 hover:bg-blue-700 transition ${
              activeSection === 'leaderboard' ? 'bg-blue-800' : ''
            }`}
            onClick={() => setActiveSection('leaderboard')}
          >
            <FaList className="text-xl" />
            <span>Leaderboard</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        {activeSection === 'updateProfile' && (
          <Profile/>
        )}

        {activeSection === 'updateCandidates' && (
          <UpdateCandidate></UpdateCandidate>
        )}

        {activeSection === 'leaderboard' && (
          <Leaderboard></Leaderboard>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;