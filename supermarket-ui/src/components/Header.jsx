import React from 'react'
import "./styles/Header.css"

const Header = () => {
  return (
    <header>
            
            <div className="nav-content">

                <div className="nav-logo">
                    <img src="public\logo3.png" alt="logo" />
                </div>

                <div className="nav-links">
                    <ul>
                        <li className="links"><a href="#">Home</a></li>
                        <li className="links"><a href="#">Categories</a></li>
                        <li className="links"><a href="#">Packages</a></li>
                        <li className="links"><a href="#">View Cart</a></li>
                        <li className="links"><a href="#">Login</a></li>
                    </ul>
                </div>

            </div>
        
        </header>
  );
}

export default Header