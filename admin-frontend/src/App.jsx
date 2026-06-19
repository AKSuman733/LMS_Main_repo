import AdminRoutes from "./routes/AdminRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <AdminRoutes />
      <Toaster position="top-right" />
    </>
  );
}
