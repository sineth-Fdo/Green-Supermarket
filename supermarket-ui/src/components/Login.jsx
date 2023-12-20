import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../components/styles/login.css'
import user_icon from '../assets/login-icons/person.png'
import email_icon from '../assets/login-icons/email.png'
import password_icon from '../assets/login-icons/password.png'

const Login = () => {

 const navigator =  useNavigate();
 
 const [action,setAction] =useState("Register");

  return (
    <div>
      <div className="login">
        <h1 className="login-text">{action}</h1>
        <form className="form-text" action="">
        <div className="form-text-input">
          <img src={user_icon} alt="" />
          <input type="email" placeholder="Name" />
        </div>
        <div className="form-text-input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="form-text-input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
        <div>
          <div className="remember-me">
            <input type="checkbox" name="" id="" />
            <label htmlFor="Remember Me">Remember Me</label>
          </div>
        </div>
        <div className="submit-container" type="submit">Login</div>
        <div className="new-here">
          <span>New Here <Link className="new-here-link" to='Register'>Create an Acount</Link></span>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Login