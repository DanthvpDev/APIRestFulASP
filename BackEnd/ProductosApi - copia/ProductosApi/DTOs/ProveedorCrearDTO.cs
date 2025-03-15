namespace ProductosApi.DTOs
{
    public class ProveedorCrearDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public string Estado { get; set; }
        public List<ProductoCrearDTO> Productos { get; set; }
    }
}
