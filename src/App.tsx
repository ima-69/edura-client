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
import { TeacherProfile } from './pages/teacher/TeacherProfile';
import { StudentProfile } from './pages/student/StudentProfile';
import { AdminProfile } from './pages/admin/AdminProfile';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setCurrentPage, goBack, type Page } from './store/slices/uiSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.ui.currentPage);
  const { isAuthenticated, user: currentUser } = useAppSelector((state) => state.auth);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) {
        dispatch(goBack());
      } else {
        // If no state, determine page from URL
        const path = window.location.pathname;
        let page: Page = 'home';
        
        if (path === '/login') page = 'login';
        else if (path === '/register-select') page = 'register-select';
        else if (path === '/student-register') page = 'student-register';
        else if (path === '/teacher-register') page = 'teacher-register';
        else if (path === '/admin-register') page = 'admin-register';
        else if (path === '/teacher-profile') page = 'teacher-profile';
        else if (path === '/student-profile') page = 'student-profile';
        else if (path === '/admin-profile') page = 'admin-profile';
        
        dispatch(setCurrentPage(page));
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch]);

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
      
      case 'teacher-profile':
        if (!isAuthenticated) {
          // If not authenticated, redirect to login
          return (
            <Login 
              onSuccess={handleLoginSuccess}
              onSwitchToRegister={handleSwitchToRegister}
            />
          );
        }
        // Role-based access control
        if (isAuthenticated && currentUser?.role !== 'teacher') {
          // If not a teacher, redirect to home
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
        return <TeacherProfile />;
      
      case 'student-profile':
        if (!isAuthenticated) {
          // If not authenticated, redirect to login
          return (
            <Login 
              onSuccess={handleLoginSuccess}
              onSwitchToRegister={handleSwitchToRegister}
            />
          );
        }
        // Role-based access control
        if (isAuthenticated && currentUser?.role !== 'student') {
          // If not a student, redirect to home
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
        return <StudentProfile />;
      
      case 'admin-profile':
        if (!isAuthenticated) {
          // If not authenticated, redirect to login
          return (
            <Login 
              onSuccess={handleLoginSuccess}
              onSwitchToRegister={handleSwitchToRegister}
            />
          );
        }
        // Role-based access control
        if (isAuthenticated && currentUser?.role !== 'admin' && currentUser?.role !== 'superadmin') {
          // If not an admin, redirect to home
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
        return <AdminProfile />;
      
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
