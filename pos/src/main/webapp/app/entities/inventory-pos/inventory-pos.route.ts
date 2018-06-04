import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InventoryPosComponent } from './inventory-pos.component';
import { InventoryPosDetailComponent } from './inventory-pos-detail.component';
import { InventoryPosPopupComponent } from './inventory-pos-dialog.component';
import { InventoryPosDeletePopupComponent } from './inventory-pos-delete-dialog.component';

export const inventoryRoute: Routes = [
    {
        path: 'inventory-pos',
        component: InventoryPosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'inventory-pos/:id',
        component: InventoryPosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inventoryPopupRoute: Routes = [
    {
        path: 'inventory-pos-new',
        component: InventoryPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inventory-pos/:id/edit',
        component: InventoryPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inventory-pos/:id/delete',
        component: InventoryPosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
