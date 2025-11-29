import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { PopularCourses } from './components/home/PopularCourses';
import { CTA } from './components/home/CTA';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PopularCourses />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
