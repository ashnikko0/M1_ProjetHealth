import { useForm } from "react-hook-form";

function Login() {

  const {register, handleSubmit} = useForm();
  const onSubmit = (d) => alert(JSON.stringify(d));
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
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