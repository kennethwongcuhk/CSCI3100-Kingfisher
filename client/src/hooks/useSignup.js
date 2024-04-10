import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, username, password, invite_code) => {
    setError(null)
    setIsLoading(true)
    username = username.trim()


    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, username, password, invite_code})
    })

    try {
      const json = await response.json()
      if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
      }
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json})
        setIsLoading(false)
      }
    } catch(err) {
      // console.log(typeof err);
      setError('Hmm... something went wrong.')
      setIsLoading(false)
    }
    // const json = await response.json()
    // if (!response.ok) {
    //   setIsLoading(false)
    //   setError(json.error)
    // }
    // if (response.ok) {
    //   localStorage.setItem('user', JSON.stringify(json))

    //   dispatch({type: 'LOGIN', payload: json})

    //   setIsLoading(false)
    // }
  }

  return { signup, isLoading, error }
}