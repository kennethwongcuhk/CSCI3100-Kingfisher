import { useState } from "react";
import { Link } from 'react-router-dom'
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [invite, setInvite] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, username, password, invite)
  }

  return ( 
    <div className="outer-form">
      <div className="inner-form">
      <form className="signup" onSubmit={handleSubmit}>
        <h1>Kingfisher</h1>
        <p className="desc">Sign up to keep in touch with your friends and touch your friends blah blah blah</p>
        <input
        placeholder="Email"
        type="text" 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
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
        <input
        placeholder="Invite Code"
        type="text" 
        onChange={(e) => setInvite(e.target.value)}
        value={invite}
        />
        <span>Already have an account? </span><Link to="/login">Login</Link>
        <button disabled={isLoading || !!!email || !!!username || !!!password || !!! invite}>Sign up</button>
      </form>
      <div className="error-div">
        {error && <div className="error">{error}</div>}
      </div>
      </div>
    </div>
   );
}
 
export default Signup;