import React from 'react';
import { Card } from '../ui';
import { useAppDispatch } from '../../store/hooks';
import { setCurrentPage } from '../../store/slices/uiSlice';

interface RegisterSelectorProps {
  onSelectUserType: (type: 'student' | 'teacher' | 'admin') => void;
}

export const RegisterSelector: React.FC<RegisterSelectorProps> = ({ onSelectUserType }) => {
  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(setCurrentPage('home'));
  };
  const userTypes = [
    {
      type: 'student' as const,
      title: 'Student',
      description: 'Register as a student to access courses and start learning',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      type: 'teacher' as const,
      title: 'Teacher',
      description: 'Join as a teacher to create courses and teach students',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      bgColor: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      type: 'admin' as const,
      title: 'Admin',
      description: 'Register as admin to manage the platform and users',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bgColor: 'bg-gray-800',
      hoverColor: 'hover:bg-gray-900',
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">E</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join Edura</h1>
          <p className="text-xl text-gray-600">Choose your account type to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userTypes.map((userType) => (
            <Card key={userType.type} hover className="cursor-pointer">
              <button
                onClick={() => onSelectUserType(userType.type)}
                className="w-full p-8 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
              >
                <div className={`w-20 h-20 ${userType.iconBg} ${userType.iconColor} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                  {userType.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                  {userType.title}
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  {userType.description}
                </p>
                <div className={`w-full ${userType.bgColor} ${userType.hoverColor} text-white py-3 rounded-lg font-semibold text-center transition-colors`}>
                  Register as {userType.title}
                </div>
              </button>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};


