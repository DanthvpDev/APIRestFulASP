﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProductosApi.Data;

namespace ProductosApi.Controllers
{
    public class ProveedoresController : Controller
    {
        private readonly ApiDbContext _context;
        private readonly IMapper _mapper;
        public IActionResult Index()
        {
            return View();
        }


    }
}
