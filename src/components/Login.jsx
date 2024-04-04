import { useForm } from "react-hook-form";
import "./styles.css";

function Login() {

  
  const {register, handleSubmit} = useForm();
  const onSubmit = (d) => alert(JSON.stringify(d));
  
  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <h1>Connexion</h1>
        Username
        <input {...register("username")} />
      </label>
      <label>
        Password
        <input type="password" {...register("pasword")} />
      </label>

      <input type="submit" value="Login"></input>
    </form>
  )
}

export default Login;