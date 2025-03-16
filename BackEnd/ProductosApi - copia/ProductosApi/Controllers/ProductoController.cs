using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductosApi.Data;
using ProductosApi.DTOs;
using ProductosApi.Models;
using ProductosApi.Services;

namespace ProductosApi.Controllers
{
    [ApiController]
    [Route("api/productos")]
    public class ProductoController:ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;
        private readonly IManejoArchivos _manejoArchivos;
        private readonly string contenedor = "productos";

        public ProductoController(ApiDbContext context,IMapper mapper,IManejoArchivos manejoArchivos)
        {
            _context = context;
            _mapper = mapper;
            _manejoArchivos = manejoArchivos;
        }

        /// <summary>
        /// Este metodo se encarga de obtener todos los productos que se encuentran en la base de datos que no hayan sido eliminados
        /// </summary>
        /// <returns>En caso no se obtengan los productos, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna una lista de productos</returns>
        ///<exception cref = "DivideByZeroException" > Si el producto no existe</exception>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetAll() {
            try
            {
                var productos=await _context.Productos
                                        .Where(p=>!p.Borrado)
                                        .Include(p=>p.Proveedor)
                                        .ToListAsync();
                if (productos is null) { return NotFound(); }
                var productosDto=_mapper.Map<List<ProductoDTO>>(productos);
                return productosDto;
            }
            catch (Exception)
            {

                return BadRequest("Imposible recuperar los productos, intente más tarde");
            }
        }

        /// <summary>
        /// Este metodo se encarga de obtener todos los productos que se encuentran en la base de datos que hayan sido eliminados
        /// </summary>
        /// <returns>En caso no se obtengan los productos, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna una lista de productos</returns>
        ///<exception cref = "DivideByZeroException" > Si el producto no existe</exception>
        [HttpGet("borrados")]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> GetAllBorrados()
        {
            try
            {
                var productos = await _context.Productos
                                        .Where(p => p.Borrado)
                                        .Include(p => p.Proveedor)
                                        .ToListAsync();
                if (productos is null) { return NotFound(); }
                var productosDto = _mapper.Map<List<ProductoDTO>>(productos);
                return productosDto;
            }
            catch (Exception)
            {

                return BadRequest("Imposible recuperar los productos, intente más tarde");
            }
        }
        /// <summary>
        /// Este metodo se encarga de obtener todos los productos por ID que se encuentran en la base de datos que no hayan sido eliminados
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID del prducto que se quiere obtener</param>
        /// <returns>En caso de que el producto no exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un producto</returns>
        ///<exception cref = "DivideByZeroException" > Si el producto no existe</exception>
        [HttpGet("{id:int}",Name ="ObtenerProducto")]
        public async Task<ActionResult<ProductoDTO>> GetById(int id)
        {
            try
            {
                var producto = await _context.Productos.Where(p => p.Id == id && !p.Borrado)
                                    .Include(p => p.Proveedor)
                                    .FirstOrDefaultAsync();

                if (producto==null) return NotFound();

                var productoDto = _mapper.Map<ProductoDTO>(producto);
                return productoDto;
            }
            catch (Exception)
            {

                return BadRequest("Imposible recuperar los productos, intente más tarde");
            }
        }

        /// <summary>
        /// Este metodo se encarga deguardar un producto en la base de datos
        /// </summary>
        /// <returns>En caso no exista el proveedor ingresado, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna una respuesta 201 y la ruta en el encabezado</returns>
        ///<exception cref = "DivideByZeroException" > Si el proveedor no existe</exception>
        [HttpPost]
        public async Task<ActionResult> Save([FromForm] ProductoCrearDTO productoCrearDTO) {

            var proveedor = await _context.Proveedores.FindAsync(productoCrearDTO.ProveedorId);

            if (proveedor == null)
            {
                return BadRequest("El proveedor indicado no existe.");
            }

            var producto = _mapper.Map<Producto>(productoCrearDTO);
            producto.ProveedorId = productoCrearDTO.ProveedorId;
            producto.Borrado = false;

            if (productoCrearDTO.Foto != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await productoCrearDTO.Foto.CopyToAsync(memoryStream);
                    var contenido = memoryStream.ToArray();
                    var extension = Path.GetExtension(productoCrearDTO.Foto.FileName);
                    producto.Foto = await _manejoArchivos.GuardarArchivo(contenido, extension, contenedor, productoCrearDTO.Foto.ContentType);
                }
            }
            _context.Add(producto);
            await _context.SaveChangesAsync();
            var dto = _mapper.Map<ProductoDTO>(producto);
            return new CreatedAtRouteResult("ObtenerProducto", new { id = producto.Id }, dto);

        }


        /// <summary>
        /// Este metodo se encarga de actualizar un producto por ID que se encuentra en la base de datos
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID del prducto que se quiere obtener</param>
        /// <returns>En caso de que el producto el proveedor no exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un 201</returns>
        ///<exception cref = "DivideByZeroException" > Si el producto o el proveedor no existen</exception>
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id,[FromForm] ProductoCrearDTO productoCrearDTO)
        {
            var producto = await _context.Productos
                                        .FirstOrDefaultAsync(p => p.Id == id && !p.Borrado);

            if (producto == null)return NotFound();

            var proveedor = await _context.Proveedores.FindAsync(productoCrearDTO.ProveedorId);

            if (proveedor == null)
            {
                return BadRequest("El proveedor indicado no existe.");
            }

            producto = _mapper.Map(productoCrearDTO, producto);
            producto.Id = id;
            producto.ProveedorId = productoCrearDTO.ProveedorId; 
            producto.Borrado = false;

            if (productoCrearDTO.Foto != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await productoCrearDTO.Foto.CopyToAsync(memoryStream);
                    var contenido = memoryStream.ToArray();
                    var extension = Path.GetExtension(productoCrearDTO.Foto.FileName);
                    producto.Foto = await _manejoArchivos.EditarArchivo(contenido, extension, contenedor, producto.Foto, productoCrearDTO.Foto.ContentType);
                }
            }

            _context.Update(producto);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        /// <summary>
        /// Este metodo se encarga de eliminar un producto por ID que se encuentran en la base de datos 
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID del prducto que se quiere eliminar</param>
        /// <returns>En caso de que el producto no exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un 201</returns>
        ///<exception cref = "DivideByZeroException" > Si el producto no existe</exception>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id) {
            var producto = await _context.Productos.FirstOrDefaultAsync(p => p.Id == id);

            if (producto==null) return NotFound();
            bool tieneDetalles = await _context.DetallesVenta.AnyAsync(d => d.ProductoId == id);
            if (tieneDetalles)
            {
                producto.Borrado = true;
            }
            else {
                await _manejoArchivos.BorrarArchivo(producto.Foto, contenedor);
                _context.Remove(producto);
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
