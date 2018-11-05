import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

/**
 * Rutas
 */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AboutComponent } from './pages/about/about.component';
import { ItemComponent } from './pages/item/item.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './pages/search/search.component'; // Permite hacer peticiones verbo - REST

/**
 * Service
 */
import { MenuService } from './services/menu.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PortfolioComponent,
    AboutComponent,
    ItemComponent,
    SearchComponent
  ],
  imports: [ BrowserModule, FormsModule, RouterModule, AppRoutingModule, HttpModule , HttpClientModule  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
