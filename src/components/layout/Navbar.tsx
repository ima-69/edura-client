import React from 'react';
import { Button } from '../ui';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { setCurrentPage } from '../../store/slices/uiSlice';

interface NavbarProps {
  onGetStarted?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  // Debug logging
  React.useEffect(() => {
    console.log('Navbar - Auth Status:', isAuthenticated);
    console.log('Navbar - User:', user);
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
  };

  const handleSignIn = () => {
    dispatch(setCurrentPage('login'));
  };

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'student':
        return {
          bgColor: 'from-blue-500 to-blue-600',
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-800',
          label: 'Student'
        };
      case 'teacher':
        return {
          bgColor: 'from-purple-500 to-purple-600',
          badgeBg: 'bg-purple-100',
          badgeText: 'text-purple-800',
          label: 'Teacher'
        };
      case 'admin':
        return {
          bgColor: 'from-gray-700 to-gray-800',
          badgeBg: 'bg-gray-100',
          badgeText: 'text-gray-800',
          label: 'Admin'
        };
      default:
        return {
          bgColor: 'from-blue-500 to-blue-600',
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-800',
          label: 'User'
        };
    }
  };

  const roleConfig = user ? getRoleConfig(user.role) : null;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Edura</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Courses
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </a>
          </div>

          {/* Right Side - Auth or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user && roleConfig ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-4 py-3 transition-colors"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${roleConfig.bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                  <div className="text-left min-w-[140px]">
                    <p className="text-lg font-bold text-gray-900 leading-tight mb-1">{user.first_name} {user.last_name}</p>
                    <span className={`inline-block px-2 py-0.5 ${roleConfig.badgeBg} ${roleConfig.badgeText} rounded-full text-xs font-medium`}>
                      {roleConfig.label}
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-gray-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        My Profile
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        My Courses
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Settings
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 mt-1"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" onClick={onGetStarted}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <a href="#courses" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Courses
              </a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Contact
              </a>
              {isAuthenticated && user && roleConfig ? (
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${roleConfig.bgColor} rounded-full flex items-center justify-center text-white font-semibold`}>
                      {user.first_name?.[0]}{user.last_name?.[0]}
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">{user.first_name} {user.last_name}</p>
                      <span className={`inline-block px-2 py-0.5 ${roleConfig.badgeBg} ${roleConfig.badgeText} rounded-full text-xs font-medium mt-1`}>
                        {roleConfig.label}
                      </span>
                    </div>
                  </div>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    My Profile
                  </a>
                  <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    My Courses
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={handleSignIn}>
                    Sign In
                  </Button>
                  <Button variant="primary" size="sm" onClick={onGetStarted}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

