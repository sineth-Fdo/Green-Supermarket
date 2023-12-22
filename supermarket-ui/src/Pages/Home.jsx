import CategoriesCard from "../components/CategoriesCard";
import HomeItemCard from "../components/HomeItemCard";
import "./Page Styles/Home.css"
import { useLocation } from 'react-router-dom';

const Home = () => {

    const location = useLocation();
    const responseId = location.state && location.state.response;

    return(

        <div className="home-div">
            <div className="hero-section">
                <div className="hero-image">
                    <div className="hero-content">
                        <h1>Welcome to Green Supermarket</h1>
                        <p>Best place to buy your groceries</p>
                        <p>{responseId}</p>
                
                    </div>
                </div>
            </div>

            <div className="popular-vege">
                <CategoriesCard customerId = {responseId} />
                
            </div>

            <div className="popular-cate">
                <HomeItemCard/>
            </div>

        </div>
    );
}
export default Home;