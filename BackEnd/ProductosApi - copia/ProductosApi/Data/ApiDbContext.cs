using Microsoft.EntityFrameworkCore;
using ProductosApi.Models;

namespace ProductosApi.Data
{
    public class ApiDbContext:DbContext
    {
        public ApiDbContext(DbContextOptions options):base(options) { }


        public DbSet<Producto> Productos { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Venta> Ventas { get; set; }
        public DbSet<DetalleVenta> DetallesVenta { get; set; }
    }
}
