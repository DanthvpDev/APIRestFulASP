using System.ComponentModel.DataAnnotations;

namespace ProductosApi.Models
{
    public class Venta
    {
        public int Id { get; set; }

        [DataType(DataType.Date)]
        public DateTime FechaVenta { get; set; }
        public int ClienteId { get; set; }

        public Cliente? Cliente { get; set; }

        [Required(ErrorMessage = "El campo{0} es requerido")]
        [MaxLength(15, ErrorMessage = "No puede sobrepasar los 15 caracteres")]
        public string EstadoV { get; set; } = "Pendiente";

        public List<DetalleVenta> DetallesVenta { get; set; } = new List<DetalleVenta>();
    }
}
