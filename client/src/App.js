import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileSwipePage from './pages/ProfileSwipePage';
import MatchedProfilesPage from './pages/MatchedProfilesPage';
import Users from './Users';

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<HomePage />} />
        {/* Other pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profiles" element={<ProfileSwipePage />} />
        <Route path="/matches" element={<MatchedProfilesPage />} />
        <Route path="/user-list" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
