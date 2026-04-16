import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/Login';
import JoinUsPage from './pages/joinus';
import ProfilePage from './pages/Profile';
import EditProfile from './pages/EditProfile';




const App = () => {
  return (
    <>
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/joinus" element={<JoinUsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
     <Route path="/edit-profile" element={<EditProfile />} />


      
    </Routes>
    
    </>
  );
};

export default App;