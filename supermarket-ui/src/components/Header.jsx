import React from 'react'
import "./styles/Header.css"

const Header = () => {
  return (
    <nav>
            <div className="upper-nav">
                <div className="nav-logo-div">
                <a href="#"><img src="../public/logo3.png" alt="logo" className="nav-logo"/></a>
                </div>
                {/* <div className="search-bar-nav">
                    <input type="text" placeholder="Search Products" className="search-bar"/>
                </div> */}

            <div className="nav-links">
              <ul>
                  <li>
                      <a href="#">Home</a>
                      <a href="#">Categories</a>
                      <a href="#">Packages</a>
                      <a href="#" className="">View Cart</a>
                      <a href="#">Login</a>
                      
                  </li>
              </ul>
            </div>
                
            </div>
            {/* <div className="lower-nav">
                <div className="dropdown">
                    
                </div>
                
            </div> */}
        </nav>
  )
}

export default Header