import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Alert,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import AddBox from "@mui/icons-material/AddBox";
import React, { useEffect, useRef, useState } from "react";
import useAgregarOEditarPersona from "../hooks/personas/useAgregarOEditarPersona";

const AgregarOEditarPersona = ({
  modo,
  tamano,
  personaAEditar,
  cargarListadoDePersonas,
  procExitoso}) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [agregarOEditar, error,resetearValidacionServidor] = useAgregarOEditarPersona();
  const valoresIniciales = modo == "Editar" ? personaAEditar : {nombre:"",apellido:"",email:""};


  useEffect(() => {
    resetearValidacionServidor();
  }, [modalAbierto])
  

  const manejarGuardado = async (personaAEditar) => {
   const guardadoSatisfactorio =await agregarOEditar(personaAEditar);
    
    if(guardadoSatisfactorio){    
      await cargarListadoDePersonas();
      setModalAbierto(false);
      procExitoso("La persona fue guardada satisfactoriamente.");
    }
  };
  return (
    <>
      <IconButton
        aria-label="delete"
        size={tamano}
        onClick={() => {
          setModalAbierto((estadoPrev) => !estadoPrev);
        }}
      >
        {modo == "Editar" ? (
          <EditIcon fontSize="inherit" />
        ) : (
          <AddBox fontSize="inherit" />
        )}
      </IconButton>

      <Dialog maxWidth="xs" fullWidth={true} open={modalAbierto}>
        <DialogTitle id="alert-dialog-title" style={{textAlign:"center", borderBottom:"1px solid lightgray", paddingBottom:2, marginBottom:10}}>
          {modo == "Editar" ? (
            <>
              Editar a {personaAEditar.nombre} {personaAEditar.apellido}
            </>
          ) : (
            <>Agregar Persona</>
          )}
        </DialogTitle>
        <DialogContent>
            {error?  <Alert severity="error">{error}</Alert>:null}      
            <Formik
              validationSchema={personaSchema}
              initialValues={valoresIniciales}
              onSubmit={ (values) => {
                manejarGuardado(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <Field
                      name="nombre"
                      className="form-control"
                      placeholder="Ej. Jose"
                    />
                    <ErrorMessage name="nombre" className="errormsg" component="b"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <Field
                      name="apellido"
                      className="form-control"
                      placeholder="Ej. Perez"
                    />
                    <ErrorMessage name="apellido" className="errormsg" component="b" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      className="form-control"
                      placeholder="Ej. ejemplo@gmail.com"
                      type="email"
                    />
                    <ErrorMessage name="email" className="errormsg" component="b"/>
                  </div>

                  <div style={{padding:10, display:"flex", justifyContent:"right"}}>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => {
                        setModalAbierto(false);
                      }}
                      style={{marginRight:5}}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      autoFocus
                    >
                      
                      ¡Guardar!
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
       
        </DialogContent>
      </Dialog>
    </>
  );
};
const personaSchema = Yup.object().shape({
  nombre: Yup.string().required("el nombre es requerido para continuar."),
  apellido: Yup.string().required("El apellido es requerido para continuar."),
  email: Yup.string()
    .email("Debe ingresar un correo valido para continuar")
    .required("El correo es requerido para continuar."),
});
export default AgregarOEditarPersona;
