
import '../Pages/Page Styles/Shop.css'
import ProductCard from '../components/ProductCard'

const Shop = () => { 
  return (
    <div className="shop-big-container">
        <div className="shop-top-container">
            <div className="shop-top-image">
              <h1>Snacks</h1>
            </div>
        </div>

        <center>
                <br /><br />
                <h1>Shop By Category</h1>
                <br /><br />
        </center>
        <div className='shop-container'>

  
              <div className="sidebar-category">
                  <h3 className='category-text-head'>Categories</h3>
                  <ul>
                    <li>Vegetables</li>
                    <li>Fruits</li>
                    <li>Meat</li>
                    <li>Seafood</li>
                    <li>Drinks</li>
                    <li>Snacks</li>
                    <li>Others</li>
                  </ul>
              </div>

            <div className="shop-hero">


                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            

      
            </div>


        </div>
      
    </div>
  )
}

export default Shop
