import './App.css'

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import ClientDetails from './components/ClientDetails.jsx';
import OverlayProfile from './components/OverlayProfile.jsx';

function PrivateRoute({ children }) {

  const navigate = useNavigate();

  const user_data = JSON.parse(localStorage.getItem("user_data"));

  if (user_data === null) {
    return <Navigate to="/login"/>;
  } else if (user_data.token_expiration_date <= Date.now() + 90000) { // Refresh token if less than 90 seconds

    const api = "https://health.shrp.dev/auth/refresh";

      axios.post(api, { "refresh_token": user_data.refresh_token, "mode": "json" })
      .then(function (response) {

        localStorage.setItem("user_data", JSON.stringify({
          "email": user_data.email,
          "auth_token": response.data.data.access_token,
          "token_expiration_date": Date.now() + response.data.data.expires,
          "refresh_token": response.data.data.refresh_token,
        }));
      })
      .catch(function (error) {
        console.log(error)
        localStorage.removeItem("user_data");
        return <Navigate to="/timeout" />;
      });

  }

  return <>

    <div>
      {/* {JSON.parse(localStorage.getItem("user_data")).email + " est connecté"} */}
      <button onClick={() => { 
        localStorage.removeItem("user_data");
        navigate("/");
        }}>
        Logout
      </button>
    </div>
    {children}
  </>;

}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:authError" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>}/>
        <Route path="/client/:id" element={
          <PrivateRoute>
            <ClientDetails />
          </PrivateRoute>}/>
      </Routes>
      
  </BrowserRouter>
  )
}
/* faire un cas pour tous les liens qui ne sont pas supportés (une genre de page erreur) */

export default App
