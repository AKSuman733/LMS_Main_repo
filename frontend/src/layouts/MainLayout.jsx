import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="main-layout">
<<<<<<< HEAD
      <a href="#main-content" className="skip-to-main-content">Skip to Main Content</a>
      <Navbar />
      <main id="main-content" className="anim-page-fade" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
=======
<<<<<<< HEAD
      <a href="#main-content" className="skip-to-main-content">Skip to Main Content</a>
      <Navbar />
      <main id="main-content" className="anim-page-fade" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
=======
      <Navbar />
      <main className="anim-page-fade" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
