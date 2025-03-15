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
        public DbSet<Proveedor> Proveedores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar la columna EstadoV con un valor por defecto y una restricción CHECK
            modelBuilder.Entity<Venta>()
                .Property(v => v.EstadoV)
                .HasDefaultValue("PENDIENTE"); 

            modelBuilder.Entity<Venta>()
                .ToTable(v => v.HasCheckConstraint("CHK_EstadoVenta", "EstadoV IN ('PENDIENTE', 'CANCELADO')"));
        }
    }
}
