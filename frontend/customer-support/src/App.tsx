import React, { JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ViewTickets from "./pages/ViewTickets";
import ProtectedLayout from "./components/ProtectedLayout";
import FAQPage from "./pages/FAQPage";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route (Login Page) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Pages Inside Layout with Header */}
        <Route
          element={
            <PrivateRoute>
              <ProtectedLayout />
            </PrivateRoute>
          }
        >
          <Route path="/tickets" element={<ViewTickets />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>

        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
