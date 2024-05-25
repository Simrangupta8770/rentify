import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/listings');
    }
  },[])
  return(
  <div>
    <h1>Welcome to Rental House App</h1>
    <Link to="/landingPage">Login</Link>
  </div>
  )
};

export default App;
