import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProductPosComponent } from './product-pos.component';
import { ProductPosDetailComponent } from './product-pos-detail.component';
import { ProductPosPopupComponent } from './product-pos-dialog.component';
import { ProductPosDeletePopupComponent } from './product-pos-delete-dialog.component';

export const productRoute: Routes = [
    {
        path: 'product-pos',
        component: ProductPosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'product-pos/:id',
        component: ProductPosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-pos-new',
        component: ProductPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-pos/:id/edit',
        component: ProductPosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'product-pos/:id/delete',
        component: ProductPosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'posApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
