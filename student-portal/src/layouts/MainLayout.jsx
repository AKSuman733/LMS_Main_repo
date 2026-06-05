import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/MainLayout.css";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/register", "/forgot-password"].includes(location.pathname) || location.pathname.startsWith("/certificate/");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="main-content">
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default MainLayout;