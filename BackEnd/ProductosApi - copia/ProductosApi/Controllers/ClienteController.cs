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
    [Route("api/clientes")]
    public class ClienteController:ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;


        public ClienteController(ApiDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Este metodo se encarga de obtener todos los clientes que se encuentran en la base de datos que no hayan sido eliminados
        /// </summary>
        /// <returns>En caso de que no existan clientes, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un la lista de clientes</returns>
        ///<exception cref = "DivideByZeroException" > Si no existen clientes.</exception>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteDTO>>> GetAll()
        {
            try
            {
                var clientes = await _context.Clientes
                                        .Where(c => !c.Borrado)
                                        .ToListAsync();
                if(clientes == null) return NotFound();
                var clientesDTO = _mapper.Map<List<ClienteDTO>>(clientes);
                return clientesDTO;
            }
            catch (Exception)
            {

                return BadRequest("Imposible recuperar los clientes, intente más tarde");
            }
        }

        /// <summary>
        /// Este metodo se encarga de obtener un cliente en especifico basandose en un ID recibido
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID del cliente que se qiuere obtener</param>
        /// <returns>En caso de que el cliente no exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna el cliente</returns>
        ///<exception cref = "DivideByZeroException" > Si el cliente.</exception>
        [HttpGet("{id:int}", Name = "ObtenerCliente")]
        public async Task<ActionResult<Cliente>> GetById(int id)
        {
            try
            {
                var cliente = await _context.Clientes
                                        .FirstOrDefaultAsync(c => c.Id == id && !c.Borrado);

                if (cliente == null) return NotFound();

                var clienteDTO = _mapper.Map<ClienteDTO>(cliente);
                return cliente;
            }
            catch (Exception)
            {

                return BadRequest("Imposible recuperar el cliente, intente más tarde");
            }
        }

        /// <summary>
        /// Este metodo se encarga de guardar un cliente en la base de datos
        /// </summary>
        /// <param name="clienteCrearDTO"> Este parametro recibe un objeto con la información del cliente</param>
        /// <returns>Retorna una respuesta 201 e incluye en el encabezado la nueva URL</returns>
        [HttpPost]
        public async Task<ActionResult> Save([FromForm] ClienteCrearDTO clienteCrearDTO)
        {
            var cliente = _mapper.Map<Cliente>(clienteCrearDTO);

            cliente.Borrado = false;
            
            _context.Add(cliente);
            await _context.SaveChangesAsync();
            var dto = _mapper.Map<ClienteDTO>(cliente);
            return new CreatedAtRouteResult("ObtenerCliente", new { id = cliente.Id }, dto);

        }

        /// <summary>
        /// Este metodo se encarga de actualizar la información de un cliente
        /// </summary>
        /// <param name="id"> Este parametro recibe la identificación del cliente</param>
        /// <param name="clienteCrearDTO"> Este parametro recibe un objeto con la información del cliente</param>
        /// <returns>En caso de que el cliente no exista se retorna un 404, en caso de exista, se actualiza la información y se retorna una respuesta 204 </returns>
        ///<exception cref = "DivideByZeroException" > Si la venta no existe.</exception>
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromForm] ClienteCrearDTO clienteCrearDTO)
        {
            bool existe = await _context.Clientes
                                        .AnyAsync(c => c.Id == id && !c.Borrado);
            if (existe)
            {
                var cliente = _mapper.Map<Cliente>(clienteCrearDTO);
                cliente.Id = id;
                cliente.Borrado = false;
                
                _context.Update(cliente);
                await _context.SaveChangesAsync();
                return NoContent();
            }

            return NotFound();

        }

        /// <summary>
        /// Este metodo se encarga de eliminar un cliente en especifico basandose en un ID recibido
        /// </summary>
        /// <param name="id"> Este parametro se encarga de facilitar o brindar el ID del cliente que se quiere remover</param>
        /// <returns>En caso de que el cliente no exista no exista, retorna un mensaje que indica el error, en caso de que todo salga bien se retorna un NoContent que informa un 204 de exito</returns>
        ///<exception cref = "DivideByZeroException" > Si el cliente no existe.</exception>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Id == id);

            if (cliente == null) return NotFound();
            bool tieneVentas = await _context.Ventas.AnyAsync(v => v.ClienteId== id);
            if (tieneVentas)
            {
                cliente.Borrado = true;
            }
            else
            {
                _context.Remove(cliente);
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
