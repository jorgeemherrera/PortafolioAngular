import { Injectable } from '@angular/core';

@Injectable()

export class MenuService {

    constructor() {}

    getMenu(): Array<any> {
        const menu = [
            {
                name:    'Home breadcrumb',
                path:    './home',
                children: [
                    {
                        name: 'Item breadcrumb',
                        path: './item',
                        children: [
                            {
                                name: 'prueba',
                                path: './item/:id'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'about breadcrumb',
                path: './about',
                children: []
            },
            
        ];

        return menu;
    } // getMenu()
} // MenuService