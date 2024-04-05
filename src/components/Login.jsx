import { useForm } from "react-hook-form";
import axios from "axios";

import "../index.css";
import logo from "../assets/logo.png";

function Login() {

  
  const {register, handleSubmit} = useForm();
  const onSubmit = (d) => {

    const api = "https://health.shrp.dev/auth/login";

    axios.post(api, d.getValues()
    ).then(function(response) {
      console.log('Authenticated');
  }).catch(function(error) {
      console.log('Error on Authentication');
  });


  };
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src={logo} alt="Logo" className="logo" />

      <div>
      <label>
        <h1>Connexion</h1>
        <p>Nom d'utilisateur</p>
        <input className="inputSaisie" {...register("username")} />
      </label>
      </div>
      
      <div>
      <label>
      <p>Mot de passe</p>
        <input className="inputSaisie" type="password" {...register("password")} />
      </label>
      </div>

      <div>
      <input type="submit" value="Connexion"></input>
      </div>
      
    </form>
    
  )
}

export default Login;