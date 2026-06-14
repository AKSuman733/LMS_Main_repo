import { Outlet } from "react-router-dom";
import Dheader from "./Dheader";
import "./Layout.css";

function Dlayout() {
  return (
    <div className="layout">
      <Dheader />

      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dlayout;