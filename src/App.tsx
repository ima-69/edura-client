import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { PopularCourses } from './components/home/PopularCourses';
import { CTA } from './components/home/CTA';
import { RegisterSelector } from './components/auth/RegisterSelector';
import { StudentRegister } from './pages/auth/StudentRegister';
import { TeacherRegister } from './components/auth/TeacherRegister';
import { AdminRegister } from './components/auth/AdminRegister';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setCurrentPage } from './store/slices/uiSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.ui.currentPage);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Redirect to home if authenticated
  useEffect(() => {
    if (isAuthenticated && currentPage !== 'home') {
      dispatch(setCurrentPage('home'));
    }
  }, [isAuthenticated, currentPage, dispatch]);

  const handleGetStarted = () => {
    dispatch(setCurrentPage('register-select'));
  };

  const handleSelectUserType = (type: 'student' | 'teacher' | 'admin') => {
    dispatch(setCurrentPage(`${type}-register` as any));
  };

  const handleRegistrationSuccess = () => {
    dispatch(setCurrentPage('home'));
  };

  const handleSwitchToLogin = () => {
    dispatch(setCurrentPage('home'));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'register-select':
        return <RegisterSelector onSelectUserType={handleSelectUserType} />;
      
      case 'student-register':
        return (
          <StudentRegister 
            onSuccess={handleRegistrationSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      
      case 'teacher-register':
        return (
          <TeacherRegister 
            onSuccess={handleRegistrationSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      
      case 'admin-register':
        return (
          <AdminRegister 
            onSuccess={handleRegistrationSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      
      case 'home':
      default:
        return (
          <>
            <Navbar onGetStarted={handleGetStarted} />
            <main>
              <Hero onGetStarted={handleGetStarted} />
              <Features />
              <PopularCourses />
              <CTA onGetStarted={handleGetStarted} />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}
      
      {/* User info debug panel (remove in production) */}
      {isAuthenticated && user && (
        <div className="fixed bottom-4 left-4 bg-white shadow-2xl rounded-lg p-4 border border-gray-200 z-50 max-w-xs">
          <p className="text-sm font-semibold text-gray-700 mb-2">Logged in as:</p>
          <p className="text-xs text-gray-600">{user.first_name} {user.last_name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
          <p className="text-xs text-blue-600 font-semibold mt-1">Role: {user.role}</p>
        </div>
      )}
    </div>
  );
}

export default App;
