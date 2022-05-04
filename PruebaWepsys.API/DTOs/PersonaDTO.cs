using System.ComponentModel.DataAnnotations;

namespace PruebaWepsys.API.DTOs;
public class PersonaDTO
{
    public int ID { get; set; }

    [Required(ErrorMessage ="El nombre de la persona es requerido para continuar.")]
    public string Nombre { get; set; }
    [Required(ErrorMessage = "El apellido de la persona es requerido para continuar.")]
    public string Apellido { get; set; }
    [Required(ErrorMessage = "El correo electronico de la persona es requerido para continuar.")]
    [EmailAddress(ErrorMessage = "El correo electronico de la persona debe ser valido para continuar.")]
    public string Email { get; set; }


}

