import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from "axios";

import logo from "../assets/logo.png";
import login from "../assets/login.svg";

function Login() {
  
  const { authError } = useParams();

  const [isError, setIsError] = useState(false);
  const [cookies, setCookie] = useCookies(['user_data'])
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();


  const onSubmit = (d) => {

      const api = "https://health.shrp.dev/auth/login";

      axios.post(api, d)
      .then(function (response) {

        setIsError(false);

        setCookie("user_data", {
          "email": d.email,
          "auth_token": response.data.data.access_token,
          "token_expiration_date": Date.now() + response.data.data.expires,
          "refresh_token": response.data.data.refresh_token,
        }, { path: '/' });

        navigate("/dashboard");
      })
      .catch(function (error) {
        setIsError(true);
      });

  };
  
  return (
    
    <>
    <div className="titlefit">
      <span className="titlebarre"></span>
      <div className="fitready">Fit'Ready</div>
      <span className="titlebarre"></span>
    </div>

    <img src={logo} alt="Logo" className="logo" />
    <h1>Connexion</h1>
    

    <form onSubmit={handleSubmit(onSubmit)}>

      <p className="error-p">
        {authError === "timeout" && <>Session expirée, veuillez vous reconnecter.</>}
        {authError === "login" && <>Page inaccessible, veuillez vous connecter.</>}
        {isError && <>Email ou mot de passe incorrect.</>}
      </p>

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