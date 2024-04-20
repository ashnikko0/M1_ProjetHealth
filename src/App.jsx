import "./index.css";

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'
import axios from 'axios';

import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import ClientDetails from './components/ClientDetails.jsx';

function PrivateRoute({ children }) {

  const [cookies, setCookie, removeCookie] = useCookies(['user_data'])
  const navigate = useNavigate();

  if (cookies.user_data === undefined) {
    return <Navigate to="/login"/>;
  } else if (cookies.user_data.token_expiration_date <= Date.now() + 90000) { // Refresh token if less than 90 seconds

    const api = "https://health.shrp.dev/auth/refresh";

      axios.post(api, { "refresh_token": cookies.user_data.refresh_token, "mode": "json" })
      .then(function (response) {

        setCookie("user_data", {
          "email": d.email,
          "auth_token": response.data.data.access_token,
          "token_expiration_date": Date.now() + response.data.data.expires,
          "refresh_token": response.data.data.refresh_token,
        }, { path: '/' });

      })
      .catch(function (error) {
        removeCookie("user_data", { path: '/' });
        return <Navigate to="/timeout" />;
      });

  }

  return <>

    <div className='logout-button'>
      {<p>{<b>{cookies.user_data.email}</b>} est connecté</p>}
      <button onClick={() => { 
        removeCookie("user_data");
        navigate("/");
        }}>
        Déconnexion
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
