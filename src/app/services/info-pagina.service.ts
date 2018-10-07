import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  // No es necesario ponerlo en el app.module
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  // Propiedad
  equipo: any[] = [];

  constructor( private http: HttpClient) {

    this.cargaInfo();
    this.cargarEquipo();
   }

   private cargaInfo() {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
    });
   }
   private cargarEquipo() {
    this.http.get('https://angular-html-8b927.firebaseio.com/equipo.json')
    .subscribe( (resp: any[]) => {

      this.equipo = resp;
      // console.log(resp);
    });

   }
}
