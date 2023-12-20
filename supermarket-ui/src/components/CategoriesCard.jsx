import "./styles/CategoriesCard.css"

const CategoriesCard = () =>{
    return(
        <div className="category-section">
            <br /><br />
            <h1 className="main-header">Popular Categories</h1>
            <br />
            <div className="block-container">
                <div className="left-most-div common">
                    <img src="public\snacks.png" alt="snacks image" className="snacks-img"/>
                    <h3 className="snacks-text">Snacks</h3>
                </div>
                <div className="left-block">
                    <div className="top-cate common">
                        <img src="public\beauty.png" alt="Beauty Product Image" className="beauty-img"/>
                        <h3 className="beauty-text">Beauty Products</h3>
                    </div>
                    <div className="bottom-cate common">
                        <img src="public\fish.png" alt="Fish Image" className="fish-img"/>
                        <h3 className="fish-text">Fish</h3>
                    </div>
                </div>
                <div className="right-block">
                    <div className="left-cate common">
                        <img src="public\caba.png" alt="Cabbage" className="vege-img"/>
                        <h3 className="vege-text">Vegetables</h3>
                    </div>
                    <div className="right-cate common">
                        <img src="public\meat.png" alt="Raw meat" className="meat-img"/>
                        <h3 className="meat-text">Meat</h3>
                    </div>
                </div>
                </div>
        </div>
    );
}

export default CategoriesCard;
