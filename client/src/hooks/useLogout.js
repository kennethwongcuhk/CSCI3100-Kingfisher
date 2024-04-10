import { useAuthContext } from "./useAuthContext";
import { useTweetsContext } from "./useTweetsContext";

export const useLogout = () => {

  const { dispatch } = useAuthContext()
  const { dispatch: workoutsDispatch } = useTweetsContext()

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'})
    workoutsDispatch({type: 'SET_TWEETS', payload: null})
  }

  return { logout }
}