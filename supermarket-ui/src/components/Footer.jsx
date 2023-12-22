
import './styles/Footer.css'

const Footer = () => {
  return (
    <>
        <footer>
        <div className="container-footer">
            <div className="row">
                <div className="footer-col">
                <img src="../public/logo3.png" alt="logo" className="logo"/>
                <p className="disc">Explore a world of freshness and savings at our supermarket. Discover quality products, unbeatable prices, and exceptional service for a delightful shopping experience.Shop with us today!
                    <br /><br /> <span className="op-hours">Opening hours : 8.00am - 10.00pm</span>
                </p>
                <div className="social-links">
                        <a href=""><i className="fab fa-facebook-f"></i></a>
                        <a href=""><i className="fab fa-twitter"></i></a>
                        <a href=""><i className="fab fa-instagram"></i></a>
                        <a href=""><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                
                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="">About Us</a></li>
                        <li><a href="">Our Services</a></li>
                        <li><a href="">Privacy & Policy</a></li>
                        <li><a href="">Affiliate Program</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="">FAQ</a></li>
                        <li><a href="">Shipping</a></li>
                        <li><a href="">Returns</a></li>
                        <li><a href="">Order Details</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="">Gampaha Branch</a></li>
                        <li><a href="">Kandana Branch</a></li>
                        <li><a href="">Ragama Branch</a></li>
                        <li><a href="">Homagama Branch</a></li>
                    </ul>
                    
                </div>

            </div>

            <div className="copyright-section">
                <div className="content">
                <p>Copyright &copy; 2023 Green Supermarket (Pvt) Ltd. All Rights Recieved </p>
                </div>
                
            </div>
            

        </div>
        </footer>
        
    </>
  )
}

export default Footer