import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { PopularCourses } from './components/home/PopularCourses';
import { CTA } from './components/home/CTA';
import { RegisterSelector } from './components/auth/RegisterSelector';
import { StudentRegister } from './components/auth/StudentRegister';
import { TeacherRegister } from './components/auth/TeacherRegister';
import { AdminRegister } from './components/auth/AdminRegister';
import { useState } from 'react';

type Page = 'home' | 'register-select' | 'student-register' | 'teacher-register' | 'admin-register';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleGetStarted = () => {
    setCurrentPage('register-select');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'register-select':
        return <RegisterSelector onSelectUserType={(type) => setCurrentPage(`${type}-register` as Page)} />;
      case 'student-register':
        return (
          <StudentRegister 
            onSuccess={() => setCurrentPage('home')}
            onSwitchToLogin={() => setCurrentPage('home')}
          />
        );
      case 'teacher-register':
        return (
          <TeacherRegister 
            onSuccess={() => setCurrentPage('home')}
            onSwitchToLogin={() => setCurrentPage('home')}
          />
        );
      case 'admin-register':
        return (
          <AdminRegister 
            onSuccess={() => setCurrentPage('home')}
            onSwitchToLogin={() => setCurrentPage('home')}
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
    </div>
  );
}

export default App;
