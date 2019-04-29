/**
 * Módulo para especificar mis rutas
 */

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AboutComponent } from './pages/about/about.component';
import { ItemComponent } from './pages/item/item.component';
import { SearchComponent } from './pages/search/search.component';

/**
 * Rutas de mi App
 */
const app_routes: Routes = [
    { 
      path: 'home',
      component: PortfolioComponent,
      data: {
          breadcrumb: ''
      }
    },
    { 
      path: 'about',
      component: AboutComponent,
      data: {
          breadcrumb: 'Acerca'
      }
    },
    { 
      path: 'item',
      // component: PortfolioComponent,
      //TODO: necesito generar herencia entre componentes
      data: {
        breadcrumb: 'item'
      },
      children: [
          {
              path: ':id',
              component: ItemComponent,
              data: {
                breadcrumb: ''
              }
          }
      ]
    },
    // { 
    //   path: 'item/:id',
    //   component: ItemComponent,
    //   data: {
    //     breadcrumb: ''
    //   }
    // },
    { 
      path: 'search/:termino',
      component: SearchComponent,
      data: {
        breadcrumb: ':termino'
      }
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
 imports: [
     RouterModule.forRoot( app_routes, {useHash: true})
 ],
 exports: [
     RouterModule
 ]
})
/**
 * Clase del Routing
 */
export class AppRoutingModule { }