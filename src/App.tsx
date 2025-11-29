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
import { Login } from './pages/auth/Login';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setCurrentPage } from './store/slices/uiSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.ui.currentPage);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Check authentication on mount and redirect to home if logged in
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
    // After successful registration, redirect to login
    dispatch(setCurrentPage('login'));
  };

  const handleLoginSuccess = () => {
    // After successful login, redirect to home
    dispatch(setCurrentPage('home'));
  };

  const handleSwitchToLogin = () => {
    dispatch(setCurrentPage('login'));
  };

  const handleSwitchToRegister = () => {
    dispatch(setCurrentPage('register-select'));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        if (isAuthenticated) {
          // If already logged in, show home page
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
        return (
          <Login 
            onSuccess={handleLoginSuccess}
            onSwitchToRegister={handleSwitchToRegister}
          />
        );
      
      case 'register-select':
        if (isAuthenticated) {
          // If already logged in, show home page
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
        return <RegisterSelector onSelectUserType={handleSelectUserType} />;
      
      case 'student-register':
        if (isAuthenticated) {
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
        return (
          <StudentRegister 
            onSuccess={handleRegistrationSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      
      case 'teacher-register':
        if (isAuthenticated) {
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
        return (
          <TeacherRegister 
            onSuccess={handleRegistrationSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      
      case 'admin-register':
        if (isAuthenticated) {
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
        return (
          <AdminRegister 
            onSuccess={handleRegistrationSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      
      case 'home':
      default:
        // Same home page for both logged in and logged out users
        // Only the navbar changes
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
    </div>
  );
}

export default App;
