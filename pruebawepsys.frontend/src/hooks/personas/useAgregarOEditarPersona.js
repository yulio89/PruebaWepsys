import  { useState } from "react";
import axios from "axios";
import useErrorParser from "../shared/useErrorParser";
import { guardarPersona } from "../../endpoints/wepsysapi";

const useAgregarOEditarPersona = () => {
  const [error, setError] = useState("");
  const [parseApiError] = useErrorParser();

  const resetearValidacionServidor = () => {
    setError("");
  };

  const agregarOEditar = async (persona) => {
    resetearValidacionServidor();
    try {
      //LLAMO AL ENDPOINT
      const { data } = await axios.post(guardarPersona, persona);
      //PARSEO LA DATA
      return true;
    } catch (error) {
      setError(parseApiError(error));
      return false;
    }
  };

  return [agregarOEditar, error, resetearValidacionServidor];
};

export default useAgregarOEditarPersona;
