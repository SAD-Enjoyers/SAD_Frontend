import React from 'react';
import './App.css'
import ResetPassword from './feature/Auth/resetPassword';
import ForgotPassword from './feature/Auth/forgotPassword';

function App() {
  return(
  <div>
    <ForgotPassword />
    <ResetPassword />
    
  </div>
  )
}

export default App;
