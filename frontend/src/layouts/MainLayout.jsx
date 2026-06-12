import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <a href="#main-content" className="skip-to-main-content">Skip to Main Content</a>
      <Navbar />
      <main id="main-content" className="anim-page-fade" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
