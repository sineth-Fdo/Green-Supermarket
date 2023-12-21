import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Login from './components/Login'
// import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import { Manage } from './Pages/Manage'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ManageCategory from './Pages/ManageCategory'
import ViewProduct from './Pages/ViewProduct'
import ViewOrders from './Pages/ViewOrders'
import AddProduct from './Pages/AddProduct'



function App() {


  return (
  <>
  
<Header/>

    <BrowserRouter>
    
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/viewproduct" element={<ViewProduct/>}/>
            <Route path="/manage" element={<Manage/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/managecategory" element={<ManageCategory/>}/>
            <Route path="/order" element={<ViewOrders/>}/>
            <Route path="/addProduct" element={<AddProduct/>}/>
        </Routes>
    
    </BrowserRouter>
    
    <Footer/>
    
  </>
  )






        


}

export default App
