import React, { useState } from 'react'

const useErrorParser = () => {

    const parseApiError = (error) => {
        let errorMessage = "";
        if (error.response?.data?.errors) {
            errorMessage = `${
              error.response.data ? Object.values(error.response.data.errors) : null //GETTING MODEL ANOTATIONS
            }`;
          } else if (error.response?.data) {
            errorMessage = error.response.data; //GETTING BAD REQUEST FROM .net action result
          } else {
            //Si no son ni anotaciones ni un badrequest pues....
           // errorMessage = "Ocurrio un error con el programa principal, intentelo mas tarde o contactese con el/la administrador/a."; 
           errorMessage= JSON.stringify(error.response)
          }

        return errorMessage;
    }
    

  return [parseApiError]
}

export default useErrorParser