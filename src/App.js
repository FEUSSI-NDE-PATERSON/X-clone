import React, { useContext } from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Grok from "./pages/Grok";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import Message from "./pages/Message";
import Sidebar from "./components/Sidebar";
import Fourth from "./pages/Fourth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { AuthContext } from "./utils/context/AuthContext";
function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Grok"
          element={
            <ProtectedRoute>
              <Grok />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Message"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Fourth />} />
      </Routes>
    </Router>
  );
}

export default App;
