import React from 'react';
import './App.css'
import ResetPassword from './features/Auth/resetPassword';
import ForgotPassword from './features/Auth/forgotPassword';

function App() {
  return(
  <div>
    <ForgotPassword />
    <ResetPassword />
    
  </div>
  )
}

export default App;
