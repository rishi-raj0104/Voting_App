import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { clearUser } from '../redux/features/userSlice';
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const userInitial = user.name ? user.name[0].toUpperCase() : '';
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
    navigate('/');
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="max-w-screen">
      <nav className="flex justify-between items-center p-4 bg-blue-500 text-white shadow-md">
        {/* Logo */}
        <div className="text-lg font-bold">MyApp</div>
        {/* Profile Section */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            {isAuthenticated && userInitial ? (
              <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full">
                {userInitial} {/* Display first letter of the name */}
              </div>
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            )}
          </button>

          {/* Dropdown */}
          {isDropdownOpen && isAuthenticated && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
