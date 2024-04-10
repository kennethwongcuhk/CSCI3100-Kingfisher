import { useContext } from "react";
import { ColorContext } from "../context/ColorContext";

export const useColorContext = () => {
  const context = useContext(ColorContext)

  if (!context) {
    throw Error('useColorContext must be used inside a ColorContextProvider')
  }

  return context
}