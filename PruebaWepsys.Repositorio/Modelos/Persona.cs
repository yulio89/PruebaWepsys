using System;
using System.Collections.Generic;

namespace PruebaWepsys.Repositorio.Modelos
{
    public partial class Persona
    {
        public int ID { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? Email { get; set; }
    }
}
