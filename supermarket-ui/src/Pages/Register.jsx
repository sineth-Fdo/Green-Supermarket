import { useState } from "react";
import "./Page Styles/Register.css";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please check your password and try again.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/customer/save', {
        name: name,
        email: email,
        password: password,
      });

      alert(`Registration successful for ${response.data}!`);
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-div">
        <div className="register-form">
          <div className="form-image-div">
            <img src="../public/hero2.jpg" alt="" className="div-img" />
          </div>
          <div className="form-content">
            <form action="" className="register-input-form">
              <div className="form-title">
                <h1>Welcome to </h1>
                <h1><span className="green-text">Green</span> Supermarket</h1>
                <br />
                <p>Fill the below form to Sign in</p>
              </div>

              <div className="input-div">
                <input type="text" placeholder="Full Name" className="text-fields" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="input-div">
                <input type="email" placeholder="Email" className="text-fields" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="input-div">
                <input type="password" placeholder="Password" className="text-fields" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="input-div">
                <input type="password" placeholder="Confirm Password" className="text-fields" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className="input-div veri-space">
                <input onClick={handleRegister} type="button" value="Register" className="register-btns" />
              </div>

              <div className="input-div login-tag">
                <p>Your already have an account ? <a href="/login">Log In</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
