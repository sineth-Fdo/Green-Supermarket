import React from 'react'
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const navigator = useNavigate();
  return (
    <div>
      
      <h1>Register</h1>

      <button onClick={() => {
        navigator('/login');
      
      }}>Login</button>

    </div>
  )
}

export default Register