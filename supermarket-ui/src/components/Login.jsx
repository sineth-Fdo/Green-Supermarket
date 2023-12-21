// import React from 'react'
// import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {

//  const navigator =  useNavigate();

  return (
    <div>
      
      <h1>Login</h1>

      <button onClick={() => {
        navigator('/register');
      }}>Register</button>

    </div>
  )
}

export default Login