import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Login from './components/Login'
// import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import { Manage } from './Pages/Manage'
import Home from './Pages/Home'
import Shop from './Pages/Shop'




function App() {


  return (
  <>
  
 <Header/>

    <BrowserRouter>
    
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/manage" element={<Manage/>}/>

        </Routes>
    
    </BrowserRouter>
    
    <Footer/>
    
  </>
  )






        


}

export default App
