import { Dialog, DialogTitle, DialogContent,IconButton, Button, DialogContentText, DialogActions, Alert } from '@mui/material';
import DeleteIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect, useState } from 'react'
import useEliminarPersona from '../hooks/personas/useEliminarPersona';

const EliminarPersona = ({personaAEliminar,cargarListadoDePersonas,procExitoso,procError}) => {
  const [eliminarPer,error,resetearValidacionServidor] = useEliminarPersona();
  const [modalAbierto, setModalAbierto] = useState(false);


  useEffect(() => {
    resetearValidacionServidor();
  }, [modalAbierto])
  const manejarEliminacion = async () => {
   
    const eliminadoSatisfactorio =await eliminarPer(personaAEliminar);
    if(eliminadoSatisfactorio){
      await cargarListadoDePersonas();
      setModalAbierto(false); 
      procExitoso(`La persona con id ${personaAEliminar.id} fue eliminada satisfactoriamente`);
    }
  }
  
  return (
    <>
     <IconButton aria-label="delete" onClick={() => setModalAbierto(estadoAnterior => !estadoAnterior)} size="medium">
             <DeleteIcon fontSize="inherit" />
       </IconButton>
      <Dialog
        open={modalAbierto}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Eliminación de Persona
        </DialogTitle>
        <DialogContent>          
          <DialogContentText id="alert-dialog-description">
          {error?  <Alert severity="error">{error}</Alert>:null}      
          ¿Esta seguro/a que desea eliminar al Sr/a {personaAEliminar.nombre+" "+ personaAEliminar.apellido}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  variant="contained" color="info"  onClick={() => { setModalAbierto(false) }}>Cancelar</Button>
          <Button  variant="contained" color="error" onClick={manejarEliminacion} autoFocus>  ¡SI!</Button>
        </DialogActions>
      </Dialog>
    </>
    
  )
}

export default EliminarPersona