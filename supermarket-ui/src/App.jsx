import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Register'
import Register from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
<<<<<<< HEAD
import { Manage } from './components/Manage'
import './components/styles/login.css'
=======
import { Manage } from './Pages/Manage'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
>>>>>>> main



function App() {


  return (
  <>
<<<<<<< HEAD
  <div className='bg-img' style={{"backgroundImage": "url('../public/man-back.jpg"}}>
    <Login />
  </div>
=======
  
 <Header/>



    <BrowserRouter>
    
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/manage" element={<Manage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    
    </BrowserRouter>
    
    <Footer/>
>>>>>>> main
    
  </>
  )






        


}

export default App
