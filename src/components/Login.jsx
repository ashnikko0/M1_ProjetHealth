import { useForm } from "react-hook-form";
import axios from "axios";

import "../index.css";
import logo from "../assets/logo.png";

function Login() {
  
  const {register, handleSubmit} = useForm();
  const onSubmit = (d) => {

      const api = "https://pizzas.shrp.dev/auth/login";

      console.log(d);

      axios.post(api, d)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src={logo} alt="Logo" className="logo" />

      <div>
      <label>
        <h1>Connexion</h1>
        <p>Adresse mail</p>
        <input className="inputSaisie" {...register("email")} />
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