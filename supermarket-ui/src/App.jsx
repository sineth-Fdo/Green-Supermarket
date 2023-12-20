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




function App() {


  return (
  <>
  
 <Header/>

    <BrowserRouter>
    
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/manage" element={<Manage/>}/>
            <Route path="/cart" element={<Cart/>}/>

        </Routes>
    
    </BrowserRouter>
    
    <Footer/>
    
  </>
  )






        


}

export default App
