﻿using ProductosApi.Models;
using ProductosApi.Validations;
using System.ComponentModel.DataAnnotations;

namespace ProductosApi.DTOs
{
    public class ProductoCrearDTO
    {
        [Required(ErrorMessage = "El nombre es obligatorio")]
        [MaxLength(50, ErrorMessage = "El nombre debe ser de máximo 50 caracteres")]
        public required string Nombre { get; set; }

        [Required(ErrorMessage = "El precio es obligatorio")]
        public decimal Precio { get; set; }

        [PesoArchivoValidation(pesoMaximoMB: 4)]
        [TipoArchivoValidation(grupoTipoArchivo: GrupoTipoArchivo.Imagen)]
        public IFormFile Foto { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public int ProveedorId { get; set; }

        Proveedor? Proveedor { get; set; }
    }
}
