import { useState } from "react";
import { Link } from 'react-router-dom'
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
  }

  return ( 
    <div className="outer-form">
      <div className="inner-form">
      <form className="login" onSubmit={handleSubmit}>
        <h1>Kingfisher</h1>
        <p className="desc">Log in to keep in touch with your friends and touch your friends blah blah blah</p>
        <input
        placeholder="Username"
        type="text" 
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        />
        <input
        placeholder="Password"
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
         <span>Don't have an account? </span><Link to="/signup">Signup</Link>
        <button disabled={isLoading || !!!username || !!!password}>Log in</button>
      </form>
      <div className="error-div">
        {error && <div className="error">{error}</div>}
      </div>
      </div>
    </div>
   );
}
 
export default Login;