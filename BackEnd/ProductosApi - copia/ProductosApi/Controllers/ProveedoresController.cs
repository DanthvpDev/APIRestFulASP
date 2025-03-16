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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProveedorDTO>>> GetAll()
        {
            try
            {
                var provedores = await _context.Proveedores
                                        .Where(p => !p.Borrado)
                                        .Include(p => p.Productos)
                                        .ToListAsync();
                var provedorDTO = _mapper.Map<List<ProveedorDTO>>(provedores);
                return provedorDTO;
            }
            catch (Exception)
            {

                return BadRequest("Imposible recuperar los clientes, intente más tarde");
            }
        }

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

        [HttpDelete]
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
