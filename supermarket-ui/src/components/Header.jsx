
import "./styles/Header.css"


const Header = () => {

    
  return (
    <header>
            
            <div className="nav-content">

                <div className="nav-logo">
                    <img src="../public/logo3.png" alt="logo" />
                </div>

                <div className="nav-links">
                    <ul>

                        <li className="links">
                            <a href="/login">Login</a>
                            <span className="divider-part"> | </span>
                            <a href="/register">Register</a>
                        </li>
                    </ul>
                </div>

            </div>
        
        </header>
  );
}

export default Header