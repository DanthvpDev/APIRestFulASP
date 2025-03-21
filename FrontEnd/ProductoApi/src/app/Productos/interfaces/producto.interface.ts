export interface Producto{
  id: number,
  nombre: string, 
  precio: number,
  foto: string,
  proveedorId: number
}

export interface ProductoViewModel {
  nombre: string, 
  precio: number,
  foto: string,
  nombreProveedor: string
}

export interface ProductoDTO {
  nombre: string, 
  precio: number,
  foto: string,
  ProveedorId: number,
  proveedorNombre: string
}

