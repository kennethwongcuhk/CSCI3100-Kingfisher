import { createContext, useReducer } from "react"

export const ColorContext = createContext()

export const colorReducer = (state, action) => {
  return {color: action.type}
}

export const ColorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(colorReducer, {
    color: 'default'
  })

  return (
    <ColorContext.Provider value={{...state, dispatch}}>
      { children }
    </ColorContext.Provider>
  )
}