import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";

import "../index.css";
import logo from "../assets/logo.png";
import login from "../assets/login.svg";

function Login() {
  
  const { authError } = useParams();

  const [isError, setIsError] = useState(false);
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();


  const onSubmit = (d) => {

      const api = "https://health.shrp.dev/auth/login";

      axios.post(api, d)
      .then(function (response) {

        setIsError(false);

        localStorage.setItem("user_data", JSON.stringify({
          "email": d.email,
          "auth_token": response.data.data.access_token,
          "token_expiration_date": Date.now() + response.data.data.expires,
          "refresh_token": response.data.data.refresh_token,
        }));

        navigate("/dashboard");
      })
      .catch(function (error) {
        setIsError(true);
      });

  };
  
  return (
    
    <>
    
    <img src={logo} alt="Logo" className="logo" />

    <h1>Connexion</h1>

    <form onSubmit={handleSubmit(onSubmit)}>

      {authError === "timeout" && <div>Session expirée, veuillez vous reconnecter.</div>}
      {authError === "login" && <div>Page inaccessible, veuillez vous reconnecter.</div>}
      {isError && <div>Email ou mot de passe incorrect.</div>}

      <div>
        <label>
          <input className="inputSaisie" placeholder="Adresse mail" {...register("email")} />
        </label>
      </div>
      
      <div>
        <label>
          <input className="inputSaisie" placeholder="Mot de passe" type="password" {...register("password")} />
        </label>
      </div>

      <div>
        <input className="loginSubmit" type="image" src={login} alt="Connexion"></input>
      </div>
      
    </form>
    
    </>
    
  )
}

export default Login;