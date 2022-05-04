import  { useState } from "react";
import axios from "axios";
import useErrorParser from "../shared/useErrorParser";
import { obtenerPersonas } from "../../endpoints/wepsysapi";

const usePersonas = () => {
  const [error, setError] = useState("");
  const [personas, setPersonas] = useState([]);
  const [cantidadTotalDePersonas, setCantidadTotalDePersonas] = useState(0);
  const [parseApiError] = useErrorParser();
  const [pagina, setPagina] = useState(1);
  const [paginacion, setPaginacion] = useState({
    filtro:"",
    paginacionTomar: 10,
    paginacionSaltar: 0,
  });

  const loadPersonas = async () => {
    setError("");
    try {
      //LLAMO AL ENDPOINT
      const { data } = await axios.get(
        `${obtenerPersonas}?filtro=${paginacion.filtro}&paginacionTomar=${paginacion.paginacionTomar}&paginacionSaltar=${paginacion.paginacionSaltar}`,
        {}
      );
      //PARSEO LA DATA
      const { listaDePersonas, cantidadTotalDePersonas } = data;
      setPersonas(listaDePersonas);
      setCantidadTotalDePersonas(cantidadTotalDePersonas);
    } catch (error) {
      setError(parseApiError(error));
    }
  };

  const handlePageChange = (event, value) => {
    setPaginacion({
      ...paginacion,
      paginacionSaltar: (value - 1) * paginacion.paginacionTomar,
    });
    setPagina(value);
  };
  const handleOnChangeFiltrer = (e) => {
    setPaginacion({
      ...paginacion,
      filtro: e.target.value,
    });
  };

  return [handlePageChange,handleOnChangeFiltrer,pagina,loadPersonas, personas,cantidadTotalDePersonas, error, paginacion];
};

export default usePersonas;
