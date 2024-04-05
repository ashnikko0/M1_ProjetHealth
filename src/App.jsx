import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ClientList from './components/ClientList.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
