import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from './services/info-pagina.service';
import { ProductosService } from './services/productos.service';
import { MenuService } from './services/menu.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   * BreadCrumb
   */
  name: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = [];

  /**
   * /BreadCrumb
   */

  // Inyección de dependencia _nombreServicio
  constructor(public _infoPaginaService: InfoPaginaService,
              public _productosService: ProductosService,
              // MenuService para el breadcrumb
              private _router: Router, private menuService: MenuService) {
  }
  ngOnInit() {
    this.menu = this.menuService.getMenu();
    this.listenRouting();
  }

  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this._router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        // start breadcrumb
        target = this.menu;
        this.breadcrumbList.length = 0;
        // get the actual router url [0],[1]
        routerList = routerUrl.slice(1).split('/');      
        // tslint:disable-next-line:no-shadowed-variable
        routerList.forEach((router, index) => {
          // find this layer on menu routing
          target = target.find(page => page.path.slice(2) === router);
          // Save on breadcrumbList loop list
          this.breadcrumbList.push({
            name: target.name,
            // the second layer star the routing and add the previous layer
            path: (index === 0) ? target.path : `${this.breadcrumbList[index - 1].path}/${target.path.slice(2)}`
          });
          console.log('path: ' + target.path);
          
          // The next level to be compared is the specified subpage of this layer.
          if ( index + 1 !== routerList.length) {
            target = target.children;
          }
        });
        console.log(this.breadcrumbList);
      }
    });
  }
}
