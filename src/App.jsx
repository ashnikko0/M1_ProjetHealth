import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import ClientDetails from './components/ClientDetails.jsx';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client/:id" element={<ClientDetails />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
