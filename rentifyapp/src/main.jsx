import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Listings from './components/Listings';
import Notification from './components/Notification';
import LandingPage from './components/LandingPage';
import MyProperties from './components/MyProperties';

// import ViewListings from './components/ViewListings';
// import EditProperty from './components/EditProperty';
// import DeleteProperty from './components/DeleteProperty';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
   
    <Route path="/" element={<LandingPage />}>
        <Route path="listings" element={<Listings />} />
        <Route path="notify" element={<Notification />} />
        <Route path="my-properties" element={<MyProperties />} />
      </Route>
      <Route path="/login" element={<Login />} />
    
      <Route path="/" element={<App />} />
   
    </Routes>
  </Router>
);
