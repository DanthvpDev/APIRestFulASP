using System.ComponentModel.DataAnnotations;

namespace ProductosApi.Models
{
    public class Proveedor
    {

        public int Id { get; set; }

        [MaxLength(100, ErrorMessage = "El campo {0} no puede tener más de 100 caracteres.")]
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public required string Nombre { get; set; }

        [EmailAddress(ErrorMessage = "El formato del correo electrónico no es válido.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio.")]
        [RegularExpression(@"^\d{8}$", ErrorMessage = "El número de teléfono debe tener exactamente 8 dígitos.")]
        public required string Telefono { get; set; }

        public List<Producto> Productos { get; set; } = new List<Producto>();

    }
}
