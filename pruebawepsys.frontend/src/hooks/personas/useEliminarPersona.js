import  { useState } from "react";
import axios from "axios";
import useErrorParser from "../shared/useErrorParser";
import { eliminarPersona } from "../../endpoints/wepsysapi";

const useEliminarPersona = () => {
  const [error, setError] = useState("");
  const [parseApiError] = useErrorParser();
  const resetearValidacionServidor = () => { 
    setError("")
   }
  const eliminarPer = async (personaAEliminar) => {
    resetearValidacionServidor();
    try {
      //LLAMO AL ENDPOINT
      const { data } = await axios.delete(
        `${eliminarPersona}/${personaAEliminar.id}`, {}
      );
      //PARSEO LA DATA
      return true;
    } catch (error) {
      setError(parseApiError(error));
      return false;
    }
  };
  return [eliminarPer,error,resetearValidacionServidor];
};

export default useEliminarPersona;
