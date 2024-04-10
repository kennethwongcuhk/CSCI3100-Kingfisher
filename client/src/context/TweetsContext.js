import { createContext, useReducer } from "react";

export const TweetsContext = createContext()

export const tweetsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TWEETS':
      return {
        tweets: action.payload
      }
    case 'CREATE_TWEET':
      return {
        tweets: [action.payload, ...state.tweets]
      }
    case 'DELETE_TWEET':
      return {
        tweets: state.tweets.filter((tweet) => tweet._id !== action.payload._id)
      }
    default:
      return state
  }
} 

export const TweetsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tweetsReducer, {
    tweets: null
  })

  return (
    <TweetsContext.Provider value={{...state, dispatch}}>
      { children }
    </TweetsContext.Provider>
  )
}