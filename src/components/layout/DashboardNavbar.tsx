import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { Button, Card } from '../ui';

interface DashboardNavbarProps {
  onNavigate?: (page: string) => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onNavigate }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800';
      case 'teacher':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-900">Edura</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Dashboard
            </a>
            {user?.role === 'student' && (
              <>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  My Courses
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Assignments
                </a>
              </>
            )}
            {user?.role === 'teacher' && (
              <>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  My Classes
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Students
                </a>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Users
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Settings
                </a>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className={`hidden md:inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user?.role || '')}`}>
              {user?.role?.toUpperCase()}
            </span>
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </div>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};


