import "./Page Styles/ViewProduct.css"

const ViewProduct = () => { 
    return(
        <div className="viewproduct-div">
            <div className="product-div">
                <div className="upper-div">
                    <h1>Product Details</h1>
                </div>
                <div className="lower-div">
                    <div className="left-div">
                        <div className="product-image">
                            <img src="../public/tomato.png" alt="" className="pro-image"/>
                        </div>

                        <div className="product-info">
                            <h2 className="pro-name">Tomato</h2>
                            <h4 className="pro-price">Rs. 500</h4>
                            <div className="weight-info">
                                <p className="pro-weight">1 kg</p>
                            </div>

                        <form action="" className="pro-qty-add-n-sub">
                            <div className="qty-selector">
                                <button className="sub selector">-</button>
                                <p className="pro-qty">1</p>
                                <button className="add selector">+</button>
                            </div>
                            <div className="add-cart-btn-div">
                                <button type="submit" className="add-cart-btn">Add to Cart</button>
                            </div>
                        </form>

                        </div>

                    </div>

                    <div className="right-div">
                        <div className="right-upper">
                            <div className="upper-card">
                                <div className="card-img">
                                    <img src="../public/money.png" alt="" />
                                </div>
                                <div className="card-text">
                                    <p className="card-title">Free Delivery</p>
                                    <p className="card-des">For all orders</p>

                                </div>
                            </div>
                            <div className="upper-card">
                                <div className="card-img">
                                    <img src="../public/delivery.png" alt="" />
                                </div>
                                <div className="card-text">
                                    <p className="card-title">100% Money Back</p>
                                    <p className="card-des">Guaranteed Product Warrenty</p>
                                </div>
                            </div>
                            <div className="upper-card">
                                <div className="card-img">
                                    <img src="../public/safety.png" alt="" />
                                </div>
                                <div className="card-text">
                                    <p className="card-title">Safety & Secure</p>
                                    <p className="card-des">Contact Us Anytime</p>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;