using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductosApi.Data;
using ProductosApi.DTOs;
using ProductosApi.Models;

namespace ProductosApi.Controllers
{
    [ApiController]
    [Route("api/proveedores")]
    public class ProveedoresController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;

        public ProveedoresController(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        /// <summary>
        /// Este metodo se encarga de obtener todos los proveedores que se encuentran en la base de datos que no hayan sido eliminados
        /// </summary>
        /// <returns>En caso de que la venta no exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna una lista con los proveedores</returns>
        ///<exception cref = "DivideByZeroException" > Si el proveedor no existe.</exception>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProveedorDTO>>> GetAll()
        {
            try
            {
                var proveedores = await _context.Proveedores
                                        .Where(p => !p.Borrado) 
                                        .ToListAsync();

                if (proveedores is null) { return NotFound(); }

                var proveedorDTO = _mapper.Map<List<ProveedorDTO>>(proveedores);
                return proveedorDTO;
            }
            catch (Exception)
            {

                return BadRequest("Imposible recuperar los clientes, intente más tarde");
            }
        }


        /// <summary>
        /// Este metodo se encarga de obtener un proveedor en especifico basandose en un ID recibido
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID del proveedor que se quiere obtener</param>
        /// <returns>En caso de que el proveedor no exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un proveedor</returns>
        ///<exception cref = "DivideByZeroException" > Si la venta no existe</exception>
        [HttpGet("{id:int}", Name = "ObtenerProveedor")]
        public async Task<ActionResult<Proveedor>> GetById(int id)
        {
            try
            {
                var proveedor = await _context.Proveedores
                                        .Where(p => p.Id == id && !p.Borrado)
                                        .Include(p => p.Productos)
                                        .FirstOrDefaultAsync();

                if (proveedor == null) return NotFound();

                return proveedor;
            }
            catch (Exception)
            {

                return BadRequest("Imposible recuperar el cliente, intente más tarde");
            }
        }

        /// <summary>
        /// Este metodo se encarga de guardar un proveedor
        /// </summary>
        /// <param name="proveedorCrearDTO"> Este parametro recibe un objeto de tupo ProveedorCrearDTO con los datos del nuevo proveedor</param>
        /// <returns>Retorna una respuesta 201 e incluye en el encabezado la nueva URL</returns>
        [HttpPost]
        public async Task<ActionResult> Save([FromForm] ProveedorCrearDTO proveedorCrearDTO)
        {
            var proovedor = _mapper.Map<Proveedor>(proveedorCrearDTO);

            proovedor.Borrado = false;

            _context.Add(proovedor);
            await _context.SaveChangesAsync();

            var DTO = _mapper.Map<ProveedorDTO>(proovedor);
            return new CreatedAtRouteResult("ObtenerProveedor", new { id = proovedor.Id }, DTO);
        }

        /// <summary>
        /// Este metodo se encarga de actualizar la información de un proveedor en especifico basándose en un ID recibido
        /// </summary>
        /// <param name="id"> Este parámetro se encarga de facilitar o brindar el ID del proveedor que se quiere actualizar</param>
        /// <returns>En caso de que el proveedor exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un NoContent que informa un 204 de exito</returns>
        ///<exception cref = "DivideByZeroException" > Si la el proveedor no existe.</exception>
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromForm] ProveedorCrearDTO proveedorCrearDTO)
        {
            bool ExisteProveedor = await _context.Proveedores
                                        .AnyAsync(p => p.Id == id && !p.Borrado);

            if (ExisteProveedor)
            {
                var proveedor = _mapper.Map<Proveedor>(proveedorCrearDTO);

                proveedor.Id = id;
                proveedor.Borrado = false;

                _context.Update(proveedor);
                await _context.SaveChangesAsync();
                return NoContent();
            }

            return NotFound();

        }

        /// <summary>
        /// Este metodo se encarga de eliminar un proveedor en especifico basandose en un ID recibido
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID del proveedor que se quiere remover</param>
        /// <returns>En caso de que la venta no exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un NoContent que informa un 204 de éxito</returns>
        ///<exception cref = "DivideByZeroException" > Si el proveedor no existe.</exception>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var proveedor = await _context.Proveedores.FirstOrDefaultAsync(p => p.Id == id);

            if(proveedor == null) return NotFound();

            bool tieneProductos = await _context.Productos.AnyAsync(pr => pr.ProveedorId == id);

            if (tieneProductos)
            {
                proveedor.Borrado = true;
            }
            else
            {
                _context.Remove(proveedor);
            }
            await _context.SaveChangesAsync();
            return NoContent();
            
        }
    }
}
