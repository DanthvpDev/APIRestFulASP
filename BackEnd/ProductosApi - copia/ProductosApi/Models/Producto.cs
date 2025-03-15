using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductosApi.Models
{
    public class Producto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [MaxLength(50, ErrorMessage = "El nombre debe ser de máximo 50 caracteres")]
        public required string Nombre { get; set; }

        [Required(ErrorMessage = "El precio es obligatorio")]
        [Column(TypeName ="decimal(10,2)")]
        public decimal Precio { get; set; }

        public string Foto { get; set; }

        public bool Borrado { get; set; }=false;

        [Required(ErrorMessage = "El campo {0} es requerido")]
        public int ProveedorId { get; set; }
        Proveedor? Proveedor { get; set; }
    }
}
