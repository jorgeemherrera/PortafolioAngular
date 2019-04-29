import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadCrumb } from './breadcrumb.interface';
import { distinctUntilChanged, filter }  from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: BreadCrumb[]

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activateRoute.root);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activateRoute.root);
    })
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    /**
     * If no routeConfig is avalaible we are on the root path
     */
    let label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : 'Home';
    let isClickable = route.routeConfig && route.routeConfig.data && route.routeConfig.data.isClickable;
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    /**
     * If is a dynamic route such as ':id', remove it
     */
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const parameterName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[parameterName]);
      label = route.snapshot.params[parameterName];
      console.log('path:', path);
    }
    /**
     * In the routeConfig the complete path is not available
     * so we rebuild it each time
     */
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadCrumb = {
      label: label,
      url: nextUrl,
    };
    /**
     * Only adding route with non-empty label
     */
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      /**
       * If we are not our current path yet,
       * there will be more children to look after, to build our breadcrumb
       */
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
