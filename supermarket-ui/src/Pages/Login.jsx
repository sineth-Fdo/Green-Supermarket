import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Page Styles/Login.css";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        if (email === "ADMIN" && password === "ADMIN") {
          navigate('/manage', { state: { userEnteredText: 'ADMIN' } });
        } else {
          try {
            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('password', password);
      
            const response = await axios.post('http://localhost:8080/api/customer/login', formData, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            });

            console.log('API Response:', response);
      
            setResponse(`Welcome, ${response.data.id}!`);
            navigate(`/home`, { state: { response: `${response.data.id}` } });
            alert(response.data.id);
          } catch (error) {
            console.error('API Error:', error);
            setResponse('Authentication failed. Please check your credentials.');
        
          }
        }
      };
      

    return(
        <div className="login-page">
            <div className="login-form-div">
                <div className="login-form">
                    <div className="form-image-div">
                        <img src="../public/hero2.jpg" alt="" className="div-img"/>
                    </div>
                    <div className="form-content">
                        <form action="" className="login-input-form">
                            <div className="form-title">
                                <h1>Welcome to </h1>
                                <h1><span className="green-text">Green</span> Supermarket</h1>
                                <br />
                                <p>Continue with your login credentials</p>
                            </div>
                            
                            <div className="input-div">
                                <input type="email" placeholder="Email" className="text-fields" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-div">
                                <input type="password" placeholder="Password" className="text-fields"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="input-div login-space">
                                <input type="button" value="Login" className="login-btn" onClick={handleLogin}/>
                            </div>
                            <div className="input-div register-tag">
                                <p>Do not have an account ? <a href="/register">Register</a></p>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;