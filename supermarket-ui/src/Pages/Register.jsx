import "./Page Styles/Register.css";

const Register = () => {
    return(
        <div className="register-page">
             <div className="register-form-div">
                <div className="register-form">
                    <div className="form-image-div">
                        <img src="../public/hero2.jpg" alt="" className="div-img"/>
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
                                <input type="text" placeholder="Full Name" className="text-fields"/>
                            </div>
                            
                            <div className="input-div">
                                <input type="email" placeholder="Email" className="text-fields"/>
                            </div>

                            <div className="input-div">
                                <input type="password" placeholder="Password" className="text-fields"/>
                            </div>

                            <div className="input-div">
                                <input type="password" placeholder="Confirm Password" className="text-fields"/>
                            </div>
                            <div className="input-div veri-space">
                                <input type="submit" value="Verification Code" className="register-btns"/>
                            </div>

                            

                            <div className="verification-field">
                                <div className="input-div">
                                    <input type="text" placeholder="Enter the Verification code" className="text-fields"/>
                                </div>
                                <div className="input-div ">
                                    <input type="submit" value="Register" className="register-btns"/>
                                </div>
                                
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