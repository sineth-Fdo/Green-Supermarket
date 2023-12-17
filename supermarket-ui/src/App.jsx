import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import { Manage } from './components/Manage'
import Home from './Pages/Home'



function App() {


  return (
  <>
  
   <Header/>
   <Home/>


    <BrowserRouter>
    
        <Routes>

            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/manage" element={<Manage/>}/>
            <Route path="/home" element={<Home/>}/>
        </Routes>
    
    </BrowserRouter>
    
    <Footer/>
    
  </>
  )






        


}

export default App
