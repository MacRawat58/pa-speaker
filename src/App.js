import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import DashboardHome from "./components/Dashboard/DashboardHome";
import IPSpeakerConfiguration from "./components/Dashboard/IPSpeakerConfiguration";
import AudioSettings from "./components/Dashboard/AudioSettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<DashboardHome />} />
          <Route
            path="ip-speaker-configuration"
            element={<IPSpeakerConfiguration />}
          />
          <Route path="audio-settings" element={<AudioSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
