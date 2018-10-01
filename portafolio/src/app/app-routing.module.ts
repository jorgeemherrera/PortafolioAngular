/**
 * Módulo para especificar mis rutas
 */
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AboutComponent } from './pages/about/about.component';
import { ItemComponent } from './pages/item/item.component';

/**
 * Rutas de mi App
 */
const app_routes: Routes = [
    { path: 'home', component: PortfolioComponent},
    { path: 'about', component: AboutComponent},
    { path: 'item', component: ItemComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
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