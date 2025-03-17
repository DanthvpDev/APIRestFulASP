using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductosApi.Data;
using ProductosApi.DTOs;
using ProductosApi.Models;
using System.Runtime.ConstrainedExecution;
using System;

namespace ProductosApi.Controllers
{
    [ApiController]
    [Route("api/ventas")]
    public class VentaController:ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;

        public VentaController(ApiDbContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Este método se encarga de obtener todas lass ventas que se encuentran en la base de datos
        /// </summary>
        /// <returns>En caso de que las ventas no existan, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna una lista con las ventas</returns>
        ///<exception cref = "DivideByZeroException" > Si la venta no existe.</exception>
        [HttpGet]
        public async Task<ActionResult<List<VentaDetalleDTO>>> GetAll() {
            var ventas = await _context.Ventas
                                    .Include(v=>v.Cliente)
                                    .Include(v=>v.DetallesVenta)
                                        .ThenInclude(d=>d.Producto)
                                    .ToListAsync();
            if(ventas == null) return NotFound();
            var dto = _mapper.Map<List<VentaDetalleDTO>>(ventas);
            return dto;
        }

        /// <summary>
        /// Este metodo se encarga de obtener la información de una venta en especifico basandose en un ID recibido
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID de la venta que se quiere obtener</param>
        /// <returns>En caso de que la venta no exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un objeto con la información de la venta</returns>
        ///<exception cref = "DivideByZeroException" > Si la venta no existe.</exception>
        [HttpGet("{id}", Name = "ObtenerVenta")]
        public async Task<ActionResult<VentaDetalleDTO>> GetById(int id)
        {
            var venta = await _context.Ventas
                                    .Include(v => v.Cliente)
                                    .Include(v => v.DetallesVenta)
                                        .ThenInclude(d => d.Producto)
                                    .FirstOrDefaultAsync(v=>v.Id==id);
            if (venta == null) return NotFound();

            var dto = _mapper.Map<VentaDetalleDTO>(venta);
            return dto;
        }

        /// <summary>
        /// Este metodo se encarga de crear una venta
        /// </summary>
        /// <param name="ventaCrearDTO"> Este parámetro obtiene un objeto cno la información de la venta y sus detalles</param>
        /// <returns>En caso de que la los productos o clientes no existan, o en caso de que no se haya generado correctamente la venta, se retorna un mensaje que indica el error, en caso de que todo salga bien retorna una respuesta 201 e incluye en el encabezado la nueva URL</returns>
        ///<exception cref = "DivideByZeroException" > Si los clientes o los productos no existen o si la venta no fue creada correctamente</exception>
        [HttpPost]
        public async Task<ActionResult> Create(VentaCrearDTO ventaCrearDTO)
        {
            int res = await validarLlaves(ventaCrearDTO);

            if (res == 1) return BadRequest("Existen productos que no estan registrados");

            if (res == 2) return BadRequest("El cliente no existe");

            var venta = _mapper.Map<Venta>(ventaCrearDTO);

            _context.Add(venta);
            await _context.SaveChangesAsync();
            venta = await _context.Ventas
                                    .Include(v => v.Cliente)
                                    .Include(v => v.DetallesVenta)
                                        .ThenInclude(d => d.Producto)
                                    .FirstOrDefaultAsync(v => v.Id == venta.Id);
            if(venta == null) return BadRequest("No se guardado la venta correctamente.");
            var dto = _mapper.Map<VentaDetalleDTO>(venta);
            return new CreatedAtRouteResult("ObtenerVenta", new { id = venta.Id }, dto);
        }

        /// <summary>
        /// Este metodo se encarga de actualizar una venta en especifico basandose en un ID recibido
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID de la venta que se quiere remover</param>
        /// <param name="ventaCrearDTO"> Este parametro recibe un objeto con la información ingresada por el usuario</param>
        /// <returns>En caso de que la los productos o clientes no existan, o en caso de que no se haya generado correctamente la venta, se retorna un mensaje que indica el error, en caso de que todo salga bien retorna una respuesta 201</returns>
        ///<exception cref = "DivideByZeroException" > Si los clientes o los productos no existen o si la venta no fue creada correctamente</exception>
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, VentaCrearDTO ventaCrearDTO)
        {
            int res = await validarLlaves(ventaCrearDTO);

            if (res == 1) return BadRequest("Existen productos que no estan registrados");

            if (res == 2) return BadRequest("El cliente no existe");

            var ventaBD = await _context.Ventas
                                    .Include(x => x.Cliente)
                                    .Include(x => x.DetallesVenta)
                                    .FirstOrDefaultAsync(x => x.Id == id);

            if (ventaBD == null) return NotFound();

            ventaBD = _mapper.Map(ventaCrearDTO, ventaBD);
            
            
            await _context.SaveChangesAsync();
            return NoContent();

        }

        private async Task<int> validarLlaves(VentaCrearDTO ventaCrearDTO) {
            var productoIds = await _context.Productos.Where(p => !p.Borrado).Select(p => p.Id).ToListAsync();

            bool todosProductosExisten = ventaCrearDTO.Detalles
                .All(item => productoIds.Contains(item.ProductoId));

            if (!todosProductosExisten) return 1;

            bool existeCliente = await _context.Clientes.AnyAsync(c => c.Id == ventaCrearDTO.ClienteId && !c.Borrado);

            if (!existeCliente) return 2;

            return 0;
        }

        /// <summary>
        /// Este metodo se encarga de eliminar una venta en especifico basandose en un ID recibido
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID de la venta que se quiere remover</param>
        /// <returns>En caso de que la venta no exista o ya se haya canselado, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un NoContent que informa un 204 de exito</returns>
        ///<exception cref = "DivideByZeroException" > Si la venta no existe.</exception>


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var venta = await _context.Ventas.Where(v => v.Id == id && v.EstadoV == "PENDIENTE").FirstOrDefaultAsync();

            if (venta == null)
            {
                return BadRequest("La venta no existe o esta ya fue cancelada");
            }

            _context.Remove(venta);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
