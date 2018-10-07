import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  /**
   * Arreglo de Productos
   */
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  /**
   * Método Cargar Productos
   */
  private cargarProductos() {

    // Regresar algo asincrono - PROMESA
    return new Promise( ( resolve, reject ) => {
        this.http.get('https://angular-html-8b927.firebaseio.com/productos_idx.json')
          .subscribe( ( resp: Producto[]) => {
            this.productos = resp;
            this.cargando = false;
            resolve();
        });
    });
  }

  /**
   * Método
   */
  getProducto ( id: string ) {
    // Observable
    return this.http.get(`https://angular-html-8b927.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string) {

    // sólo cuando existen datos
    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        /**
         * ejecutar después de tener los productos
         * aplicar filtro
         */
        this.filtrarProductos( termino );
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }

    /**
     * Barra todos los elementos, uno por uno y no importa que contenta, no hay condicion = return true;
     * los regresa todos
     */
    // this.productosFiltrado = this.productos.filter(producto => {
    //   return true;
    // });

  }
  private filtrarProductos( termino: string ) {
    // console.log(this.productos);
    this.productosFiltrado = [];

    // Case sensitive
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      // pasar a minuscula el título
      const tituloLowe = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf( termino )  >= 0 || tituloLowe.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }
    });
  }
}
