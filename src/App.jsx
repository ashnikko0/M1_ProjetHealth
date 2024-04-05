import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ClientList from './components/ClientCard.jsx'
import Login from './components/Login.jsx'
import TableauDeBord from './components/TableauDeBord.jsx'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TableauDeBord />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clients_list" element={<ClientList />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
