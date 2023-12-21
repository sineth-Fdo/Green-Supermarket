import "./Page Styles/Login.css";

const Login = () => {
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
                                <input type="email" placeholder="Email" className="text-fields"/>
                            </div>
                            <div className="input-div">
                                <input type="password" placeholder="Password" className="text-fields"/>
                            </div>
                            <div className="input-div login-space">
                                <input type="submit" value="Login" className="login-btn"/>
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