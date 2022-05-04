using Microsoft.EntityFrameworkCore;
using PruebaWepsys.Repositorio.Data;
using PruebaWepsys.Repositorio.Modelos;

namespace PruebaWepsys.Repositorio.Servicios;
public class ServicioPersona : IServicioPersona
{
    private readonly IDbContextFactory<PruebaWebsysDbContext> _websysContext;
    public ServicioPersona(IDbContextFactory<PruebaWebsysDbContext> websysContext)
    {
        _websysContext = websysContext;
    }
  
    public async Task GuardarPersonaAsync(Persona personaAGuardar, Action<Persona> ProcesoExitoso, Action<string> ProcesoConError)
    {
        try
        {
            using var context = await _websysContext.CreateDbContextAsync();


            bool emailEsUnico = await EmailEsUnico(personaAGuardar);
            if (!emailEsUnico) {
                ProcesoConError("Ya existe una persona con este correo electronico.");
                return;
            };

            context.Personas.Add(personaAGuardar);
            if (personaAGuardar.ID != 0)
            {
                #region Si el usuario facilita un ID puede que no sea un ID valido por lo que vamos a verificarlo antes de procesarlo.
                var persona = await BuscarPersonaPorIDAsync(personaAGuardar.ID);
                if (persona is null || persona.ID == 0)
                {
                    ProcesoConError("Esta persona no pudo ser actualizada pues no existe en la BD..");
                    return;
                }
                #endregion
                context.Entry(personaAGuardar).State = EntityState.Modified;
            }
            var result = await context.SaveChangesAsync();

            if (result == 0) ProcesoConError("Esta persona no pudo ser guardada, intentelo mas tarde...");
            if (result == 1) ProcesoExitoso(personaAGuardar);

        }
        catch (Exception ex)
        {
            ProcesoConError(ex.Message);
        }
    }

    public async Task ListarPersonasAsync(String filtro, int paginacionSaltar, int paginacionTomar, Action<List<Persona>, int> ProcesoExitoso, Action<string> ProcesoConError)
    {
        try
        {
            using var context = await _websysContext.CreateDbContextAsync();
            var personas = await context.Personas
                .Where(x => x.Apellido.Contains(filtro) || x.Nombre.Contains(filtro) || x.Email.Contains(filtro))
                .Skip(paginacionSaltar)
                .Take(paginacionTomar)
                .ToListAsync();

            var totalDePersonasEnDB = await context.Personas
                .Where(x => x.Apellido.Contains(filtro) || x.Nombre.Contains(filtro) || x.Email.Contains(filtro)).CountAsync();

            ProcesoExitoso(personas, totalDePersonasEnDB);

        }
        catch (Exception ex)
        {
            ProcesoConError(ex.Message);
        }
    }


    public async Task EliminarPersonaAsync(int personaId, Action<string> ProcesoExitoso, Action<string> ProcesoConError)
    {
        try
        {
            using var context = await _websysContext.CreateDbContextAsync();
            var personaAEliminar = await context.Personas.Where(x => x.ID == personaId).FirstOrDefaultAsync();
            if (personaAEliminar is null || personaAEliminar.ID == 0 )
            {
                ProcesoConError("Esta persona no existe en la BD.");
                return;
            }
            context.Personas.Remove(personaAEliminar);
            var result = await context.SaveChangesAsync();

            if (result == 0) ProcesoConError("La persona no pudo ser eliminada, intentelo mas tarde...");
            if (result == 1) ProcesoExitoso("La persona fue eliminada satisfactoriamente...");

        }
        catch (Exception ex)
        {
            ProcesoConError(ex.Message);
        }
    }

    /// <summary>
    /// Metodo encapsulado que permite verificar si el correo ya existe.
    /// </summary>
    /// <param name="personaAValidar"></param>
    /// <returns>Retorna TRUE si puede ser guardado, FALSE si no puede ser guardado pues ya existe alguien mas con este correo</returns>
    public async Task<bool> EmailEsUnico(Persona personaAVerificar)
    {
        using var context = await _websysContext.CreateDbContextAsync();
        var persona = await context.Personas.Where(x => x.Email.Equals(personaAVerificar.Email)).FirstOrDefaultAsync();

        if (persona is null || persona.ID == 0) return true; //Si no se encuentra una persona es que no existe nadie con ese correo electornico, por lo que puede guardarse

        if (persona.ID == personaAVerificar.ID) return true; // Si existe una persona con ese correo y es la misma persona que se esta intentando validar pues puede guardarse.

        return false; // Si llegamos a este punto es que existe una persona distinta a la que se esta validando con este correo.
    }

    private async Task<Persona> BuscarPersonaPorIDAsync(int personaId)
    {
        using var context = await _websysContext.CreateDbContextAsync();
        Persona persona = await context.Personas.Where(x => x.ID == personaId).FirstOrDefaultAsync();
        return persona;
    }
}

