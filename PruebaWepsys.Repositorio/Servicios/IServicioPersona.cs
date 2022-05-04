using PruebaWepsys.Repositorio.Modelos;

namespace PruebaWepsys.Repositorio.Servicios;
    public interface IServicioPersona
    {
        Task EliminarPersonaAsync(int personaId, Action<string> ProcesoExitoso, Action<string> ProcesoConError);
        Task GuardarPersonaAsync(Persona personaAGuardar, Action<Persona> ProcesoExitoso, Action<string> ProcesoConError);
        Task ListarPersonasAsync(string filtro, int paginacionSaltar, int paginacionTomar, Action<List<Persona>, int> ProcesoExitoso, Action<string> ProcesoConError);
        Task<Boolean> EmailEsUnico(Persona personaAVerificar);

    }
