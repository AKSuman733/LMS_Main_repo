import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./store/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";
import { injectTokens } from "./styles/injectTokens";
import "./index.css";

import { useEffect } from "react";

injectTokens();

function App() {
  useEffect(() => {
    if (localStorage.getItem("reduceMotion") === "true") {
      document.body.classList.add("reduce-motion");
    } else {
      document.body.classList.remove("reduce-motion");
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Toaster 
          position="top-right"
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: '#10b981',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '8px',
                padding: '12px'
              }
            },
            error: {
              duration: 5000,
              style: {
                background: '#ef4444',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '8px',
                padding: '12px'
              }
            },
            blank: {
              duration: 4000,
              style: {
                background: '#f59e0b',
                color: '#fff',
                fontWeight: '600',
                borderRadius: '8px',
                padding: '12px'
              }
            }
          }}
        />
        <AdminRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
