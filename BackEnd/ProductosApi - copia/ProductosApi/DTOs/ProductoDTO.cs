using System.ComponentModel.DataAnnotations;

namespace ProductosApi.DTOs
{
    public class ProductoDTO
    {
        public int Id { get; set; }

        public required string Nombre { get; set; }

       public decimal Precio { get; set; }

       public string Foto { get; set; }
    }
}
