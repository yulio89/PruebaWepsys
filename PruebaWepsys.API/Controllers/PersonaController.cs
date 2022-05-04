using Microsoft.AspNetCore.Mvc;
using PruebaWepsys.API.DTOs;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PruebaWepsys.API.Controllers
{
    [ApiController]
    public class PersonaController : ControllerBase
    {
        private readonly IServicioPersona _servicioPersona;

        public PersonaController(IServicioPersona servicioPersona)
        {
            _servicioPersona = servicioPersona;
        }
        [HttpGet("api/obtenerPersonas")]
        public async Task<ActionResult> ObtenerPersonas(string? filtro = "", int? paginacionTomar = 50, int? paginacionSaltar = 0)
        {

            List<Persona> listaDePersonas = new();
            int cantidadTotalDePersonas = 0;
            string error = null;

            await _servicioPersona.ListarPersonasAsync(filtro ==null?"": filtro, (int)paginacionSaltar, (int)paginacionTomar,
            (listaPer, cantPer) => (listaDePersonas, cantidadTotalDePersonas) = (listaPer, cantPer),
            err => error = err);

            if (!String.IsNullOrEmpty(error)) return BadRequest(error);
            else  return Ok(new { listaDePersonas,cantidadTotalDePersonas });
        }

        [HttpPost("api/guardarPersona")]
        public async Task<ActionResult> GuardarPersona([FromBody] PersonaDTO persona)
        {
            Persona personaAGuardar = new() { 
                ID = persona.ID,
                Nombre = persona.Nombre,
                Apellido = persona.Apellido,
                Email = persona.Email
            };
            string error = null;

            await _servicioPersona.GuardarPersonaAsync(personaAGuardar,
                persona => personaAGuardar = persona,
                errorMsg => error = errorMsg);

            if (!String.IsNullOrEmpty(error)) return BadRequest(error);
            else return Ok(new { personaAGuardar });

        }

        [HttpDelete("api/eliminarPersona/{personaId}")]
        public async Task<ActionResult> EliminarPersona(int personaId)
        {

            string exito = null;
            string error = null;

            await _servicioPersona.EliminarPersonaAsync(personaId,
                exitoMsg => exito = exitoMsg,
                errorMsg => error = errorMsg);

            if (!String.IsNullOrEmpty(error)) return BadRequest(error);
            else return Ok(exito);

        }

    }
}
