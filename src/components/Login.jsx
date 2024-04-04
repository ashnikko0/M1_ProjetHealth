import { useForm } from "react-hook-form";
import "../index.css";

function Login() {

  
  const {register, handleSubmit} = useForm();
  const onSubmit = (d) => alert(JSON.stringify(d));
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <h1>Connexion</h1>
        Username
        <input className="inputSaisie" {...register("username")} />
      </label>
      <label>
        Password
        <input className="inputSaisie" type="password" {...register("password")} />
      </label>

      <input type="submit" value="Login"></input>
    </form>
  )
}

export default Login;