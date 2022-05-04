import {
  Alert,
  Card,
  CardContent,
  InputAdornment,
  Pagination,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import usePersonas from "../hooks/personas/usePersonas";
import "../styles/Personas.css";
import EliminarPersona from "./EliminarPersona";
import AgregarOEditarPersona from "./AgregarOEditarPersona";

const Personas = () => {
 
  const [mensageGral, setMensageGral] = useState("");

  const [
    handlePageChange,
    handleOnChangeFiltrer,    
    pagina,
    loadPersonas,
    personas,
    cantidadTotalDePersonas,
    error,
    paginacion,
    
  ] = usePersonas();

  useEffect(() => {
    loadPersonas();
  }, [pagina, paginacion.filtro]);

  
  return (
    <div className="container">
      <div className="titleContainer">
        <h1>Listado de Personas</h1>

        <div>
          <AgregarOEditarPersona
            procExitoso={(exito) => setMensageGral(exito)}
            cargarListadoDePersonas={loadPersonas}
            modo="crear"
            tamano="large"
          />
        </div>
      </div>
      <Card style={{ minWidth: 400 }}>
        <CardContent>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            
            <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom:"15px" }}>
                    <TextField
                      id="input-with-icon-textfield"
                      label="Buscar"
                      size="small"
                      variant="outlined"
                      value={paginacion.filtro}
                      onChange={handleOnChangeFiltrer}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
              {personas.length > 0 ? (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Nombre</TableCell>
                          <TableCell>Apellido</TableCell>
                          <TableCell>Correo</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {personas.map((persona) => (
                          <TableRow key={persona.id}>
                            <TableCell>{persona.id}</TableCell>
                            <TableCell>{persona.nombre}</TableCell>
                            <TableCell>{persona.apellido}</TableCell>
                            <TableCell>{persona.email}</TableCell>
                            <TableCell>
                              <AgregarOEditarPersona
                                personaAEditar={persona}
                                procExitoso={(exito) => setMensageGral(exito)}
                                cargarListadoDePersonas={loadPersonas}
                                modo="Editar"
                                tamano="small"
                              />
                              <EliminarPersona
                                procExitoso={(exito) => setMensageGral(exito)}
                                personaAEliminar={persona}
                                cargarListadoDePersonas={loadPersonas}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Pagination
                    style={{ marginTop: 15 }}
                    count={Math.ceil( cantidadTotalDePersonas / paginacion.paginacionTomar )}
                    page={pagina}
                    onChange={handlePageChange}
                  />
                </>
              ) : (
                "No hay personas para mostrar."
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={mensageGral === "" ? false : true}
        autoHideDuration={5000}
        onClose={() => {
          setMensageGral("");
        }}
      >
        <Alert
          onClose={() => {
            setMensageGral("");
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          {mensageGral}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Personas;
