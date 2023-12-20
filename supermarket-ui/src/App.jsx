import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Register'
import Register from './components/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import { Manage } from './components/Manage'
import './components/styles/login.css'



function App() {


  return (
  <>
  <div className='bg-img' style={{"backgroundImage": "url('../public/man-back.jpg"}}>
    <Login />
  </div>
    
  </>
  )






        


}

export default App
